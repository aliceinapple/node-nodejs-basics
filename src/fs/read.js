import fs from "fs/promises";
import path from "path";

const __filename = process.argv[1];
const __dirname = path.dirname(__filename);

const read = async () => {
  const filePath = path.join(__dirname, "files", "fileToRead.txt");

  try {
    const fileExists = await fs
      .access(filePath, fs.constants.F_OK)
      .then(() => true)
      .catch(() => false);

    if (!fileExists) {
      throw new Error("FS operation failed: file doesn't exist");
    }

    const fileContent = await fs.readFile(filePath, "utf-8");
    console.log(fileContent);
  } catch (error) {
    console.log(error.message);
  }
};

await read();
