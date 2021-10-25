import {
  App,
  Modal,
  Notice,
  MarkdownView,
  Plugin,
  PluginSettingTab,
  Setting,
} from "obsidian";
import getTaggedFiles from "./src/utils/getTaggedFiles";
import getContent from "./src/utils/getContent";
import Replacer from "./src/replacer";

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

    await this.loadSettings();

    let taggedFiles;

    this.app.workspace.onLayoutReady(() => {
      this.addCommand({
    	id: 'open-sample-modal',
    	name: 'TAB',
    	checkCallback: (checking: boolean) => {
    		let leaf = this.app.workspace.activeLeaf;

    		if (leaf) {
    			if (!checking) {
    				Replacer(this.app);
    			}
    			return true;
    		}
    		return false;
    	}
    });
      // get all files with tags
      taggedFiles = getTaggedFiles(this.app);

      taggedFiles.simpleList.forEach((table: any, index) => {
        this.addCommand({
          id: `command-${index}`,
          name: table?.basename,
          checkCallback: (checking: boolean) => {
            let leaf = this.app.workspace.activeLeaf;
            if (leaf) {
              if (!checking) {
                const mode = leaf.getViewState().state.mode;
                const isEditing = mode === "source";

                const view =
                  this.app.workspace.getActiveViewOfType(MarkdownView);

                if (isEditing && view) {
                  const editor = view.editor;
                  const doc = editor.getDoc();
                  const cursor = doc.getCursor();
                  getContent(this.app, table, (content: string) => {
                    const string = content;
                    doc.replaceRange(string, cursor);
                  });
                }
              }
              return true;
            }
            return false;
          },
        });
      });
    });

    this.addRibbonIcon("dice", "Sample Plugin", () => {
      const success = Replacer(this.app);
      console.log(success);
      // new Notice("Dice");
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

    this.registerCodeMirror((cm: CodeMirror.Editor) => {
      console.log("codemirror", cm);
    });

    if (this.settings.replacer) {
      // initReplacer(document, this.app)
      document.addEventListener("keydown", (e) => {
        if (e.key === "Tab") {
          console.log("TABBEDxx");
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

class SampleModal extends Modal {
  constructor(app: App) {
    super(app);
  }

  onOpen() {
    let { contentEl, titleEl } = this;
    titleEl.setText("Woah!");
    contentEl.setText("Woah!");
  }

  onClose() {
    let { contentEl } = this;
    contentEl.empty();
  }
}

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
