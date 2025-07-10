# Resilient Email Service

## What is a Resilient Email Service?

A Resilient Email Service is designed to ensure reliable email delivery even in the face of failures or network issues. It incorporates strategies such as duplicate prevention, rate limiting, and automatic failover to backup providers. This approach minimizes the risk of lost or repeated emails, handles bursts of traffic gracefully, and improves the overall robustness of email communications. Such resilience is especially important for applications that require high deliverability and consistency, like notifications, alerts, or transactional messages.

## Overview

This project is a Node.js-based email delivery service with built-in resilience features:
- **Duplicate email prevention** (by `email.id`)
- **Rate limiting** (max 5 emails per 10 seconds)
- **Provider failover** (two providers, with retry and backoff)
- **Status tracking** for each email

## File Structure

```
resilient-email-service/
├── index.js                # Entry point, runs the email sending demo
├── EmailService.js         # Main logic for email delivery and resilience
├── tests/
│   └── EmailService.test.js # Unit tests for the service
└── README.md
```


## How It Works

- The main entry point is `index.js`, which initializes the `EmailService` and sends a batch of test emails.
- The core logic is in `EmailService.js`, which defines:
  - `EmailProvider`: Simulates an email provider with a configurable failure rate.
  - `EmailService`: Handles sending emails, rate limiting, duplicate checking, failover, and status tracking.
- Tests are in `tests/EmailService.test.js`, covering successful sends and duplicate blocking.

## Usage

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the Service

```bash
node index.js
```

This will simulate sending a batch of emails, demonstrating duplicate blocking, rate limiting, and failover.

### 3. Run Tests

```bash
npm test
```

## Example

```js
// Import EmailService
const { EmailService } = require('./EmailService');

// Initialize EmailService
const service = new EmailService();

// Send an email
service.sendEmail({ id: 'unique-id', to: 'user@example.com', content: 'Hello!' });

##output

```
Email ID: email1 → Sent via Provider1
Email ID: email2 → Sent via Provider1
Email ID: email1 → Duplicate email
Email ID: email3 → Sent via Provider1
Email ID: email4 → Sent via Provider1
Email ID: email5 → Sent via Provider1
Email ID: email6 → Rate limit exceeded      
  
  📊 Final Email Statuses:
{
  email1: 'Duplicate email',
  email2: 'Sent via Provider1',
  email3: 'Sent via Provider1',
  email4: 'Sent via Provider1',
  email5: 'Sent via Provider1',
  email6: 'Rate limit exceeded'
}


## Features

- **Duplicate Prevention**: Emails with the same `id` are only sent once.
- **Rate Limiting**: No more than 5 emails are sent every 10 seconds.
