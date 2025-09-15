# Restaurant Management System  

A full-stack Restaurant Management Application built with **ReactJS** for the frontend and **Go (Goland)** for the backend. The system helps small restaurants streamline order processing, billing, menu management, and kitchen notifications with a modular and scalable architecture.  

---

## ✨ Features  
- **Order Management**: Place, update, and cancel orders linked to table bills.  
- **Menu Management**: Add, update, or remove dishes.  
- **Billing**: Automatic bill calculation per table with adjustments.  
- **Kitchen Workflow**: Real-time notifications for ready dishes/orders.  
- **Role-Based Access**: Manager, Server, and Cook roles with distinct UIs.  

---

## 🛠️ Tech Stack  
- **Frontend**: ReactJS  
- **Backend**: Go (Goland)  
- **Database**: Local DB (future extension: PostgreSQL/MySQL)  
- **Architecture**: REST API, layered services, data models  

---

## 🚀 Getting Started  

### Prerequisites  
- Node.js & npm  
- Go (1.20+)  

### Setup  
```bash
# Clone the repository
git clone https://github.com/Ryan-100/SEN201_Restaurant_Management_System.git

# Frontend setup
cd frontend
npm install
npm start

# Backend setup
cd backend
go run main.go
