import { Transform } from "stream";

const transform = async () => {
  const reverseTransform = new Transform({
    transform(chunk, encoding, callback) {
      const reversedChunk = [...chunk.toString()].reverse().join("").trim();
      this.push(reversedChunk + "\n");
      callback();
    },
  });

  process.stdin.pipe(reverseTransform).pipe(process.stdout);
};

await transform();
