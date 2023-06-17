import fs from "fs";
import path from "path";

const __filename = process.argv[1];
const __dirname = path.dirname(__filename);

const write = async () => {
  const filePath = path.join(__dirname, "files", "fileToWrite.txt");

  const writableStream = fs.createWriteStream(filePath);

  process.stdin.pipe(writableStream);
};

await write();
