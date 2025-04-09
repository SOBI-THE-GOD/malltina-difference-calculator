# Malltina Difference Calculator 🧮

[![React](https://img.shields.io/badge/React-18.3-blue?logo=react)](https://reactjs.org/) [![Vite](https://img.shields.io/badge/Vite-6.0-yellowgreen?logo=vite)](https://vitejs.dev/) [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/) [![React Router](https://img.shields.io/badge/React_Router-7.1-CA4245?logo=react-router)](https://reactrouter.com/) [![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://vercel.com/)

A sleek and efficient web application designed to calculate shipping cost differences for Malltina based on updated package weights across various regions.

---

## 📝 Description

The **Malltina Difference Calculator** is a specialized tool built to streamline the process of calculating additional shipping costs incurred due to discrepancies between estimated and final package weights. It caters specifically to Malltina's operational needs, providing distinct calculation logic for shipments originating from:

* 🇺🇸 United States
* 🇦🇪 United Arab Emirates (UAE)
* 🇨🇳 China
* 🇮🇷 Ranjbar (Specific internal calculation)

The application features a clean, modern user interface built with React and Tailwind CSS, offering a seamless user experience. Key functionalities include:

* Region-specific calculation forms.
* Real-time difference calculation display.
* Convenient "Copy Note" and "Copy Ticket" buttons to generate pre-formatted messages for customer communication or internal notes.
* Interactive UI elements and animations for enhanced usability.
* Direct API integration for Asia calculations (requires a specific browser setup, see below).

This tool is primarily intended for Malltina staff or agents responsible for managing orders and communicating cost adjustments.

---

## 🚀 Live Demo

Experience the application live:

➡️ **[https://malltina-difference-calculator.vercel.app/](https://malltina-difference-calculator.vercel.app/)** ⬅️

*Note: Asia calculations (UAE/China) require a browser extension for CORS bypass.*

---

## 🔧 Installation Instructions

To set up the project locally for development or testing, follow these steps:

**Prerequisites:**

* [Node.js](https://nodejs.org/) (Latest LTS version recommended)
* [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
* **⚠️ Browser Extension for CORS Bypass (Crucial for Asia Calculations):** The UAE and China calculators fetch data directly from the `api.malltina.com` endpoint. Due to browser security restrictions (CORS), requests from `localhost` (or the Vercel domain) to this API are blocked by default. To enable these calculations, you **must** use a browser extension that can bypass CORS policies *specifically for requests made by this application*. The application uses `window.postMessage` to communicate with such an extension. Without a functioning extension, the UAE and China pages will display a message prompting installation.

**Setup Steps:**

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd malltina-difference-calculator
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Install and configure a CORS Bypass Extension:**
    * Find and install a suitable browser extension (e.g., "Allow CORS: Access-Control-Allow-Origin" or similar).
    * Ensure the extension is configured to allow requests originating from `http://localhost:<port>` (your local dev environment) or the Vercel deployment URL to `https://api.malltina.com`.
    * *This project specifically looks for an element with the ID `__cors_extension_marker` injected by the extension, and communicates via `window.postMessage` - ensure your chosen extension supports or can be adapted for this interaction pattern if necessary.*

4.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    The application should now be running, typically at `http://localhost:5173` (Vite's default).

---

## 💻 Usage

1.  **Start the application:** Run `npm run dev` after installation.
2.  **Navigate:** Use the navigation bar at the top to select the desired region/calculation type (Home, Ranjbar, US, UAE, China).
3.  **Enter Data:** Fill in the required input fields for the selected calculator:
    * **Ranjbar:** Final Weight (grams), Currency Price.
    * **United States:** Last Weight (grams), New Weight (grams), Currency Price. Toggle the "Express Delivery" checkbox if applicable.
    * **UAE / China:** Last Weight (grams), New Weight (grams), Price (in specified currency - AED for UAE, USD for China). *Ensure your CORS bypass extension is active.*
4.  **View Result:** The calculated cost difference (in Toman) will appear automatically below the inputs once sufficient data is provided. A loading indicator shows during API requests (Asia).
5.  **Generate Outputs:**
    * Click the **"Note"** button to copy a concise summary of the final weight and cost difference to your clipboard.
    * Click the **"Ticket"** button. A modal will appear asking for User Name and Order ID (optional). After entering the details and clicking "Enter", a pre-formatted message suitable for a customer support ticket will be copied to your clipboard.
6.  **Alerts:** Informational messages or error alerts (e.g., "Note copied!", "Clipboard access required!") appear briefly at the bottom of the screen.

---

## 🛠️ Technology Stack

This project leverages a modern frontend stack:

* **Core Framework:** [React](https://reactjs.org/) `18.3` ⚛️
* **Build Tool:** [Vite](https://vitejs.dev/) `6.0` ⚡
* **Language:** JavaScript (ES6+)
* **Routing:** [React Router DOM](https://reactrouter.com/) `7.1` 🧭
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) `3.4` 🎨 & [PostCSS](https://postcss.org/)
* **State Management:** React Hooks (`useState`, `useMemo`, `useEffect`, Custom Hooks)
* **Animations:** [React Spring](https://www.react-spring.dev/), Custom Tailwind Animations, [OGL](https://github.com/oframe/ogl) (for Aurora Background) ✨
* **API Interaction:** Native `Workspace` via `window.postMessage` (for CORS bypass with extension) ↔️
* **Linting:** [ESLint](https://eslint.org/) `9.17` 🧹
* **Analytics:** [Vercel Analytics](https://vercel.com/analytics) 📊
* **Deployment:** [Vercel](https://vercel.com/) ▲

---

## 📂 Project Structure

The project follows a standard Vite + React structure, organized for clarity and maintainability:

<pre>
.
├── public/                  # Static assets (if any)
├── src/
│   ├── assets/              # Images, icons, svgs
│   ├── components/          # Reusable React components (Buttons, Modals, Inputs, etc.)
│   ├── helpers/             # Utility functions (API request logic, formatting, DOM utils)
│   ├── hooks/               # Custom React Hooks (e.g., useAlert)
│   ├── layouts/             # Layout components (e.g., MainLayout with Nav)
│   ├── pages/               # Page-level components corresponding to routes
│   ├── routes/              # Routing configuration (routes.jsx)
│   ├── index.css            # Global styles & Tailwind imports
│   └── main.jsx             # Application entry point
├── .gitignore               # Git ignore rules
├── eslint.config.js         # ESLint configuration
├── index.html               # Main HTML template
├── package.json             # Project metadata and dependencies
├── postcss.config.js        # PostCSS configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── vercel.json              # Vercel deployment configuration (if specific rules needed)
└── vite.config.js           # Vite build configuration
</pre>

---

## 💡 Additional Notes

* **CORS Dependency:** The functionality of the UAE and China calculators is **strictly dependent** on a properly configured CORS bypass browser extension. The `AsiaPage.jsx` component contains the logic (`useEffect` hook) to detect the extension's presence and communicate with it. If the extension is not detected or fails, API calls will not succeed.
* **Calculation Logic:**
    * `Ranjbar.jsx` and `UnitedState.jsx` contain client-side JavaScript logic for their respective calculations.
    * `AsiaPage.jsx` orchestrates API calls to the external Malltina API (`https://api.malltina.com/api/v1/asia-shop/compute-cost`) via the browser extension to fetch cost data for different weights and calculates the difference. See `src/helpers/asiaAPIReq.js`.
* **UI Components:** The application emphasizes reusable components found in `src/components/`. Key interactive elements include `DataInput.jsx`, `Btn.jsx`, `FullModal.jsx`, and visual components like `AuroraBg.jsx` (using OGL) and `BluryText.jsx`.
* **Styling:** Tailwind CSS is used extensively for styling, with custom themes, colors (`primary`, `secondary`, `tertiary`), and animations defined in `tailwind.config.js`. Global styles and overrides are in `src/index.css`.
* **Code Quality:** ESLint is configured (`eslint.config.js`) to maintain code consistency and quality. Run `npm run lint` to check the code.

---

This project demonstrates proficiency in React, modern JavaScript, API integration (with workarounds for constraints like CORS), state management, component-based architecture, and styling with Tailwind CSS.
