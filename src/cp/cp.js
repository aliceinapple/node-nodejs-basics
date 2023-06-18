import { spawn } from "child_process";
import path from "path";

const __dirname = path.dirname(process.argv[1]);
const scriptPath = path.join(__dirname, "files");

const spawnChildProcess = async (args) => {
  const child = spawn("node", [scriptPath, ...args]);

  process.stdin.pipe(child.stdin);
  child.stdout.pipe(process.stdout);
};

spawnChildProcess(["someArgument1", "someArgument2"]);
