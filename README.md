# Welcome to Genesis VS Code Extension

The main purpose of the extension is to simplify the way you develop and debug your genesis elements.
The main features are:
- Manage genesis installations.
  - Transfer local code to remote nodes.
  - Manage genesis services. Start, stop, restart, etc.
  - Collect logs from the services.
- Explorer repositories, manage manifests in the repositories.
- Canvas for creating genesis elements.
  

## What's in the folder

* This folder contains all of the files necessary for the extension.
* `package.json` - this is the manifest file in which extension and command are declared.
  * The sample plugin registers a command and defines its title and command name. With this information VS Code can show the command in the command palette. It doesn’t yet need to load the plugin.
* `src/extension.ts` - this is the main file where the implementation is provided.

## Get up and running straight away

* Press `F5` to open a new window with the extension loaded.
* Run your command from the command palette by pressing (`Ctrl+Shift+P` or `Cmd+Shift+P` on Mac) and typing an appropriate command name.
* Set breakpoints in your code inside `src/extension.ts` to debug your extension.
* Find output from your extension in the debug console.

## Make changes

* You can relaunch the extension from the debug toolbar after changing code in `src/extension.ts`.
* You can also reload (`Ctrl+R` or `Cmd+R` on Mac) the VS Code window with your extension to load your changes.

## Explore the API

* You can open the full set of our API when you open the file `node_modules/@types/vscode/index.d.ts`.
