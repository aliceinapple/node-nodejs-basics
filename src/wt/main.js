import { cpus } from "os";
import { Worker } from "worker_threads";
import path from "path";

const __filename = process.argv[1];
const __dirname = path.dirname(__filename);

const workerPath = path.join(__dirname, "worker.js");

const performCalculations = async () => {
  const numberOfCores = cpus().length;

  const createWorkerPromise = (index) => {
    const initialValue = 10;
    const worker = new Worker(workerPath, {
      workerData: index + initialValue,
    });

    return new Promise((resolve, reject) => {
      worker.on("message", resolve);
      worker.on("error", reject);
    });
  };

  const processWorkerPromises = (settledPromises) => {
    return settledPromises.map((promiseResult) => {
      return {
        status: promiseResult.status === "fulfilled" ? "resolved" : "error",
        data: promiseResult.status === "fulfilled" ? promiseResult.value : null,
      };
    });
  };

  const workerPromises = Array.from({ length: numberOfCores }, (_, i) =>
    createWorkerPromise(i)
  );
  const settledPromises = await Promise.allSettled(workerPromises);
  const calculationLog = processWorkerPromises(settledPromises);

  console.log(calculationLog);
};

await performCalculations();
