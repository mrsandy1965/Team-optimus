# 🍽️ Mess Management System (Food Ordering for College Canteen)

## 📖 Project Introduction
The **Mess Management System** is a unified mobile and web-based platform designed to simplify the food ordering and dining experience within a college mess or cafeteria.  
It enables students and staff to browse menus, place dine-in or takeaway orders, manage subscriptions, and make secure payments — all through a **digital, paperless, and efficient system**.

---

## 🎯 Key Objectives
- Digitize the mess food ordering and subscription process.  
- Offer both mobile and web platforms for flexible accessibility.  
- Implement secure backend authentication, order management, and QR verification.  
- Provide real-time updates for orders, meal availability, and analytics.  
- Enable single-use QR codes to ensure security and prevent misuse.  
- Support data-driven decision-making for resource management and food wastage reduction.

---

## ⚙️ Core Features

### 1. QR-Based Meal Access
- Every student has a unique ID linked to their mess account.  
- For every meal (Breakfast, Lunch, Snacks, Dinner), a unique QR code is generated.  
- Scanning the QR grants meal access — ensuring transparency, security, and no coupon misuse.

### 2. Paperless System
- Eliminates physical meal coupons.  
- Fully digital and eco-friendly approach.

### 3. Real-Time Food Consumption Visualization
- A live dashboard shows daily meal consumption statistics.  
- Helps mess management track food usage and reduce wastage efficiently.

### 4. Weekly Meal Reports
- Students receive a weekly summary showing their meal attendance and frequency.  
- Promotes accountability and identifies irregular eating patterns.

### 5. Student Feedback & Review Portal
- A dedicated page where students can submit reviews, ratings, and suggestions.  
- Allows the administration to monitor satisfaction and act on complaints quickly.

### 6. User-Friendly Interface
- Clean, minimal, and intuitive UI for both students and mess staff.  
- Consistent design across mobile and web apps for smooth navigation.

### 7. Smart Notifications
Instant alerts for:
- Meal preparation updates  
- Upcoming meal closing times  
- Subscription expirations  
- Payment or QR validation issues  

### 8. Rewards & Engagement System
- Students earn reward points for consistent mess attendance.  
- Points can be redeemed for perks like free beverages or store discounts.  
- Encourages daily participation and engagement.

### 9. Expense Tracking Dashboard
- Displays monthly spending analytics for mess and café outlets (e.g., D-Café).  
- Helps students budget their expenses and monitor financial habits.

---

## 📱 Platform Overview

### 🟩 Mobile Application
**Features:**
- Login via mobile number + OTP (Firebase/Twilio verification)  
- 3 main navigation tabs: **Home | Orders | Account**  
- Dine-in options: **Darshani, Fuel Up, Grab n Go, Nescafe**  
- Add-to-cart, pay, and generate QR codes for meal collection  
- Manage subscriptions with time-based meal QR codes  
- Smooth, responsive, and easy-to-use UI  

### 💻 Web Portal

#### 👨‍🎓 User Panel
- Similar to mobile app features: Browse menu, order, pay, track QR, manage subscriptions.

#### 👨‍💼 Admin Panel
- Manage menu items and pricing  
- Track live orders and validate QR scans  
- Manage subscriptions and time slots  
- View analytics dashboards for:
  - Sales trends  
  - Most ordered items  
  - Peak hours  
  - Meal consumption reports  

#### 👨‍🍳 Staff Panel
- QR Scanner Interface for real-time meal validation.  
- Update order preparation and completion status.  
- View orders by time slot and meal category.

---

## 🔁 User Flow

### 🔐 Login & Authentication
- User logs in via mobile number + OTP.  
- Authentication handled securely by Firebase/Twilio.

### 🏠 Home Section (App/Web)
- Displays available outlets, menu categories, recommendations, and search bar.  
- Includes quick access to subscriptions.

### 🍴 Ordering Flow
1. User browses menu → adds items to cart.  
2. Proceeds to checkout → completes payment.  
3. Backend generates a unique one-time-use QR code.  
4. Mess staff scan the QR to verify and mark it as used.

### 🧾 Orders Section
- Displays all previous and ongoing orders.  
- “Reorder” option for frequent meals.

### 💳 Subscription Flow
- User buys a meal plan (weekly/monthly).  
- Backend automatically generates QR codes for each meal slot (breakfast, lunch, etc.).  
- QR codes have **time-bound validity** and expire after each use.

---

## 👥 User Roles and Permissions

| Role | Permissions / Capabilities |
|------|-----------------------------|
| **User (Student/Staff)** | Browse menus, place orders, manage subscriptions, generate/view QR codes |
| **Staff** | Scan and validate QR codes, update order status |
| **Admin** | Manage menu, monitor orders, view analytics, manage users/subscriptions, control access |

---

## 🧩 Page / Screen List (Frontend)

### 📱 Mobile Application
- Login / OTP Verification  
- Home – Outlets, Recommendations, Search  
- Menu – Items list with filters  
- Cart – Order summary & Payment  
- QR Code Display – Post confirmation  
- Orders – Ongoing and previous orders  
- Subscriptions – Manage plans & QR validity  
- Account – Profile, Help, Logout  

### 💻 Web Portal
- **User Dashboard:** Menu, Cart, Orders, QR Codes  
- **Admin Dashboard:** Menu & Order Management, Analytics  
- **Staff Dashboard:** QR Scanner, Order Updates  

---

## 🗄️ Database Schema (Rough Draft)

### **Users**
| Column Name | Data Type | Description | Key / Relationship | Notes |
|--------------|------------|--------------|--------------------|--------|
| user_id | SERIAL | Unique user ID | Primary Key |  |
| name | VARCHAR(100) | Full name of user |  |  |
| mobile | VARCHAR(15) | Mobile number | Unique |  |
| role | ENUM('user','staff','admin') | Role of user |  |  |
| created_at | TIMESTAMP | Account creation timestamp |  |  |

---

### **MenuItems**
| Column Name | Data Type | Description | Key / Relationship | Notes |
|--------------|------------|--------------|--------------------|--------|
| item_id | SERIAL | Unique menu item ID | Primary Key |  |
| name | VARCHAR(100) | Item name |  |  |
| category | VARCHAR(50) | Food category |  |  |
| price | DECIMAL(10,2) | Price of item |  |  |
| outlet_name | VARCHAR(100) | Name of outlet | Foreign Key → Outlets |  |
| availability | BOOLEAN | Item available or not |  |  |

---

### **Orders**
| Column Name | Data Type | Description | Key / Relationship | Notes |
|--------------|------------|--------------|--------------------|--------|
| order_id | SERIAL | Unique order ID | Primary Key |  |
| user_id | INT | User who placed order | Foreign Key → Users |  |
| total_amount | DECIMAL(10,2) | Total amount of order |  |  |
| payment_status | VARCHAR(20) | Status of payment |  |  |
| qr_code | TEXT | Generated QR code |  |  |
| created_at | TIMESTAMP | Order timestamp |  |  |

---

### **OrderItems**
| Column Name | Data Type | Description | Key / Relationship | Notes |
|--------------|------------|--------------|--------------------|--------|
| order_item_id | SERIAL | Unique order item ID | Primary Key |  |
| order_id | INT | Linked order | Foreign Key → Orders |  |
| item_id | INT | Linked menu item | Foreign Key → MenuItems |  |
| quantity | INT | Quantity ordered |  |  |

---

### **Subscriptions**
| Column Name | Data Type | Description | Key / Relationship | Notes |
|--------------|------------|--------------|--------------------|--------|
| subscription_id | SERIAL | Unique subscription ID | Primary Key |  |
| user_id | INT | Linked user | Foreign Key → Users |  |
| plan_type | VARCHAR(50) | Type of meal plan |  |  |
| start_date | DATE | Start date of plan |  |  |
| end_date | DATE | End date of plan |  |  |
| qr_code | TEXT | Subscription QR code |  |  |

---

### **Outlets**
| Column Name | Data Type | Description | Key / Relationship | Notes |
|--------------|------------|--------------|--------------------|--------|
| outlet_id | SERIAL | Unique outlet ID | Primary Key |  |
| name | VARCHAR(100) | Outlet name |  |  |
| location | VARCHAR(100) | Outlet location |  |  |

---

### **Payments**
| Column Name | Data Type | Description | Key / Relationship | Notes |
|--------------|------------|--------------|--------------------|--------|
| payment_id | SERIAL | Unique payment ID | Primary Key |  |
| order_id | INT | Related order | Foreign Key → Orders |  |
| amount | DECIMAL(10,2) | Paid amount |  |  |
| method | VARCHAR(20) | Payment method |  |  |
| status | VARCHAR(20) | Payment status |  |  |
| timestamp | TIMESTAMP | Payment timestamp |  |  |

---

### **QRValidation**
| Column Name | Data Type | Description | Key / Relationship | Notes |
|--------------|------------|--------------|--------------------|--------|
| qr_id | SERIAL | Unique QR ID | Primary Key |  |
| qr_code | TEXT | QR code string |  |  |
| is_used | BOOLEAN | If QR already used |  |  |
| valid_until | TIMESTAMP | Expiration time |  |  |

---

## 💻 Tech Stack (Tentative)

| Layer | Technology |
|--------|-------------|
| **Frontend (Mobile)** | React Native (Expo) |
| **Frontend (Web)** | React.js |
| **Backend** | Node.js + Express |
| **Database** | PostgreSQL (via Prisma ORM) |
| **Authentication** | Firebase / OAuth |
| **Hosting / Deployment** | Vercel (Frontend), Render / Railway (Backend) |
| **Version Control** | GitHub |

---

## 🔄 Flow Chart
*(To be added as a diagram in project documentation or README visuals.)*

---

## ✅ Expected Outcomes
- Fully functional mobile + web platform for digital mess management  
- Real-time order tracking & QR-based verification  
- Secure authentication and payment integration  
- Data-driven analytics and reports  
- Streamlined admin control and reduced wastage  
- Scalable for multi-campus or multiple outlets  

---
