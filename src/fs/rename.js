import fs from "fs/promises";
import path from "path";

const __filename = process.argv[1];
const __dirname = path.dirname(__filename);

const rename = async () => {
  const sourceFilePath = path.join(__dirname, "files", "wrongFilename.txt");
  const targetFilePath = path.join(__dirname, "files", "properFilename.md");

  try {
    const targetFileExists = await fs
      .access(targetFilePath, fs.constants.F_OK)
      .then(() => true)
      .catch(() => false);

    if (targetFileExists) {
      throw new Error("FS operation failed: Target file already exists");
    }

    const sourceFileExists = await fs
      .access(sourceFilePath, fs.constants.F_OK)
      .then(() => true)
      .catch(() => false);

    if (!sourceFileExists) {
      throw new Error("FS operation failed: Source file doesn't exist");
    }

    await fs.rename(sourceFilePath, targetFilePath);
  } catch (error) {
    console.log(error.message);
  }
};

await rename();
