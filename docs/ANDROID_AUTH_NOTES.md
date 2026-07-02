# Android Auth Notes

Version: 1.0
Status: Pending

## Google Login Status
Google login for Android is blocked until Android application identity is finalized.

## Required Inputs
Before Google login can be configured, the project must provide:
- Android package name
- SHA-1 certificate fingerprint
- app ownership confirmation

## Constraints
- Do not enable production Google login before the Android app identity is verified.
- Backend and provider configuration must match the final Android signing setup.
- Any placeholder setup must be treated as non-production.

## Current Decision
- Android Google authentication is deferred.
- This is a build and platform configuration issue, not a backend route implementation blocker.

## Next Step
Finalize Android build configuration, then register the app properly with Google auth providers.
