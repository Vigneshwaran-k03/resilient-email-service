// Import EmailService
const { EmailService } = require('./EmailService');
// Initialize EmailService
const service = new EmailService();
// List of emails to send (simulate sending)
const testEmails = [
    { id: "email1", to: "vk6755605@gmail.com", content: "Hello User 1" },
    { id: "email2", to: "vk005005@gmail.com", content: "Hello User 2" },
    { id: "email1", to: "vk6755605@gmail.com", content: "Duplicate email" }, // should be blocked
    { id: "email3", to: "vk005005@gmail.com", content: "Hello User 3" },
    { id: "email4", to: "vk6755605@gmail.com", content: "Hello User 4" },
    { id: "email5", to: "vk6755605@gmail.com", content: "Hello User 5" },
    { id: "email6", to: "vk005005@gmail.com", content: "Should hit rate limit" },
];
// Send emails
(async () => {
    for (const email of testEmails) {
        await service.sendEmail(email);
    }
// Print statuses
    console.log("\n📊 Final Email Statuses:");
    console.log(service.emailStatus);
})();
