# Payments / Stripe Notes

Version: 1.0
Status: Sandbox Only

## Current Status
Stripe is not production-ready yet.

## Rules
- Use sandbox or test placeholders only.
- Do not enable real payment processing.
- Do not expose live Stripe keys in local files, committed code, or documentation.

## Backend Direction
- Purchase flows may be documented and stubbed.
- Real payment capture, webhooks, reconciliation, and entitlement validation remain future work.
- Payment-triggered rewards must ultimately route through Reward Engine v1 and Economy v2.

## Readiness Requirements
Production Stripe enablement requires:
- verified Stripe production account
- secure live secret handling
- webhook verification strategy
- audited purchase and reward flow
- deployment readiness review

## Decision
Until these conditions are met, ZUNO Battle remains on Stripe sandbox/test configuration only.
