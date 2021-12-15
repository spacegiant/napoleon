import { addIcons } from 'src/icons';
import {
  App,
  Modal,
  Notice,
  MarkdownView,
  Plugin,
  PluginSettingTab,
  Setting,
  ItemView,
} from "obsidian";
import getTaggedFiles from "./src/utils/getTaggedFiles";
import getRandomListItem from "./src/utils/getRandomListItem";
import getRandomWeighedListItem from "./src/utils/getRandomWeightedListItem";
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

    addIcons();

    await this.loadSettings();

    let taggedFiles;

    this.app.workspace.onLayoutReady(() => {
      this.addCommand({
        id: "run-alternative-tab",
        name: "TAB",
        icon: "dice",
        checkCallback: (checking: boolean) => {
          let leaf = this.app.workspace.activeLeaf;

          if (leaf) {
            if (!checking) {
              Replacer(this.app);
            }
            return true;
          }
          return false;
        },
      });
      // get all files with tags
      taggedFiles = getTaggedFiles(this.app);

      taggedFiles.simpleList.forEach((table: any, index) => {
        this.addCommand({
          id: `command-${table?.basename}`,
          name: table?.basename,
          checkCallback: (checking: boolean) => {
            let leaf = this.app.workspace.activeLeaf;
            if (leaf) {
              if (!checking) {
                console.log("simple");
                const mode = leaf.getViewState().state.mode;
                const isEditing = mode === "source";

                const view =
                  this.app.workspace.getActiveViewOfType(MarkdownView);

                if (isEditing && view) {
                  const editor = view.editor;
                  const doc = editor.getDoc();
                  const cursor = doc.getCursor();
                  getRandomListItem(this.app, table, (content: string) => {
                    console.log(content);
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

      taggedFiles.weightedTables.forEach((table: any, index) => {
        this.addCommand({
          id: `command-${table?.basename}`,
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
                  getRandomWeighedListItem(
                    this.app,
                    table,
                    (content: string) => {
                      const string = content;
                      doc.replaceRange(string, cursor);
                    }
                  );
                }
              }
              return true;
            }
            return false;
          },
        });
      });

      taggedFiles.decks.forEach((table: any, index) => {
        const nonTask: any = [];
        const checked: any = [];
        const unchecked: any = [];

        table.listItems.forEach((item: any) => {
          if (!item.task) {
            nonTask.push(item);
          } else if (item.task === "x") {
            checked.push(item);
          } else {
            unchecked.push(item);
          }
        });

        // make sure they are not just list items
        if (checked.length + unchecked.length === 0) {
          return null;
        }
        const path = this.app.metadataCache.getFirstLinkpathDest(table.basename, table.path);
        const content = this.app.vault.cachedRead(path).then((value) => {

          console.log("VALUE ", value)
        })
        // do we need to shuffle?
        if (table.frontmatter.shuffle && checked.length === 0) {
          // reset all as checked
          const view = this.app.workspace.getActiveViewOfType(MarkdownView);
          unchecked.map((item: any) => {
            const lineNo = item.position.start.line;
            const newLine = view.editor.getLine(lineNo).replace("[ ]", "[x]");
            item.task = "x";
            view.editor.setLine(lineNo, newLine);
          });
        }

        const roll = Math.floor(Math.random() * checked.length);
        console.log("ROLL ", checked[roll]);

        // const uncheckedItems = table.listItems.filter((item: any) => {
        //   console.log(item.task)
        //   return item.task && item.task !== "x";
        // })s
        // If all checked, then uncheck all items
        // if(uncheckedItems.length === 0) {

        // }
        // table.listItems.forEach((item: any) => {
        //   const view = this.app.workspace.getActiveViewOfType(MarkdownView);
        //   if (item.task !== "x") {
        //     const lineNo = item.position.start.line;
        //     const newLine = view.editor.getLine(lineNo).replace("[ ]", "[x]")
        //     console.log(view.editor.getLine(lineNo))
        //     item.task = "x";
        //     view.editor.setLine(lineNo, newLine)

        //   }
        // });
      });
    });

    this.addRibbonIcon("dice", "Dice", () => {
      const success = Replacer(this.app); 
    });

    this.addRibbonIcon("d", "Insert D", () => {
      const success = Replacer(this.app); 
    })

    this.addRibbonIcon("play", "Play", () => {
      const success = Replacer(this.app); 
    })

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
