# 🍽️ Mess Management System

A comprehensive digital platform for managing college mess operations, food ordering, and meal subscriptions. Built with modern web technologies to provide a seamless experience for students, staff, and administrators.

[![Next.js](https://img.shields.io/badge/Next.js-16.0.6-black)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Prisma-blue)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 📖 Overview

The **Mess Management System** is a unified mobile and web-based platform designed to simplify the food ordering and dining experience within a college mess or cafeteria. It enables students and staff to browse menus, place dine-in or takeaway orders, manage subscriptions, and make secure payments through a fully digital, paperless, and efficient system.

## ✨ Key Features

### 🔐 Core Functionality
- **QR-Based Meal Access** - Unique QR codes for every order and subscription to ensure security and prevent misuse
- **Paperless Operations** - Complete digital workflow eliminating physical meal coupons
- **Multi-Outlet Support** - Manage multiple outlets (Darshani, Fuel Up, etc.) with unique menus
- **Role-Based Access** - Separate interfaces for Students, Staff, and Admins

### 📊 Analytics & Management
- **Real-Time Dashboard** - Live food consumption statistics and order tracking
- **Analytics Dashboard** - Sales trends, popular items, peak hours, and consumption patterns
- **Weekly Reports** - Automated meal attendance summaries for students
- **Expense Tracking** - Monthly spending analytics for budget management

### 🎯 User Experience
- **Rewards System** - Earn points for consistent attendance, redeem for perks
- **Feedback Portal** - Review and rating system for continuous improvement
- **Smart Notifications** - Real-time alerts for orders, subscriptions, and updates
- **Weekly Menu** - View and plan meals with advance menu scheduling

### 👥 Multi-Role Support

| Role | Capabilities |
|------|--------------|
| **Student/User** | Browse menus, place orders, manage subscriptions, view QR codes, track expenses |
| **Admin** | Full CRUD on menu items, order management, analytics, user management, feedback review |

## 🏗️ Architecture

```
Team-optimus/
├── client/          # Next.js frontend application
│   ├── src/
│   │   ├── app/     # App router pages
│   │   ├── components/
│   │   └── styles/
│   └── public/
│
└── server/          # Node.js + Express backend
    ├── prisma/      # Database schema & migrations
    ├── src/
    │   ├── controllers/
    │   ├── routes/
    │   ├── middleware/
    │   └── config/
    └── .env
```

## 🚀 Tech Stack

### Frontend
- **Framework:** Next.js 16.0.6 (React 19.2.0)
- **Styling:** CSS Modules
- **UI Icons:** Lucide React
- **Charts:** Recharts
- **HTTP Client:** Axios

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js 5.1.0
- **Database:** PostgreSQL
- **ORM:** Prisma 6.18.0
- **Authentication:** JWT + bcrypt
- **Other:** CORS, Cookie Parser, Morgan (logging)

## 📦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mrsandy1965/Team-optimus.git
   cd Team-optimus
   ```

2. **Backend Setup**
   ```bash
   cd server
   cp .env.example .env
   # Edit .env with your database credentials and JWT secret
   npm install
   npx prisma migrate dev
   npx prisma generate
   npx prisma db seed #optional
   npm run start
   ```

3. **Frontend Setup**
   ```bash
   cd ../client
   npm install
   npm run build
   npm run dev
   ```

4. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000

### Creating Admin User

```bash
cd server
node createAdmin.js
```

## 🔑 Environment Variables

### Server (.env)
```env
DATABASE_URL="postgresql://user:password@localhost:5432/mess_db"
JWT_SECRET="your-secret-key"
PORT=8000
```

## 📱 Application Features

### For Students
- Browse menu items by outlet and category
- Add items to cart and place orders
- Generate QR codes for meal collection
- Subscribe to weekly/monthly meal plans
- View order history and track expenses
- Submit feedback and ratings
- Earn and redeem reward points
- View weekly menu schedules

### For Admins
- **Menu Management:** Add, edit, delete menu items with quantity tracking
- **Order Management:** View and manage all customer orders
- **Feedback Review:** Monitor and respond to user feedback
- **Analytics:** Comprehensive dashboards for data-driven decisions
- **User Management:** Manage user roles and permissions
- **Weekly Menu:** Create and publish weekly meal schedules

### For Staff
- Scan and validate QR codes for meal redemption
- Update order preparation status
- View assigned orders by time slot

## 🗄️ Database Schema

Key models include:
- **User** - Student/Staff/Admin accounts with role-based access
- **MenuItem** - Food items with pricing, availability, and outlet info
- **Order** - Customer orders with payment and QR codes
- **Subscription** - Meal plan subscriptions with time-bound QR codes
- **Feedback** - User reviews and ratings
- **Reward** - Points system for user engagement
- **WeeklyMenu** - Scheduled meal planning
- **Notification** - Real-time alerts and updates

See [server/prisma/schema.prisma](server/prisma/schema.prisma) for complete schema.

## 🛣️ API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/validate` - Validate JWT token

### Menu
- `GET /api/menu/items` - Get all menu items
- `POST /api/menu/items` - Create menu item (Admin)
- `PUT /api/menu/items/:id` - Update menu item (Admin)
- `DELETE /api/menu/items/:id` - Delete menu item (Admin)

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order
- `GET /api/orders/all` - Get all orders (Admin)
- `PUT /api/orders/:id/status` - Update order status

### Feedback
- `GET /api/feedback` - Get all feedback (Admin)
- `POST /api/feedback` - Submit feedback

### Weekly Menu
- `GET /api/weekly-menu` - Get weekly menu
- `POST /api/weekly-menu` - Create/update weekly menu (Admin)

See full API documentation in [server README](server/README.md).

## 🎨 Screenshots

> Add screenshots of your application here

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team Optimus

Built with ❤️ by Team Optimus for enhanced campus dining experience.

## 📧 Contact

For queries and support, please open an issue on GitHub.

---

**Note:** This is an academic project developed for college mess management. Feel free to adapt it for your institution's needs.
