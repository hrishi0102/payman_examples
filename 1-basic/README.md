# PaymanAI Integration Example

This project demonstrates how to integrate PaymanAI's payment processing capabilities into a Node.js application. It showcases various features including creating payees, sending payments, searching payees, and checking balances.

## Features

- Create different types of payees:
  - US ACH bank transfers
  - Cryptocurrency payments
  - Test payments
- Send payments to payees
- Search and filter payees
- Check available balance
- Environment-based configuration

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- PaymanAI API key

## Installation

1. Clone this repository:
```bash
git clone <repository-url>
cd payman_example
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your PaymanAI API key:
```
PAYMAN_API_KEY=your_api_key_here
```

## Usage

The project includes examples of common PaymanAI operations:

### Creating Payees

```javascript
// Create a US ACH payee
const payee = await payman.payments.createPayee({
    type: "US_ACH",
    name: "Recipient Name",
    accountHolderName: "Account Holder",
    accountHolderType: "individual",
    accountNumber: "12345678",
    routingNumber: "021000021",
    accountType: "checking",
    contactDetails: {
        email: "recipient@example.com",
    },
});

// Create a crypto payee
const cryptoPayee = await payman.payments.createPayee({
    type: "CRYPTO_ADDRESS",
    name: "Crypto Wallet",
    address: "0x123abc456def789ghi",
    chain: "ethereum",
    currency: "USDC",
    contactDetails: {
        email: "crypto.user@example.com"
    }
});
```

### Sending Payments

```javascript
const payment = await payman.payments.sendPayment({
    amountDecimal: 5.00,
    payeeId: 'payee-id',
    memo: 'Invoice #1234',
    metadata: {
        department: "marketing"
    }
});
```

### Searching Payees

```javascript
// Get all payees
const allPayees = await payman.payments.searchPayees();

// Search payees by name
const filteredPayees = await payman.payments.searchPayees({
    name: "Specific Name"
});
```

### Checking Balance

```javascript
const balance = await payman.balances.getSpendableBalance("TSD");
console.log(`Available balance: $${balance.toFixed(2)}`);
```

## Project Structure

- `index.js` - Main application file with example implementations
- `.env` - Environment variables configuration
- `package.json` - Project dependencies and scripts

## Dependencies

- `paymanai` - Official PaymanAI SDK
- `dotenv` - Environment variables management

## Security Notes

- Never commit your `.env` file or expose your API keys
- Always use environment variables for sensitive information
- Follow security best practices when handling payment information

## License

ISC

## Support

For more information about PaymanAI and its features, visit the [official documentation](https://docs.payman.ai). 