// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { InstallationsTreeDataProvider } from './installations';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const installationsProvider = new InstallationsTreeDataProvider();
  vscode.window.registerTreeDataProvider('installations', installationsProvider);

  // Регистрация команд для кнопок
  context.subscriptions.push(
    vscode.commands.registerCommand('genesis-dev.addInstallation', () => {
      vscode.window.showInformationMessage('Adding new installation...');
      
    }),
    vscode.commands.registerCommand('genesis-dev.settings', () => {
      vscode.window.showInformationMessage('Opening settings...');
      
    }),
    
    vscode.commands.registerCommand('genesis-dev.refresh', () => {
		vscode.window.showInformationMessage('Refresh');
      installationsProvider.refresh();
    })
  );

  const installationsView = vscode.window.createTreeView('installations', {
    treeDataProvider: installationsProvider
  });
  context.subscriptions.push(installationsView);
}

// This method is called when your extension is deactivated
export function deactivate() {}
