# Currency Converter

A simple full-stack Currency Converter built using **HTML, CSS, JavaScript, Node.js, and Express.js**.

The application converts one currency to another using live exchange rates. The backend securely fetches exchange rate data, while the frontend provides a clean and responsive user interface.

---

## Features

- Convert between multiple world currencies
- Live exchange rates
- Responsive user interface
- Backend built with Express.js
- Environment variables support using `.env`
- Automatic fallback to a public API if no API key is provided

---

## Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript (ES6)

### Backend
- Node.js
- Express.js
- CORS
- Dotenv

---

## Project Structure

```
Currency-Converter/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   └── .env (ignored)
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── app.js
│   └── code.js
│
├── package.json
├── .gitignore
└── README.md
```

---

## Installation

Clone the repository

```bash
git clone https://github.com/your-username/Currency-Converter.git
```

Go to the project folder

```bash
cd Currency-Converter
```

Install dependencies

```bash
npm install
```

Create an environment file

```bash
cp backend/.env.example backend/.env
```

Update the API key if you have one.

---

## Run the Project

Start the backend

```bash
npm start
```

Open

```
frontend/index.html
```

in your browser.

---

## Environment Variables

Create a `.env` file inside the **backend** folder.

```
PORT=5000
API_KEY=YOUR_API_KEY
```

If no API key is provided, the application automatically uses the public fallback API.

---

## Author

**Rohan Shrivastav**

GitHub:
https://github.com/shrivastavrohan12-droid

LinkedIn:
www.linkedin.com/in/rohan-kumar2007

---

## License

This project is created for learning and portfolio purposes.