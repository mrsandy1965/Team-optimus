```markdown
# Mess Management System

About
A mobile + web platform to manage college mess orders, subscriptions and QR-based meal verification.

How to start
1. Clone the repo:
   git clone https://github.com/mrsandy1965/Team-optimus.git
   cd Team-optimus

2. Backend:
   cd backend
   cp .env.example .env        # edit .env with DB and API keys
   npm install
   npx prisma migrate dev     # create DB schema
   npm run dev

3. Web:
   cd ../web
   npm install
   npm start

4. Mobile (optional):
   cd ../mobile
   npm install
   expo start

That's it — minimal steps to get the project running locally.
```
