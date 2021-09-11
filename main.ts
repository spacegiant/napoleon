import { getAllTags, MetadataCache, App, ButtonComponent, Modal, Notice, MarkdownSourceView, MarkdownView, Editor, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { roller, descriptor, actionSubject } from './src/index.js'
import { FilterMDFilesByTags } from './src/utils/findByTag'
import getCachedTags from './src/utils/getCachedTags';
import getTaggedFiles from './src/utils/getTaggedFiles';

interface MyPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: 'default'
}

export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;

	async onload() {
		console.log('loading plugin');

		await this.loadSettings();

		this.addRibbonIcon('dice', 'Sample Plugin', () => {
			new Notice('This is a notice!');
		});

		this.addStatusBarItem().setText('Status Bar Text');

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
			}
		});

		this.addCommand({
			id: 'solo-test',
			name: 'Mythic:Test',
			hotkeys: [
				{
					modifiers: ['Mod', 'Shift'],
					key: 's',
				},
			],
			checkCallback: (checking: boolean) => {
				let leaf = this.app.workspace.activeLeaf;
				if (leaf) {
					if (!checking) {

						const mode = leaf.getViewState().state.mode;
						const isEditing = mode === "source";

						const view = this.app.workspace.getActiveViewOfType(MarkdownView);

						if (isEditing && view) {
							const editor = view.editor;
							const doc = editor.getDoc();
							const cursor = doc.getCursor();
							const string = "\n" + `${roller(10, 13).text}\n${descriptor().text}\n${actionSubject().text}` + "\n\n";
							doc.replaceRange(string, cursor);
						}
						const metadataCache = this.app.metadataCache;
						const taggedFiles = getTaggedFiles(this.app);
						console.log(taggedFiles.randomTables[0]);

						const myFile = taggedFiles.randomTables[0];
					}
					return true;
				}
				return false;
			}
		});

		this.addSettingTab(new SampleSettingTab(this.app, this));

		this.registerCodeMirror((cm: CodeMirror.Editor) => {
			console.log('codemirror', cm);
		});

		this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			console.log('click', evt);
		});

		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	onunload() {
		console.log('unloading plugin');
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

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

class SampleSettingTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		let { containerEl } = this;

		containerEl.empty();

		containerEl.createEl('h2', { text: 'Settings for my awesome plugin.' });

		new Setting(containerEl)
			.setName('Setting #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue('')
				.onChange(async (value) => {
					console.log('Secret: ' + value);
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));
	}
}
