import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

const __filename = process.argv[1];
const __dirname = path.dirname(__filename);

const calculateHash = async () => {
  const filePath = path.join(__dirname, "files", "fileToCalculateHashFor.txt");

  try {
    const data = await fs.readFile(filePath, "utf-8");
    const hash = crypto.createHash("sha256").update(data).digest("hex");
    console.log(hash);
  } catch (error) {
    console.log(error.message);
  }
};

await calculateHash();
