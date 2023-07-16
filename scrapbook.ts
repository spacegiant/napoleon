// @ts-nocheck

// This is just snippets kept for learning or reference

const doc = app.workspace.getActiveFile.view.editor.getDoc();
doc.replaceSelection(template);
const currentLine = doc.getCursor().line;
const newLine = currentLine - 2;
doc.setCursor({ line: newLine, ch: 0 });

// -------------------------------------- //

// set the tag you want to match
const tag = '#books';

// get all the files and run them through Array.reduce() method

const count = app.vault.getMarkdownFiles().reduce((acc, file) => {
  // get the CachedMetadata
  const cache = app.metadataCache.getFileCache(file);
  if (cache.tags) {
    // get all the tags. this is easier than iterating of cache.tags
    const tags = tp.obsidian.getAllTags(cache);
    if (tags.includes(tag)) {
      // if the tag we specified exists we add to the count
      acc += 1;
    }
  }
  return acc;
}, 0);
// return the count
tR += count;

// -------------------------------------- //

// onLoad
this.addStatusBarItem().setText('Status Bar Text');

// -------------------------------------- //

// onLoad
this.addCommand({
  id: 'open-sample-modal',
  name: 'Open Sample Modal',
  checkCallback: (checking: boolean) => {
    let leaf = this.app.workspace.activeLeaf;

    if (leaf) {
      if (!checking) {
        new SampleModal(this.app).open();
      }
      return true;
    }
    return false;
  },
});

// -------------------------------------- //

this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
  console.log('click', evt);
});

this.registerInterval(
  window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000)
);

// -------------------------------------- //

class SoloModal extends Modal {
  constructor(app: App) {
    super(app);
  }

  onOpen() {
    let { contentEl, titleEl } = this;
    titleEl.setText('Solo Tools');
    contentEl.setText('Woah!');
  }

  onClose() {
    let { contentEl } = this;
    contentEl.empty();
  }
}

class SampleModal extends Modal {
  constructor(app: App) {
    super(app);
  }

  onOpen() {
    let { contentEl, titleEl } = this;
    titleEl.setText('Woah!');
    contentEl.setText('Woah!');
  }

  onClose() {
    let { contentEl } = this;
    contentEl.empty();
  }
}

// -------------------------------------- //

// pluginSettingsTab

new Setting(containerEl).addText((text) =>
  text
    .setPlaceholder('Enter your secret')
    .setValue('')
    .onChange(async (value) => {
      console.log('Secret: ' + value);
      this.plugin.settings.mySetting = value;
      await this.plugin.saveSettings();
    })
);
