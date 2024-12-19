import * as vscode from 'vscode';
import axios from 'axios';

const sound = require('sound-play');
const path = require('path');

function enterText(text: string) {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        editor.edit(editBuilder => {
            editBuilder.insert(editor.selection.active, text);
        });
    }
}

export function activate(context: vscode.ExtensionContext) {
    const dootSound = path.join(__dirname, '../audio/doot.mp3');

    const disposable = vscode.commands.registerCommand('todoot.insertQuote', () => {
        axios.get('https://dummyjson.com/quotes/random')
            .then(function (response) {
                const config = vscode.workspace.getConfiguration('todoot');

                if (config.sound) {
                    sound.play(dootSound);
                }

                enterText(config.prefix + response.data.quote);
            })
            .catch(function (error) {
                vscode.window.showInformationMessage(error);
            });
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
