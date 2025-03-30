const Queue = require('bull');

// Create a new queue
const jobQueue = new Queue('jobQueue');

// Process jobs in the queue
jobQueue.process(async (job) => {
    try {
        console.log(`Processing job with ID: ${job.id}`);
        // Add your job processing logic here
        return Promise.resolve();
    } catch (error) {
        console.error(`Error processing job with ID: ${job.id}`, error);
        return Promise.reject(error);
    }
});

// Add a job to the queue
const addJobToQueue = async (data) => {
    try {
        const job = await jobQueue.add(data);
        console.log(`Job added to queue with ID: ${job.id}`);
    } catch (error) {
        console.error('Error adding job to queue', error);
    }
};

module.exports = {
    jobQueue,
    addJobToQueue,
};