import { Plugin, Notice } from 'obsidian';

export default class MyPlugin extends Plugin {

	async onload() {
		new Notice("Test Plugin has been loaded.");
	}

	onunload() {
		new Notice("Test Plugin has been unloaded.");
	}
}
