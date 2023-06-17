import fs from "fs";
import path from "path";
import zlib from "zlib";
import { pipeline } from "stream/promises";

const __filename = process.argv[1];
const __dirname = path.dirname(__filename);

const compress = async () => {
  const inputFilePath = path.join(__dirname, "files", "fileToCompress.txt");
  const outputFilePath = path.join(__dirname, "files", "archive.gz");

  const readStream = fs.createReadStream(inputFilePath);
  const writeStream = fs.createWriteStream(outputFilePath);
  const gzipStream = zlib.createGzip();

  await pipeline(readStream, gzipStream, writeStream);
};

await compress();
