// import * as vscode from 'vscode';
// import * as fs from 'fs';
// import * as path from 'path';

// export class InstallationsProvider implements vscode.TreeDataProvider<Installation> {

// 	private _onDidChangeTreeData: vscode.EventEmitter<Installation | undefined | void> = new vscode.EventEmitter<Installation | undefined | void>();
// 	readonly onDidChangeTreeData: vscode.Event<Installation | undefined | void> = this._onDidChangeTreeData.event;

// 	constructor(private workspaceRoot: string | undefined) {
// 	}

// 	refresh(): void {
// 		this._onDidChangeTreeData.fire();
// 	}

// 	getTreeItem(element: Installation): vscode.TreeItem {
// 		return element;
// 	}

// 	getChildren(element?: Installation): Thenable<Installation[]> {
// 		if (!this.workspaceRoot) {
// 			vscode.window.showInformationMessage('No Installation in empty workspace');
// 			return Promise.resolve([
// 				new Installation("Hello", "World", vscode.TreeItemCollapsibleState.Collapsed)
// 			]);
// 		}

// 		if (element) {
// 			return Promise.resolve(this.getDepsInPackageJson(path.join(this.workspaceRoot, 'node_modules', element.label, 'package.json')));
// 		} else {
// 			const packageJsonPath = path.join(this.workspaceRoot, 'package.json');
// 			if (this.pathExists(packageJsonPath)) {
// 				return Promise.resolve(this.getDepsInPackageJson(packageJsonPath));
// 			} else {
// 				vscode.window.showInformationMessage('Workspace has no package.json');
// 				return Promise.resolve([]);
// 			}
// 		}

// 	}

// 	/**
// 	 * Given the path to package.json, read all its dependencies and devDependencies.
// 	 */
// 	private getDepsInPackageJson(packageJsonPath: string): Installation[] {
// 		const workspaceRoot = this.workspaceRoot;
// 		if (this.pathExists(packageJsonPath) && workspaceRoot) {
// 			const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

// 			const toDep = (moduleName: string, version: string): Installation => {
// 				if (this.pathExists(path.join(workspaceRoot, 'node_modules', moduleName))) {
// 					return new Installation(moduleName, version, vscode.TreeItemCollapsibleState.Collapsed);
// 				} else {
// 					return new Installation(moduleName, version, vscode.TreeItemCollapsibleState.None, {
// 						command: 'extension.openPackageOnNpm',
// 						title: '',
// 						arguments: [moduleName]
// 					});
// 				}
// 			};

// 			const deps = packageJson.dependencies
// 				? Object.keys(packageJson.dependencies).map(dep => toDep(dep, packageJson.dependencies[dep]))
// 				: [];
// 			const devDeps = packageJson.devDependencies
// 				? Object.keys(packageJson.devDependencies).map(dep => toDep(dep, packageJson.devDependencies[dep]))
// 				: [];
// 			return deps.concat(devDeps);
// 		} else {
// 			return [];
// 		}
// 	}

// 	private pathExists(p: string): boolean {
// 		try {
// 			fs.accessSync(p);
// 		} catch {
// 			return false;
// 		}

// 		return true;
// 	}
// }

// export class Installation extends vscode.TreeItem {

// 	constructor(
// 		public readonly label: string,
// 		private readonly version: string,
// 		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
// 		public readonly command?: vscode.Command
// 	) {
// 		super(label, collapsibleState);

// 		this.tooltip = `${this.label}-${this.version}`;
// 		this.description = this.version;
// 	}

// 	iconPath = {
// 		light: vscode.Uri.file(path.join(__filename, '..', '..', 'resources', 'light', 'installation.svg')),
// 		dark: vscode.Uri.file(path.join(__filename, '..', '..', 'resources', 'dark', 'installation.svg'))
// 	};

// 	contextValue = 'installation';
// }

import * as vscode from 'vscode';
import * as path from 'path';

export class InstallationsTreeDataProvider implements vscode.TreeDataProvider<InstallationItem> {
  private _onDidChangeTreeData = new vscode.EventEmitter<InstallationItem | undefined>();
  readonly onDidChangeTreeData = this._onDidChangeTreeData.event;

  private installations: InstallationItem[] = [];

  constructor() {
    // Загрузите начальные данные
    this.refresh();
  }

  refresh(): void {
	let services = [
		new InstallationItem('gc-user-api', '', 'status-ok.svg'),
		new InstallationItem('gc-orch-api', '', 'status-ok.svg'),
		new InstallationItem('gc-gservice', '', 'status-failed.svg'),
		new InstallationItem('gc-agent', '', 'status-ok.svg'),
	]

    // Здесь загрузите ваши установки
    this.installations = [
      new InstallationItem('10.20.0.2', 'connected', undefined, services),
      new InstallationItem('10.130.0.2', 'disconnected'),
    ];
    this._onDidChangeTreeData.fire(undefined);
  }

  getTreeItem(element: InstallationItem): vscode.TreeItem {
    return element;
  }

  getChildren(element?: InstallationItem): Thenable<InstallationItem[]> {
    if (element) {
      return Promise.resolve(element.children || []);
    } else {
      return Promise.resolve(this.installations);
    }
  }
}

class InstallationItem extends vscode.TreeItem {
  children?: InstallationItem[];

  constructor(
    public readonly label: string,
    private version: string,
	private icon?: string,
    children?: InstallationItem[]
  ) {
    super(
      label,
      children ? vscode.TreeItemCollapsibleState.Expanded : vscode.TreeItemCollapsibleState.None
    );
    this.children = children;
    this.tooltip = `${this.label}-${this.version}`;
    this.description = this.version;
    this.contextValue = 'installation';

	if (icon) {
		this.iconPath = {
			light: vscode.Uri.file(path.join(__filename, '..', '..', 'resources', 'light', icon)),
			dark: vscode.Uri.file(path.join(__filename, '..', '..', 'resources', 'dark', icon))
		}
	}

  }

	// iconPath = {
	// 	light: vscode.Uri.file(path.join(__filename, '..', '..', 'resources', 'light', 'plus.svg')),
	// 	dark: vscode.Uri.file(path.join(__filename, '..', '..', 'resources', 'dark', 'plus.svg'))
	// };
}
