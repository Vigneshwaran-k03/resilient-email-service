const express = require('express');
const { EmailService } = require('./EmailService');

const app = express();
const service = new EmailService();

app.use(express.json());

app.post('/send-email', async (req, res) => {
    const { id, to, content } = req.body;
    if (!id || !to || !content) {
        return res.status(400).json({ error: 'Missing required fields: id, to, content' });
    }
    try {
        const result = await service.sendEmail({ id, to, content });
        res.json({ status: result });
    } catch (err) {
        res.status(500).json({ error: err.toString() });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Email API running on port ${PORT}`);
});
