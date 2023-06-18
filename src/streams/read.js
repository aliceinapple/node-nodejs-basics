import fs from "fs";
import path from "path";

const __filename = process.argv[1];
const __dirname = path.dirname(__filename);

const read = async () => {
  const filePath = path.join(__dirname, "files", "fileToRead.txt");
  const readableStream = fs.createReadStream(filePath);

  readableStream.on("data", (chunk) => {
    process.stdout.write(chunk);
  });
};

await read();
