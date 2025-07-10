const { EmailService } = require('../EmailService');

test('should send email successfully', async () => {
    const service = new EmailService();
    const result = await service.sendEmail({ id: 'test1', to: 'a@mail.com', content: 'hello' });
    expect(result).toMatch(/Sent via Provider/);
});

test('should block duplicate emails', async () => {
    const service = new EmailService();
    await service.sendEmail({ id: 'dup1', to: 'a@mail.com', content: 'one' });
    const result = await service.sendEmail({ id: 'dup1', to: 'a@mail.com', content: 'duplicate' });
    expect(result).toBe('Duplicate email');
});
