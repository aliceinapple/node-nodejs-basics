import fs from "fs/promises";
import path from "path";

const __filename = process.argv[1];
const __dirname = path.dirname(__filename);

const copy = async () => {
  const sourceFolderPath = path.join(__dirname, "files");
  const folderPath = path.join(__dirname, "files_copy");

  try {
    const sourceFolderExist = await fs
      .access(sourceFolderPath, fs.constants.F_OK)
      .then(() => true)
      .catch(() => false);

    if (!sourceFolderExist) {
      throw new Error("FS operation failed: Folder 'files' doesn't exist");
    }

    const folderExists = await fs
      .access(folderPath, fs.constants.F_OK)
      .then(() => true)
      .catch(() => false);

    if (!folderExists) {
      fs.mkdir(folderPath);

      fs.readdir(sourceFolderPath).then((files) => {
        files.forEach((file) => {
          const oldPath = path.join(sourceFolderPath, file);
          const newPath = path.join(folderPath, file);
          fs.copyFile(oldPath, newPath);
        });
      });
    } else {
      throw new Error("FS operation failed: Target folder already exists");
    }
  } catch (error) {
    console.log(error.message);
  }
};

await copy();
