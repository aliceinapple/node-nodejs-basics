import fs from "fs";
import path from "path";
import zlib from "zlib";
import { pipeline } from "stream/promises";

const __filename = process.argv[1];
const __dirname = path.dirname(__filename);

const inputFilePath = path.join(__dirname, "files", "archive.gz");
const outputFilePath = path.join(__dirname, "files", "fileToDeCompress.txt");

const decompress = async () => {
  const readStream = fs.createReadStream(inputFilePath);
  const gzipStream = zlib.createUnzip();
  const writeStream = fs.createWriteStream(outputFilePath);

  await pipeline(readStream, gzipStream, writeStream);
};

await decompress();
