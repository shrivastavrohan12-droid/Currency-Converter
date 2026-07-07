# Currency Converter

A simple full‑stack currency converter built with **Node.js**, **Express**, and vanilla **HTML/CSS/JS**. It securely fetches live exchange rates on the server side, keeping API keys hidden.

## Features
- Secure server‑side API integration (fallback to public API if no key)
- Responsive UI with flag icons
- Minimal dependencies, beginner‑friendly

## Prerequisites
- Node.js (v14+)
- An optional API key for https://www.exchangerate-api.com/ (place in `backend/.env` as `API_KEY`).

## Setup
```bash
# Clone the repo
git clone https://github.com/yourusername/currency-converter.git
cd currency-converter

# Install backend dependencies
npm install

# Create .env (copy from example)
cp backend/.env.example backend/.env
# Edit backend/.env if you have an API key
```

## Running
```bash
# Start backend (and optionally serve frontend)
npm start
```
The backend runs on **PORT 5000** (configurable via `.env`). Open `frontend/index.html` in a browser (or serve it with any static server) and it will communicate with the backend.

## Environment Variables (`backend/.env`)
```
PORT=5000
API_KEY=YOUR_API_KEY   # optional – fallback works without it
```

## Project Structure
```
currency-converter/
├─ backend/        # Express server
│   ├─ server.js
│   ├─ .env, .env.example
│   └─ package.json
├─ frontend/       # Static client
│   ├─ index.html
│   ├─ style.css
│   ├─ app.js
│   └─ code.js
├─ package.json    # Workspace scripts
├─ .gitignore
└─ README.md
```

## License
MIT – feel free to remix and improve.


A secure full-stack currency converter application that enables users to instantly convert between 150+ world currencies using live exchange rates. The project uses a Node.js and Express backend to securely fetch conversion rates, protecting the API keys from exposure in the client browser.

## Features
- **Secure API Integration:** API keys are protected on the server side and never sent to the browser.
- **Real-Time Exchange Rates:** Interacts with the secure ExchangeRate-API (with public API fallback).
- **Responsive Design:** Premium UI that fits perfectly on mobile, tablet, and desktop screens.
- **Interactive Currency Picker:** Clean dropdown menus with corresponding national flags.
- **Robust Error Handling:** Detects backend offline state, invalid codes, network failures, and displays user-friendly error panels.

## Tech Stack
- **Frontend:** HTML5, CSS3 (Vanilla), JavaScript (ES6+), Font Awesome (Icons)
- **Backend:** Node.js, Express, Cors, Dotenv, Native Fetch API

## Folder Structure
```text
currency-converter/
├── frontend/
│   ├── index.html       # Application UI structure
│   ├── style.css        # Premium typography & design rules
│   ├── code.js         # Currency code to flag country code map
│   └── app.js          # Client-side validation, UI sync, and backend API calls
├── backend/
│   ├── server.js        # Express application with secure API proxying
│   ├── package.json     # Backend configuration and dependencies
│   ├── .env             # Backend secret credentials (ignored by Git)
│   ├── .env.example     # Environment template for setup reference
│   └── .gitignore       # Ignores .env and node_modules
├── package.json         # Workspace configuration to run backend and frontend concurrently
├── .gitignore           # Global git ignore configuration
└── README.md            # Project documentation
```

## Environment Variables
Create a `.env` file inside the `backend/` directory based on the `.env.example` template:
```env
PORT=5000
API_KEY=YOUR_API_KEY
```
> [!NOTE]
> If you leave `API_KEY` as `YOUR_API_KEY` (or empty), the backend will automatically fall back to the public `fawazahmed0` API, enabling the project to run out-of-the-box without requiring an API key immediately.

## Installation & Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/currency-converter.git
   cd currency-converter
   ```

2. **Install Workspace Dependencies:**
   Run the setup script from the root workspace directory to install backend dependencies:
   ```bash
   npm run setup
   ```

3. **Configure Environment Variables:**
   Copy the example environment file inside the `backend` folder and populate it:
   ```bash
   cp backend/.env.example backend/.env
   ```

## Running the Application

### Running Both Frontend & Backend Concurrently (Recommended)
You can start both the Express backend and the local frontend server at the same time using a single command from the project root:
```bash
npm start
```
The frontend will open at `http://localhost:3000` and communicate with the backend running at `http://localhost:5000`.

### Running Separately
- **Start Backend:**
  ```bash
  npm run backend
  ```
- **Start Frontend:**
  Open `frontend/index.html` directly in your browser, or serve it using any simple static host.

## GitHub Setup
To publish this securely on GitHub:
1. Ensure the root `.gitignore` and `backend/.gitignore` files are not modified.
2. Confirm `.env` is NOT checked into Git.
3. Commit and push your changes:
   ```bash
   git add .
   git commit -m "feat: migrate to secure full-stack Express backend architecture"
   git push origin main
   ```

## Screenshots
*(Insert screenshots of your beautiful responsive application here)*

## Future Improvements
- **Offline Cache:** Cache daily rates using Redis to minimize external API usage.
- **Interactive Graphs:** Visualize historical currency rates using Chart.js.
- **Favorite Currencies:** Allow users to save frequently converted currency pairs.
