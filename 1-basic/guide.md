# PaymanAI Documentation Guide

> Built-in controls for AI Agents to safely send payments

## Table of Contents
1. [Installation](#installation)
2. [Setup & Configuration](#setup--configuration)
3. [Authentication](#authentication)
4. [Quick Start Guide](#quick-start-guide)
5. [API Reference](#api-reference)
6. [Error Handling](#error-handling)
7. [SDK Examples](#sdk-examples)

## Installation

### Python Installation
```bash
# Using pip
pip install paymanai

# Using poetry
poetry add paymanai

# Using pipenv
pipenv install paymanai
```

### Node.js Installation
```bash
# Using npm
npm install paymanai

# Using yarn
yarn add paymanai

# Using pnpm
pnpm install paymanai
```

## Setup & Configuration

### Python Setup
```python
from paymanai import Paymanai

payman = Paymanai(
    x_payman_api_secret="PAYMAN_ACCESS_KEY"
)
```

### Node.js Setup
```javascript
import Paymanai from "paymanai";

const payman = new Paymanai({
    xPaymanAPISecret: "PAYMAN_API_SECRET"
});
```

## Authentication

All API requests require authentication using the `x-payman-api-secret` header. Get your Access key from the [Payman Dashboard](https://app.paymanai.com).

```bash
x-payman-api-secret: YWd0LTFm...
```

## Quick Start Guide

### Send Your First Payment

#### Using Node.js
```javascript
import Payman from "paymanai";

const payman = new Payman({
    xPaymanAPISecret: "<PAYMAN_API_SECRET>",
});

// Create a payee
const payee = await payman.payments.createPayee({
    type: "US_ACH",
    name: "John Doe",
    accountHolderName: "John Doe",
    accountHolderType: "individual",
    accountNumber: "12345678",
    routingNumber: "021000021",
    accountType: "checking",
    contactDetails: {
        email: "john@example.com",
    },
});

// Send payment
const payment = await payman.payments.sendPayment({
    amountDecimal: 100.0,
    payeeId: payee.id,
    memo: "Test payment",
});
```

#### Using Python
```python
from paymanai import Paymanai

payman = Paymanai(
    x_payman_api_secret="<PAYMAN_API_SECRET>"
)

// Create a payee
payee = payman.payments.create_payee(
    type="US_ACH",
    name="John Doe",
    account_holder_name="John Doe",
    account_holder_type="individual",
    account_number="12345678",
    routing_number="021000021",
    account_type="checking",
    contact_details={"email": "john@example.com"}
)

// Send payment
payment = payman.payments.send_payment(
    amount_decimal=100.00,
    payee_id=payee["id"],
    memo="Test payment"
)
```

## API Reference

### Base URL
| Environment | Base URL                      |
| ----------- | ----------------------------- |
| Production  | `https://agent.payman.ai/api` |

### Core Endpoints

1. **Send Payment** - Send funds to payees
2. **Create Payee** - Add payees
3. **Search Payees** - Find existing payees
4. **Check Balance** - View available funds

### API Examples

#### Using cURL
```bash
curl https://agent.payman.ai/api/payments/send-payment \
  -H "x-payman-api-secret: YWd0LTFm..." \
  -H "Accept: application/vnd.payman.v1+json" \
  -H "Content-Type: application/json" \
  -d '{
    "payeeId": "pd-1f001934-7abc",
    "amountDecimal": 50.00,
    "memo": "Service payment"
  }'
```

#### Using Node.js (fetch)
```typescript
const response = await fetch(
    "https://agent.payman.ai/api/payments/send-payment",
    {
        method: "POST",
        headers: {
            "x-payman-api-secret": "YWd0LTFm...",
            Accept: "application/vnd.payman.v1+json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            payeeId: "pd-1f001934-7abc",
            amountDecimal: 50.0,
            memo: "Service payment",
        }),
    }
);

const data = await response.json();
```

#### Using Python (requests)
```python
import requests

response = requests.post(
    'https://agent.payman.ai/api/payments/send-payment',
    headers={
        'x-payman-api-secret': 'YWd0LTFm...',
        'Accept': 'application/vnd.payman.v1+json',
        'Content-Type': 'application/json'
    },
    json={
        'payeeId': 'pd-1f001934-7abc',
        'amountDecimal': 50.00,
        'memo': 'Service payment'
    }
)

data = response.json()
```

### Response Format
All responses use standard HTTP status codes and return JSON in the following format:

```json
{
    "status": 200,
    "data": {
        // Response data specific to each endpoint
    }
}
```

## Error Handling

### HTTP Status Codes

| Status Code | Description                           |
| :---------- | :------------------------------------ |
| 400         | Bad Request - Invalid request payload |
| 401         | Unauthorized - Invalid API key        |
| 403         | Forbidden - Insufficient permissions  |
| 404         | Not Found - Resource doesn't exist    |
| 500         | Server Error - Please contact support |

Need help? Contact support at [support@paymanai.com](mailto:support@paymanai.com)

## Security Notes

<Note>
Keep your API key secure. Never share it in public repositories or client-side code.
</Note>

## Support

For any questions or issues:
- Email: support@paymanai.com
- Dashboard: [https://app.paymanai.com](https://app.paymanai.com)

## SDK Examples

### Search Payees

#### Using Node.js
```typescript
// Get all payees
const payees = await payman.payments.searchPayees();

// Search with filters
const payees = await payman.payments.searchPayees({
    name: "John",
    type: "US_ACH"
});
```

Parameters:
| Parameter | Type   | Description                    |
| --------- | ------ | ------------------------------ |
| `name`    | string | Search by name                 |
| `type`    | string | `'US_ACH'` or `'PAYMAN_AGENT'` |

#### Using Python
```python
# Get all payees
payees = payman.payments.search_payees()

# Search with filters
payees = payman.payments.search_payees(
    name="John",
    type="US_ACH"
)
```

Parameters:
| Parameter | Type | Description                    |
| --------- | ---- | ------------------------------ |
| `name`    | str  | Search by name                 |
| `type`    | str  | `'US_ACH'` or `'PAYMAN_AGENT'` |

> Note: Sensitive data like account numbers are masked in results.

### Check Balances

#### Using Node.js
```typescript
// Check how much money your AI Agent can spend
const balance = await payman.balances.getSpendableBalance("USD");
console.log(`Available balance: $${balance.toFixed(2)}`); // e.g., "Available balance: $150.00"
```

Parameters:
| Parameter  | Type   | Description                                    |
| ---------- | ------ | ---------------------------------------------- |
| `currency` | string | `'USD'`, `'USDC'`, `'TSD'` (For Test Wallets) |

Response:
```typescript
42.5; // $42.50 USD
```

#### Using Python
```python
# Check how much money your AI Agent can spend
balance = payman.balances.get_spendable_balance("USD")
print(f"Available balance: ${balance:.2f}")  # e.g., "Available balance: $150.00"
```

Parameters:
| Parameter  | Type | Description                                   |
| ---------- | ---- | --------------------------------------------- |
| `currency` | str  | `'USD'`, `'USDC'`, `'TSD'` (For Test Wallets) |

Response:
```python
42.50  # $42.50 USD
```

#### Understanding Balances

A balance is considered "spendable" when:
* Funds have been fully settled and verified
* Funds aren't reserved for pending operations
* Funds aren't subject to any holds or restrictions 

### Create Payee

#### Using Node.js
```typescript
// Create a single payee
const payee = await payman.payments.createPayee({
    type: "US_ACH",
    name: "John Doe",
    accountHolderName: "John Doe",
    accountHolderType: "individual",
    accountNumber: "12345678",
    routingNumber: "021000021",
    accountType: "checking",
    contactDetails: {
        email: "john@example.com",
        phone: "+1234567890" // Optional
    }
});

console.log("Payee created:", payee.id);
```

Parameters:
| Parameter           | Type   | Description                                    |
| ------------------ | ------ | ---------------------------------------------- |
| `type`             | string | Payment method type (`'US_ACH'`, `'PAYMAN_AGENT'`) |
| `name`             | string | Payee's full name                              |
| `accountHolderName`| string | Name on the bank account                       |
| `accountHolderType`| string | `'individual'` or `'business'`                 |
| `accountNumber`    | string | Bank account number                            |
| `routingNumber`    | string | Bank routing number                            |
| `accountType`      | string | `'checking'` or `'savings'`                    |
| `contactDetails`   | object | Email and optional phone number                |

#### Using Python
```python
# Create a single payee
payee = payman.payments.create_payee(
    type="US_ACH",
    name="John Doe",
    account_holder_name="John Doe",
    account_holder_type="individual",
    account_number="12345678",
    routing_number="021000021",
    account_type="checking",
    contact_details={
        "email": "john@example.com",
        "phone": "+1234567890"  # Optional
    }
)

print("Payee created:", payee["id"])
```

Parameters:
| Parameter            | Type   | Description                                    |
| ------------------- | ------ | ---------------------------------------------- |
| `type`              | str    | Payment method type (`'US_ACH'`, `'PAYMAN_AGENT'`) |
| `name`              | str    | Payee's full name                              |
| `account_holder_name`| str    | Name on the bank account                       |
| `account_holder_type`| str    | `'individual'` or `'business'`                 |
| `account_number`    | str    | Bank account number                            |
| `routing_number`    | str    | Bank routing number                            |
| `account_type`      | str    | `'checking'` or `'savings'`                    |
| `contact_details`   | dict   | Email and optional phone number                |

### Send Payments

#### Using Node.js
```typescript
// Send a single payment
const payment = await payman.payments.sendPayment({
    amountDecimal: 100.0,
    payeeId: "pd-1f001934-7abc",
    memo: "Invoice payment #123",
    metadata: {  // Optional
        invoiceId: "INV-123",
        category: "services"
    }
});

console.log("Payment sent:", payment.reference);

// Send multiple payments
const payments = await payman.payments.sendBulkPayments([
    {
        amountDecimal: 100.0,
        payeeId: "pd-1f001934-7abc",
        memo: "Invoice #123"
    },
    {
        amountDecimal: 200.0,
        payeeId: "pd-2g002045-8def",
        memo: "Invoice #124"
    }
]);

console.log("Bulk payments sent:", payments.map(p => p.reference));
```

Parameters:
| Parameter       | Type   | Description                                    |
| -------------- | ------ | ---------------------------------------------- |
| `amountDecimal`| number | Payment amount (e.g., 100.0 for $100.00)      |
| `payeeId`      | string | ID of the payee to send payment to            |
| `memo`         | string | Payment description or reference               |
| `metadata`     | object | Optional additional data about the payment     |

#### Using Python
```python
# Send a single payment
payment = payman.payments.send_payment(
    amount_decimal=100.00,
    payee_id="pd-1f001934-7abc",
    memo="Invoice payment #123",
    metadata={  # Optional
        "invoiceId": "INV-123",
        "category": "services"
    }
)

print("Payment sent:", payment["reference"])

# Send multiple payments
payments = payman.payments.send_bulk_payments([
    {
        "amount_decimal": 100.00,
        "payee_id": "pd-1f001934-7abc",
        "memo": "Invoice #123"
    },
    {
        "amount_decimal": 200.00,
        "payee_id": "pd-2g002045-8def",
        "memo": "Invoice #124"
    }
])

print("Bulk payments sent:", [p["reference"] for p in payments])
```

Parameters:
| Parameter       | Type   | Description                                    |
| -------------- | ------ | ---------------------------------------------- |
| `amount_decimal`| float  | Payment amount (e.g., 100.00 for $100.00)     |
| `payee_id`     | str    | ID of the payee to send payment to            |
| `memo`         | str    | Payment description or reference               |
| `metadata`     | dict   | Optional additional data about the payment     |

> Note: All payments require approval in the Payman Dashboard before they are processed.
