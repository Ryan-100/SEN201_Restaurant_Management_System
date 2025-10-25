# Restaurant Management System  

A full-stack Restaurant Management Application built with **ReactJS**. The system helps small restaurants streamline order processing, billing, menu management, and kitchen notifications with a modular and scalable architecture.  

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
- **Database**: LocalStroage 
- **Architecture**: REST API, layered services, data models  

---

## 🚀 Getting Started  

### Prerequisites  
- Node.js & npm  

### Setup  
```bash
# Clone the repository
git clone https://github.com/Ryan-100/SEN201_Restaurant_Management_System.git

# Project setup and start the dev
npm install
npm run dev

# To build the app
npm run build
```

## 🚀 Installation (End Users)

- Windows: run the provided `.exe` installer
- macOS: open `.dmg` and drag the app to Applications
- openSUSE/SUSE: install the `.rpm` (e.g., `sudo zypper install ./RestaurantApp.rpm`)

No additional software is required.

## 🧑‍💻 For Developers

### Local Development
```bash
npm install
npm run dev           # start Vite dev server
npm run dev:electron  # start Electron pointing to Vite
```

### Build Desktop Installers
```bash
npm run build:electron
```
Artifacts are generated in the `release/` directory.