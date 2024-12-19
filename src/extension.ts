import * as vscode from 'vscode';
import axios from 'axios';

function enterText(text: string) {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        editor.edit(editBuilder => {
            editBuilder.insert(editor.selection.active, text);
        });
    }
}

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('todoot.insertQuote', () => {
		axios.get('https://zenquotes.io', {
				params: {
					api: 'random'
				}
			})
			.then(function (response) {
				enterText('// TODO: ' + response.data[0].q);
			})
			.catch(function (error) {
				vscode.window.showInformationMessage(error);
			})
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
