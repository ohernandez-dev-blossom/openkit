---
name: fee-calc
description: Calculate PayPal, Stripe, or Wise payment processing fees. Use when the user asks how much PayPal charges, what Stripe fees will be, how much someone needs to send for the recipient to receive a specific amount, or what the net amount after payment fees will be.
---

# Payment Fee Calculator

Calculate the exact fee charged by PayPal, Stripe, or Wise, in either direction: "I'm sending X — how much arrives?" or "I want to receive X — how much should they send?"

## Input
- `provider` — paypal | stripe | wise (required)
- `fee_type` — specific fee structure (see reference below)
- `amount` — the dollar amount (required)
- `mode` — `send` (I'm sending X) | `receive` (I want to receive X) (default: receive)

## Output
- Send amount
- Fee amount (with rate formula)
- Receive amount
- Effective fee rate (as a percentage of the send amount)

## Instructions

### Fee formula

**Send mode** (I'm sending `amount`, what does the recipient receive?):
```
fee = amount × (percentage / 100) + fixed
receive = amount - fee
effectiveRate = (fee / amount) × 100
```

**Receive mode** (I want to receive `amount`, how much must be sent?):
```
send = (amount + fixed) / (1 - percentage / 100)
fee = send - amount
effectiveRate = (fee / send) × 100
```

### Fee structures reference

**PayPal**

| Fee Type            | Percentage | Fixed  | Description                                      |
|---------------------|-----------|--------|--------------------------------------------------|
| paypal-standard     | 3.49%     | $0.49  | Invoicing, PayPal Checkout, Venmo                |
| paypal-qr           | 2.29%     | $0.09  | In-person QR code payments                       |
| paypal-friends      | 0%        | $0.00  | Friends & Family (domestic, balance/bank funded) |

**Stripe**

| Fee Type        | Percentage | Fixed  | Description                               |
|----------------|-----------|--------|-------------------------------------------|
| stripe-standard | 2.9%      | $0.30  | Online card payments                      |
| stripe-intl     | 3.9%      | $0.30  | International cards + currency conversion |

**Wise**

| Fee Type  | Percentage | Fixed  | Description                        |
|-----------|-----------|--------|------------------------------------|
| wise-usd  | 1.2%      | $0.00  | USD transfers (varies by route)    |
| wise-eur  | 0.41%     | $0.00  | EUR transfers (varies by route)    |

### Formatting
- Round all monetary values to 2 decimal places.
- Show the fee formula used (e.g. `3.49% + $0.49`).

## Options
- `provider` — paypal | stripe | wise (required)
- `fee_type` — see reference table; defaults to the first fee type for the provider
- `amount` — numeric (required)
- `mode` — send | receive (default: receive)

## Examples

**Input:** PayPal Standard, receive $100

**Output:**
```
Fee structure: PayPal Standard (3.49% + $0.49)
Mode: I want to receive $100.00

They should send:  $104.65
Fee charged:       -$4.65
You receive:       $100.00
Effective rate:    4.44%
```

**Input:** Stripe Standard, sending $250

**Output:**
```
Fee structure: Stripe Standard (2.9% + $0.30)
Mode: I'm sending $250.00

Send amount:   $250.00
Fee charged:   -$7.55
They receive:  $242.45
Effective rate: 3.02%
```

**Input:** "How much does PayPal Friends & Family charge to send $500?"

**Output:**
```
Fee structure: PayPal Friends & Family (0% + $0.00)
No fee charged for domestic Friends & Family payments.

Send: $500.00 → Receive: $500.00
```

## Error Handling
- If the provider is not one of the three supported options, list them and ask for clarification.
- If the fee type is not specified, use the first/standard fee type for the provider and note which one was used.
- If the amount is zero or negative, ask for a valid amount.
- Note that rates are estimates based on standard published rates and may vary. Last verified: January 2026.
