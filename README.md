# Malltina Difference Calculator

## Description

The Malltina Difference Calculator is a web application designed to calculate the difference in weight-based charges for shipping orders. It provides tools to generate notes and tickets for customers, detailing the weight differences and associated costs. This application caters to logistics and e-commerce businesses that need to manage and communicate weight discrepancies in their shipping processes.

Key Features:

-   **Weight Difference Calculation:** Accurately calculates weight-based charge differences.
-   **Note Generation:** Creates concise notes for customers regarding weight discrepancies.
-   **Ticket Generation:** Generates detailed tickets for customers, including order ID, weight difference, and payment information.
-   **User-Friendly Interface:** Provides an intuitive and easy-to-use interface.
-   **Dynamic Country-Specific Calculations:** Handles different calculation logic based on shipping origin (e.g., United States, Asia).
-   **Alert System:** Provides user feedback via an alert system.
-   **Loading Indicators:** Displays loading animations during API requests.
-   **Copy to Clipboard:** Allows users to copy generated notes and tickets directly to the clipboard.
-   **Cors Bypass Extension Support:** Uses a cors bypass extension to make requests to the api.

Target Audience:

-   Logistics companies
-   E-commerce businesses
-   Shipping and freight forwarders
-   Customer service representatives

## Installation Instructions

1.  **Clone the Repository:**
    ```bash
    git clone [Your Repository URL]
    cd malltina-difference-calculator
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Start the Development Server:**
    ```bash
    npm run dev
    ```

    This command will start the Vite development server, and the app will be accessible at `http://localhost:5173/` (or a similar address).

4.  **Build for Production (Optional):**
    ```bash
    npm run build
    ```

    This command will create a `dist` folder containing the production-ready build of the application.

## Usage

1.  **Open the App:**
    -   Navigate to `http://localhost:5173/` (or the appropriate URL) in your web browser.

2.  **Select a Calculation Page:**
    -   Use the navigation bar to select the appropriate calculation page (e.g., "Ranjbar," "United State," "Asia").

3.  **Enter Weight and Price Information:**
    -   Fill in the required fields (e.g., last weight, new weight, currency price).

4.  **Generate Notes or Tickets:**
    -   Click the "note" or "ticket" buttons to generate the corresponding information.
    -   The generated text will be copied to your clipboard.

5.  **View Alerts:**
    -   Alerts will appear at the bottom of the screen to provide feedback on actions (e.g., successful copy, errors).

6. **Asia Page Cors Usage:**
    - To use the asia page, you must install a cors bypass extension in your browser.

## Technology Stack

-   **React:** JavaScript library for building user interfaces.
-   **React Router DOM:** For client-side routing.
-   **Tailwind CSS:** For utility-first CSS styling.
-   **Vite:** For fast development and build processes.
-   **OGL:** For webGL animations on the Home page.
-   **@react-spring/web:** For web animations.
-   **@vercel/analytics:** For web analytics.

## Project Structure

malltina-difference-calculator/
│   .gitignore
│   eslint.config.js
│   index.html
│   package-lock.json
│   package.json
│   postcss.config.js
│   README.md
│   tailwind.config.js
│   vercel.json
│   vite.config.js
│
└───src
    │   index.css
    │   main.jsx
    │
    ├───assets
    │       clip-logo.svg
    │       DifferenceCalculator.png
    │       down-arrow.svg
    │       up-arrow.svg
    │
    ├───components
    │       Alert.jsx
    │       AuroraBg.jsx
    │       BluryText.jsx
    │       Btn.jsx
    │       DataInput.jsx
    │       DifferencePholder.jsx
    │       FormBox.jsx
    │       FullModal.jsx
    │       LittleContainer.jsx
    │       Loading.jsx
    │       Nav.jsx
    │       WrapBox.jsx
    │
    ├───helpers
    │       asiaAPIReq.js
    │       convertToPureNum.js
    │       copyToNavigator.js
    │       modifyParentClass.js
    │       separateNum.js
    │
    ├───hooks
    │       useAlert.js
    │
    ├───layouts
    │       MainLayout.jsx
    │
    ├───pages
    │       AsiaPage.jsx
    │       Home.jsx
    │       Ranjbar.jsx
    │       UnitedState.jsx
    │
    └───routes
            routes.jsx


-   **`src/components/`:** Contains reusable React components.
-   **`src/helpers/`:** Contains utility functions.
-   **`src/hooks/`:** Contains custom React hooks.
-   **`src/layouts/`:** Contains layout components.
-   **`src/pages/`:** Contains page-level components.
-   **`src/routes/`:** Contains routing configuration.
-   **`src/assets/`:** Contains static assets (images, SVGs).
-   **`src/index.css`:** Contains global CSS styles.
-   **`src/main.jsx`:** Entry point of the React application.
-   **`index.html`:** Main HTML file.
-   **`package.json`:** Contains project dependencies and scripts.
-   **`tailwind.config.js`:** Tailwind CSS configuration.
-   **`vite.config.js`:** Vite configuration.

## Demo

-   (https://malltina-difference-calculator.vercel.app/)

## Additional Notes

-   The `AsiaPage` component relies on an external API and may require a CORS bypass extension for proper functionality.
-   Ensure all dependencies are up-to-date.
-   The `useAlert.js` file handles the alert system, and the `asiaAPIReq.js` file handles the Asia section api requests 
