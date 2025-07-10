// Define EmailProvider class and fail rate
class EmailProvider {
    constructor(name, failRate = 0.2) {
        this.name = name;
        this.failRate = failRate;
    }
// Define send method with random failure and 200ms delay
    async send(email) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                Math.random() < this.failRate ? reject(`${this.name} failed`) : resolve(`${this.name} sent`);
            }, 200);
        });
    }
}
// Define EmailService class with rate limiting and duplicate checking
class EmailService {
    constructor() {
        // Initialize providers
        this.provider1 = new EmailProvider("Provider1");
        this.provider2 = new EmailProvider("Provider2");
        // Initialize sent emails set to track sent emails
        this.sentEmails = new Set();
        // Initialize email status object to track status of each email
        this.emailStatus = {};
        // Initialize rate limit SO 5 emails per 10 seconds
        this.rateLimit = 5;
        // Initialize queue because of backoff
        this.queue = [];
        // Initialize window to track time of emails sent
        this.window = [];
    }
// Define sendEmail method with rate limiting and duplicate checking
    async sendEmail(email) {
        const emailId = email.id;
        const now = Date.now();

        // Rate limiting: 5 emails per 10 seconds
        this.window = this.window.filter(t => now - t < 10000);
        if (this.window.length >= this.rateLimit) {
            return this.trackStatus(emailId, "Rate limit exceeded");
        }
// Check if email is a duplicate
        if (this.sentEmails.has(emailId)) {
            return this.trackStatus(emailId, "Duplicate email");
        }
// Add email to window
        this.window.push(now);
        let attempt = 0;
        const maxAttempts = 3;
// Define backoff function
// Backoff is a strategy to avoid overloading the system
        const backoff = delay => new Promise(res => setTimeout(res, delay));
        while (attempt < maxAttempts) {
            try {
                await this.provider1.send(email);
                this.sentEmails.add(emailId);
                return this.trackStatus(emailId, "Sent via Provider1");
            } catch {
                attempt++;
                await backoff(2 ** attempt * 100);
            }
        }
// If provider 1 fails, try provider 2 because of backoff
        try {
            await this.provider2.send(email);
            this.sentEmails.add(emailId);
            return this.trackStatus(emailId, "Sent via Provider2");
        } catch (err) {
            return this.trackStatus(emailId, `Failed via both providers`);
        }
    }
// Define trackStatus method to track status of each email
    trackStatus(id, status) {
        this.emailStatus[id] = status;
        console.log(`Email ID: ${id} → ${status}`);
        return status;
    }
// Define getStatus method to get status of each email   
    getStatus(id) {
        return this.emailStatus[id] || "Unknown ID";
    }
}
// Export EmailService to be used in other files
module.exports = { EmailService };
