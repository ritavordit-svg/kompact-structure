class RequestQueue {
    constructor() {
        this.queue = [];
        this.processing = false;
    }

    enqueue(request) {
        this.queue.push(request);
        if (!this.processing) {
            this.processNext();
        }
    }

    async processNext() {
        if (this.queue.length === 0) {
            this.processing = false;
            return;
        }

        // await this.delay(2000);

        this.processing = true;
        const request = this.queue.shift();
        try {
            await request();
        } catch (error) {
            console.error("Error processing request:", error);
        } finally {
            this.processNext();
        }
    }

    // delay(ms) {
    //     return new Promise(resolve => setTimeout(resolve, ms));
    // }
}

module.exports = RequestQueue;
