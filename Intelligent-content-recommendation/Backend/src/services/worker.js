const { Worker, isMainThread, parentPort } = require('worker_threads');
const { workerData } = require('worker_threads');

if (isMainThread) {
    // This code will be executed in the main thread
    module.exports = function runWorker(workerData) {
        return new Promise((resolve, reject) => {
            const worker = new Worker(__filename, { workerData });

            worker.on('message', resolve);
            worker.on('error', reject);
            worker.on('exit', (code) => {
                if (code !== 0) {
                    reject(new Error(`Worker stopped with exit code ${code}`));
                }
            });
        });
    };
} else {
    // This code will be executed in the worker thread

    // Perform some computation or task
    const result = workerData * 2; // Example: doubling the input

    // Send the result back to the main thread
    parentPort.postMessage(result);
}