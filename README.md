## Usty CRM 
### Introduction
This repo is meant to serve as a SaaS template with a Next.js Typescript frontend and a Rust backend. The design of the template internally is based on a sales-oriented Customer Relationship Management (CRM) tool where users will be able to view their customers, sales records as well as some analytics.

### Features
- Take subscription payments with Stripe
- Email session-based login
- Mailgun (email subscription, welcome email etc)
- Pre-configured frontend routes for easy transition
- Examples of how to implement simple dashboard analytics

### How to Use
Pre-requisites: 

* Rust

* Node.js/NPM.

* [cargo-shuttle](https://www.shuttle.rs)

Simply fork or clone, then use `npm i` to install your frontend dependencies and run `npm run full` to build your frontend assets into the backend.

Then run the command below in the backend folder to start up the full app locally:

```cargo shuttle run```

