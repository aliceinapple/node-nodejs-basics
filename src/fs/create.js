import fs from "fs";
import path from "path";

const __filename = process.argv[1];
const __dirname = path.dirname(__filename);

const create = async () => {
  const filePath = path.join(__dirname, "files", "fresh.txt");

  try {
    await fs.promises.access(filePath, fs.constants.F_OK);
    throw new Error("FS operation failed: File already exists");
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.promises.writeFile(filePath, "I am fresh and young");
    } else {
      throw error;
    }
  }
};

create().catch((error) => {
  console.error(error.message);
});
