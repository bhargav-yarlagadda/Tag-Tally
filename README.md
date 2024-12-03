# E-Commerce Product Scraping Site

This project is a powerful e-commerce product scraping site built using Next.js and Bright Data's Web Unlocker. It is designed to assist users in making informed purchasing decisions by tracking product prices and availability. Users are notified when product prices drop, and competitors are alerted when products go out of stock. The entire process is automated and managed using cron jobs.



---


  
## 🚀 Features
- **Price Drop Alerts**: Notify users when a product's price decreases.
- **Out-of-Stock Alerts**: Alert competitors when a product goes out of stock.
- **Automated Scheduling**: Cron jobs automate scraping and email notifications.
- **Data Management**: MongoDB ensures efficient data storage and retrieval.

---

## ⚙️ Tech Stack
- **Frontend**: Next.js, Headless UI, Tailwind CSS
- **Backend**: Bright Data, Cheerio, Nodemailer, MongoDB
- **Automation**: Cron Jobs

---

## 📦 Installation

### Prerequisites
- Node.js (v16 or later)
- MongoDB instance
- Bright Data account with Web Unlocker access

### Clone the Repository
```bash
$ git clone https://github.com/your-repo/ecommerce-scraper.git
$ cd ecommerce-scraper
```

### Install Dependencies
```bash
$ npm install
```

---

## 🛠️ Configuration

### Environment Variables
Create a `.env.local` file in the root of the project and add the following:
```env
BRIGHT_DATA_USER_NAME = <BRIGHT DATA USERNAME>
BRIGHT_DATA_PASSWORD = <BRIGHT DATA PASSWORD>


MONGODB_URI = <MONGO DB ATLAS URI>
```

---

## 🚀 Usage

### Start the Development Server
```bash
$ npm run dev
```
Access the site at `http://localhost:3000`.

### Build for Production
```bash
$ npm run build
```

### Run the Production Server
```bash
$ npm start
```

---

## 🕒 Automation with Cron Jobs

### Set up Cron Jobs
Use any task scheduler (e.g., Linux `crontab`) to run the scraping script at desired intervals. Example:

```bash
*/30 * * * * /path/to/node /path/to/project/scripts/scrape.js
```
This runs the scraper every 30 minutes.

---

## 📚 Dependencies

### Major Packages Used:
- **[Bright Data](https://brightdata.com/)**: For scraping dynamic web pages.
- **[Cheerio](https://cheerio.js.org/)**: For parsing and extracting HTML data.
- **[Nodemailer](https://nodemailer.com/)**: For sending email notifications.
- **[MongoDB](https://www.mongodb.com/)**: For storing product data.
- **[Next.js](https://nextjs.org/)**: For building the application.
- **[Tailwind CSS](https://tailwindcss.com/)**: For styling the frontend.

---

