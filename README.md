## Usty CRM 
### Introduction
This repo is an example of a CRM SaaS written with a Next.js Typescript frontend and a Rust backend.

### Features
- Take subscription payments with Stripe
- CRUD API for customers/contracts ("deals")
- Email and OAuth (via Google) login
- Mailgun (email subscription, welcome email etc)

### Todo List
#### Backend
- Oauth? Not sure if this will be implemented.
- Background task for deleting expired sessions from database

#### Frontend
- Edit customer function
- Deal index page
- Single deal page
- Create deal page
- Delete deal function
- Edit deal function

- Make pricing table pretty