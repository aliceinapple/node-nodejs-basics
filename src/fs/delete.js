import fs from "fs/promises";
import path from "path";

const __filename = process.argv[1];
const __dirname = path.dirname(__filename);

const remove = async () => {
  const filePath = path.join(__dirname, "files", "fileToRemove.txt");

  try {
    const fileExists = await fs
      .access(filePath, fs.constants.F_OK)
      .then(() => true)
      .catch(() => false);

    if (!fileExists) {
      throw new Error("FS operation failed: File doesn't exist");
    }

    await fs.unlink(filePath);
  } catch (error) {
    console.log(error.message);
  }
};

await remove();
