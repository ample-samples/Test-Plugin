import { Plugin, Notice } from 'obsidian';
import TestPluginSettingsTab from 'settings'

interface testPluginSettings {
	replaceWith: string;
	replace: string
}

const DEFAULT_SETTINGS: Partial<testPluginSettings> = {
	replaceWith: '\nAND HIS NAME IS JOHN CENA\n',
	replace: ' ',
}

export default class TestPlugin extends Plugin {

	settings: testPluginSettings;

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		this.saveData(this.settings)
	}

	async onload() {
		await this.loadSettings();

		new Notice("Test Plugin has been loaded.");

		this.addSettingTab(new TestPluginSettingsTab(this.app, this))

		this.addCommand({
			id: "test-command2",
			name: "Show replaceWith",
			callback: () => {
				new Notice("Replace with: " + this.settings.replaceWith);
			}
		})
		const reg = new RegExp(this.settings.replace, "g");

		this.addCommand({
			id: "test-command1",
			name: "John Cena",
			editorCallback: (editor, view) => {
				const value = editor
					.getValue()
					.replace(reg, `${this.settings.replaceWith}`)

				editor.setValue(value);
			}
		})
	}

	onunload() {
		new Notice("Test Plugin has been unloaded.");
	}
}
