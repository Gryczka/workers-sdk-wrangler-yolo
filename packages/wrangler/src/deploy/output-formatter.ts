import chalk from "chalk";

export interface DeployResult {
	success: boolean;
	versionId?: string;
	workerUrl?: string;
	targets?: Array<{ name: string; url?: string }>;
	error?: Error;
	duration: number;
}

export interface FileChange {
	path: string;
	type: "change" | "add" | "unlink";
}

export class YoloOutputFormatter {
	private deploymentCount = 0;
	private verbose: boolean;

	constructor(verbose = false) {
		this.verbose = verbose;
	}

	formatInitialDeploy(): void {
		console.log(chalk.cyan("\n🚀 YOLO Mode activated - watching for changes...\n"));
	}

	formatFileChange(change: FileChange): void {
		const icon = change.type === "add" ? "+" : change.type === "unlink" ? "-" : "~";
		const color = change.type === "add" ? chalk.green : change.type === "unlink" ? chalk.red : chalk.yellow;
		console.log(color(`${icon} ${change.path}`));
	}

	formatDeployStart(change?: FileChange): void {
		this.deploymentCount++;
		const timestamp = new Date().toLocaleTimeString();

		if (!this.verbose) {
			if (change) {
				this.formatFileChange(change);
			}
			console.log(chalk.gray(`[${timestamp}] Deployment #${this.deploymentCount} starting...`));
		}
	}

	formatDeploySuccess(result: DeployResult): void {
		const timestamp = new Date().toLocaleTimeString();

		if (this.verbose) {
			// In verbose mode, the full deploy output is already shown
			// Just add a success marker
			console.log(
				chalk.green(`\n✓ Deployment #${this.deploymentCount} completed successfully in ${result.duration}ms`)
			);
		} else {
			// Condensed output
			const url = result.workerUrl || result.targets?.[0]?.url || "N/A";
			console.log(
				chalk.green(`[${timestamp}] ✓ Deployment #${this.deploymentCount}`) +
				chalk.gray(` (${result.duration}ms)`) +
				chalk.dim(` → ${url}`)
			);
		}
		console.log(); // Empty line for readability
	}

	formatDeployError(error: Error): void {
		const timestamp = new Date().toLocaleTimeString();

		if (this.verbose) {
			console.log(chalk.red(`\n✗ Deployment #${this.deploymentCount} failed:`));
			console.error(error);
		} else {
			console.log(
				chalk.red(`[${timestamp}] ✗ Deployment #${this.deploymentCount} failed: ${error.message}`)
			);
		}
		console.log(); // Empty line for readability
	}

	formatWatchInfo(watchPaths: string[]): void {
		console.log(chalk.gray("Watching:"));
		for (const path of watchPaths) {
			console.log(chalk.gray(`  - ${path}`));
		}
		console.log();
	}

	formatExitMessage(): void {
		console.log(chalk.cyan(`\n👋 YOLO Mode stopped after ${this.deploymentCount} deployments\n`));
	}
}
