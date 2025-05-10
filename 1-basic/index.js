import Paymanai from "paymanai";
import dotenv from "dotenv";

dotenv.config();

const payman = new Paymanai({
  xPaymanAPISecret: process.env.PAYMAN_API_KEY,
});

//Create a payee
//US ACH
const payee = await payman.payments.createPayee({
  type: "US_ACH",
  name: "Hrishi",
  accountHolderName: "Hrishi",
  accountHolderType: "individual",
  accountNumber: "12345678",
  routingNumber: "021000021",
  accountType: "checking",
  contactDetails: {
    email: "hrishi@example.com",
  },
});
// Crypto
const cryptoPayee = await payman.payments.createPayee({
  type: "CRYPTO_ADDRESS",
  name: "Crypto Wallet",
  address: "0x123abc456def789ghi",
  chain: "ethereum",
  currency: "USDC",
  contactDetails: {
    email: "crypto.user@example.com",
  },
  tags: ["crypto", "eth"],
});
//Test Payee
const test_payee = await payman.payments.createPayee({
  type: "TEST_RAILS",
  name: "Hrishikesh",
  tags: ["test", "hrishikesh"],
});

console.log(`Test Payee created: ${test_payee.id}`);
console.log(`Payee created: ${payee.id}`);
console.log(`Crypto Payee created: ${cryptoPayee.id}`);

//Send a payment (depends on payee type)
const payment = await payman.payments.sendPayment({
  amountDecimal: 5.0,
  payeeId: "pd-1f0058d6-7d35-6cb7-845a-879e3cf2ecf4",
});

console.log("Payment sent:", JSON.stringify(payment));

//Search Payee (depends on payee type)
const all_payees = await payman.payments.searchPayees();
const payees_filtered = await payman.payments.searchPayees({
  name: "Hrishikesh",
});

console.log("All payees:", JSON.stringify(all_payees));
console.log("Filtered payees:", JSON.stringify(payees_filtered));

// Check how much money your AI Agent can spend
const balance = await payman.balances.getSpendableBalance("TSD");
console.log(`Available balance: $${balance.toFixed(2)}`);
