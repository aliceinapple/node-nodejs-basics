import fs from "fs/promises";
import path from "path";

const __filename = process.argv[1];
const __dirname = path.dirname(__filename);

const list = async () => {
  const folderPath = path.join(__dirname, "files");

  try {
    const folderExists = await fs
      .access(folderPath, fs.constants.F_OK)
      .then(() => true)
      .catch(() => false);

    if (!folderExists) {
      throw new Error("FS operation failed: folder doesn't exist");
    }

    const folderContent = await fs.readdir(folderPath);
    console.log(folderContent);
  } catch (error) {
    console.log(error.message);
  }
};

await list();
