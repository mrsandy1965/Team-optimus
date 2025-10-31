```markdown
# Mess Management System
The Mess Management App is designed to enhance the food ordering and dining experience for students and staff within a campus mess or cafeteria system. It integrates a mobile-first user experience with a backend-driven order and subscription management system, ensuring a seamless process from login to payment.

# Key Highlights
   Mobile-friendly navigation with search, filters, and recommendations.
   Secure QR-based redemption system (for both orders and subscriptions).
   Backend handles authentication, menu data, order management, and QR lifecycle.
   Scalable design for multiple outlets with unique menus.

# About
A mobile + web platform to manage college mess orders, subscriptions and QR-based meal verification.

How to start
1. Clone the repo:
   git clone https://github.com/mrsandy1965/Team-optimus.git
   cd Team-optimus

2. Backend:
   cd server
   cp .env.example .env        # edit .env with DB and API keys
   npm install
   npx prisma migrate dev     # create DB schema
   npm run dev

That's it — minimal steps to get the project running locally.
```
