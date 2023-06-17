import fs from "fs/promises";
import path from "path";

const __filename = process.argv[1];
const __dirname = path.dirname(__filename);

const create = async () => {
  const filePath = path.join(__dirname, "files", "fresh.txt");

  try {
    const fileExists = await fs
      .access(filePath, fs.constants.F_OK)
      .then(() => true)
      .catch(() => false);

    if (!fileExists) {
      await fs.writeFile(filePath, "I am fresh and young");
    } else {
      throw new Error("FS operation failed: File already exists");
    }
  } catch (error) {
    console.error(error.message);
  }
};

await create();
