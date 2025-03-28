const Queue = require('bull');

// Create a new queue
const contentQueue = new Queue('content-recommendation');

// Process jobs in the queue
contentQueue.process(async (job) => {
    try {
        console.log(`Processing job with ID: ${job.id}`);
        // Add your content recommendation logic here
        const result = await generateRecommendation(job.data);
        return result;
    } catch (error) {
        console.error(`Error processing job with ID: ${job.id}`, error);
        throw error;
    }
});

// Function to add a job to the queue
const addToQueue = async (data) => {
    try {
        const job = await contentQueue.add(data);
        console.log(`Job added to queue with ID: ${job.id}`);
        return job;
    } catch (error) {
        console.error('Error adding job to queue', error);
        throw error;
    }
};

// Example recommendation logic (replace with actual implementation)
const generateRecommendation = async (data) => {
    // Simulate recommendation generation
    return { recommendations: [`Content for ${data.userId}`] };
};

module.exports = {
    addToQueue,
};