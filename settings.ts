import { PluginSettingTab, App, Setting } from 'obsidian'
import TestPlugin from './main'

export default class TestPluginSettingsTab extends PluginSettingTab {

	plugin: TestPlugin

	constructor(app: App, plugin: TestPlugin) {
		super(app, plugin)

		this.plugin = plugin
	}

	display() {
		this.containerEl.empty();

		this.containerEl.createEl("h1", { text: "Test Plugin Settings" });

		new Setting(this.containerEl).setName("Replacement text").setDesc("The text to replace all spaces with.").addText((item) => {
			item.setValue(this.plugin.settings.replaceWith).onChange(
				(value) => {
					this.plugin.settings.replaceWith = `\n${value}\n`;
					this.plugin.saveSettings();
				})
		})

	}

}
