---
title: Pricing & credits
nav_order: 3
parent: Docs
---

# Pricing & credits

[UnifAPI](https://unifapi.com) is **pay-per-call**. Every endpoint costs a fixed number of credits, you top up when you need them, and there is no monthly subscription. Live pricing: [unifapi.com/pricing](https://unifapi.com/pricing).

## How credits work

- Each endpoint has a published credit cost (e.g. `twitter/users/lookup` = 1 credit, `scrape/structured` = 5 credits).
- Calls deduct credits from your balance in real time.
- Every response returns a `X-UnifAPI-Credits-Used` header.

This decouples your bill from any single upstream provider's price moves — you pay the same per-credit rate regardless of which platform you call.

## Plans

### Free
- Monthly credit grant
- No credit card required
- Full access to every endpoint
- Rate limited for fair use

### Pay-as-you-go
- Top up credits in any amount
- No monthly minimum
- No hard request caps — limit is your balance
- Volume discounts at higher top-up tiers
- Default plan once you add a payment method

### Enterprise
- Volume pricing
- SLA, dedicated support, invoicing
- Custom contracts and DPAs
- [Contact sales](https://unifapi.com)

## Why no subscription tiers?

Most agent workloads are spiky — a research run for a few hours, then nothing for a week. Subscription pricing (looking at you, [RapidAPI](../comparisons/unifapi-vs-rapidapi.md)) forces you to size for peak load and pay flat in the troughs. Pay-per-call removes that overhead.

Read more: [Pay-per-call vs subscription APIs](../guides/pay-per-call-vs-subscription-apis.md).

## Where to see live prices

The full per-endpoint credit table lives at [unifapi.com/pricing](https://unifapi.com/pricing) and updates whenever an endpoint is repriced.
