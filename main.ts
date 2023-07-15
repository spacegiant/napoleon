import { addIcons } from "src/icons";
import { App, Plugin, PluginSettingTab, Setting } from "obsidian";
import getTaggedFiles from "./src/utils/getTaggedFiles";
import Replacer from "./src/replacer";
import {
  openHomePage,
  insertD,
  insertTab,
  registerSimpleRandomTable,
  registerWeightedRandomTable,
} from "./src/commands";

interface MyPluginSettings {
  mySetting: string;
  mythicOn: boolean;
  tacOn: boolean;
  replacer: boolean;
  replacerSuffix: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
  mySetting: "default",
  mythicOn: true,
  tacOn: false,
  replacer: false,
  replacerSuffix: "//",
};

export default class MyPlugin extends Plugin {
  settings: MyPluginSettings;

  async onload() {
    console.log("loading plugin");

    addIcons();

    await this.loadSettings();

    let taggedFiles;

    this.app.workspace.onLayoutReady(() => {
      this.addCommand({
        id: "solo-home",
        name: "Home",
        icon: "play",
        checkCallback: openHomePage(this.app),
      });

      this.addCommand({
        id: "solo-add-d",
        name: "Insert D", // Equivalent of tabbing on keyboard
        icon: "d",
        checkCallback: insertD(this.app),
      });

      this.addCommand({
        id: "run-alternative-tab",
        name: "TAB", // Equivalent of tabbing on keyboard
        icon: "dice",
        checkCallback: insertTab(this.app),
      });

      // CREATE RANDOM TABLES
      // get all files with tags
      taggedFiles = getTaggedFiles(this.app);

      taggedFiles.simpleList.forEach((table: any, index) => {
        this.addCommand({
          id: `command-${table?.basename}`,
          name: table?.basename,
          checkCallback: registerSimpleRandomTable(this.app, table),
        });
      });

      taggedFiles.weightedTables.forEach((table: any, index) => {
        this.addCommand({
          id: `command-${table?.basename}`,
          name: table?.basename,
          checkCallback: registerWeightedRandomTable(app, table),
        });
      });

      // TODO: Implement decks feature
      // taggedFiles.decks.forEach((table: any, index) => { });
    });

    this.addRibbonIcon("dice", "Dice", () => {
      const success = Replacer(this.app);
    });

    // this.addStatusBarItem().setText('Status Bar Text');

    // this.addCommand({
    // 	id: 'open-sample-modal',
    // 	name: 'Open Sample Modal',
    // 	checkCallback: (checking: boolean) => {
    // 		let leaf = this.app.workspace.activeLeaf;

    // 		if (leaf) {
    // 			if (!checking) {
    // 				new SampleModal(this.app).open();
    // 			}
    // 			return true;
    // 		}
    // 		return false;
    // 	}
    // });

    this.addSettingTab(new SoloSettingTab(this.app, this));

    if (this.settings.replacer) {
      document.addEventListener("keydown", (e) => {
        if (e.key === "Tab") {
          Replacer(this.app);
        }
      });
    }

    // this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
    // 	console.log('click', evt);
    // });

    // this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
  }

  onunload() {
    console.log("unloading plugin");
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}

// class SoloModal extends Modal {
// 	constructor(app: App) {
// 		super(app);
// 	}

// 	onOpen() {
// 		let { contentEl, titleEl } = this;
// 		titleEl.setText('Solo Tools');
// 		contentEl.setText('Woah!');
// 	}

// 	onClose() {
// 		let { contentEl } = this;
// 		contentEl.empty();
// 	}
// }

// class SampleModal extends Modal {
//   constructor(app: App) {
//     super(app);
//   }

//   onOpen() {
//     let { contentEl, titleEl } = this;
//     titleEl.setText("Woah!");
//     contentEl.setText("Woah!");
//   }

//   onClose() {
//     let { contentEl } = this;
//     contentEl.empty();
//   }
// }

class SoloSettingTab extends PluginSettingTab {
  plugin: MyPlugin;

  constructor(app: App, plugin: MyPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    let { containerEl } = this;

    containerEl.empty();

    containerEl.createEl("h2", { text: "Napoleon Settings" });

    new Setting(containerEl)
      .setName("Mythic")
      .setDesc("Toggle Mythic GME")
      .addToggle((toggle) =>
        toggle.setValue(this.plugin.settings.mythicOn).onChange(async () => {
          this.plugin.settings.mythicOn = !this.plugin.settings.mythicOn;
        })
      );

    new Setting(containerEl)
      .setName("The Adventure Crafter")
      .setDesc("Toggle The Adventure Crafter")
      .addToggle((toggle) =>
        toggle.setValue(this.plugin.settings.tacOn).onChange(async () => {
          this.plugin.settings.tacOn = !this.plugin.settings.tacOn;
          await this.plugin.saveSettings();
        })
      );

    new Setting(containerEl)
      .setName("Replacer")
      .setDesc("Toggle text replacer")
      .addToggle((toggle) =>
        toggle.setValue(this.plugin.settings.replacer).onChange(async () => {
          this.plugin.settings.replacer = !this.plugin.settings.replacer;
          await this.plugin.saveSettings();
        })
      )
      .addText((text) =>
        text
          .setValue(this.plugin.settings.replacerSuffix)
          .onChange(async (value) => {
            this.plugin.settings.replacerSuffix = value;
            await this.plugin.saveSettings();
          })
      );

    // .addText(text => text
    // 	.setPlaceholder('Enter your secret')
    // 	.setValue('')
    // 	.onChange(async (value) => {
    // 		console.log('Secret: ' + value);
    // 		this.plugin.settings.mySetting = value;
    // 		await this.plugin.saveSettings();
    // 	}));
  }
}
