# Malltina Difference Calculator

## Description

The **Malltina Difference Calculator** is a web application designed to calculate and compare the weight and price differences for various items. It supports multiple regions, including the United States, China, UAE, and others. The app allows users to input weight and price details, and then it calculates the difference in prices based on the weight variations. Additionally, users can generate notes or tickets related to the difference, which can be copied to their clipboard for further use.

This app is designed to help businesses and individuals who need to calculate price differences when shipping or transporting goods based on weight variations.

## Installation Instructions

### Prerequisites

Ensure you have the following installed on your local machine:

- **Node.js** (version 16 or higher)
- **npm** (Node Package Manager, installed with Node.js)

### Setup

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/SOBI-THE-GOD/malltina-difference-calculator.git
   cd malltina-difference-calculator
Install the dependencies using npm:

bash
Copy
npm install
To start the development server, run:

bash
Copy
npm run dev
Open your browser and visit http://localhost:3000 to view the application.

Running the App in Production Mode
To build the project for production and preview it:

Build the project:

bash
Copy
npm run build
Preview the built app:

bash
Copy
npm run preview
Usage
Once set up and running, you can use the app to calculate price differences for various regions. Here's how:

Select a Region: Choose a region (e.g., United States, UAE, China) from the navigation bar.

Input Data: Enter the last weight, new weight, and price information for the item.

Calculate Difference: The app will automatically calculate the price difference based on the weights and prices provided.

Generate Notes/Tickets: Once the calculation is done, you can generate a note or a ticket. These can be copied to your clipboard for further use.

Technology Stack
React: A JavaScript library for building user interfaces.

Vite: A fast build tool and development server.

Tailwind CSS: A utility-first CSS framework for styling.

React Router: For routing and navigation within the app.

@react-spring/web: For animations.

OGL: WebGL rendering framework for animations and visual effects.

Vercel Analytics: For tracking app analytics.

Contributing
We welcome contributions to the project! Here are some ways you can help:

Report bugs or request new features.

Submit a pull request with bug fixes, feature additions, or improvements.

Write documentation and tutorials for new users.

Code Standards
Write clean, maintainable code.

Use ESLint for JavaScript linting to ensure code quality.

Follow the Prettier code formatting rules to maintain consistency in code style.

Pull Request Guidelines
Fork the repository and create your branch.

Write tests for new features or bug fixes.

Ensure all tests pass before submitting the pull request.

Make sure to update documentation where applicable.

License
This project is licensed under the MIT License. See the LICENSE file for more details.

Project Structure
Here’s an overview of the project structure:

bash
Copy
.
├── .gitignore                # Specifies files and directories to ignore
├── eslint.config.js           # ESLint configuration
├── index.html                 # HTML template
├── package.json               # Project dependencies and scripts
├── tailwind.config.js         # Tailwind CSS configuration
├── vite.config.js             # Vite configuration
├── src/                       # Source code directory
│   ├── assets/                # Static assets (images, icons)
│   ├── components/            # React components (e.g., buttons, forms)
│   ├── helpers/               # Utility functions
│   ├── hooks/                 # Custom hooks
│   ├── layouts/               # Layout components (e.g., main layout)
│   ├── pages/                 # Page components (e.g., home, country pages)
│   └── routes/                # Routing configuration
└── README.md                  # Project documentation
Screenshots/Demo

For a live demo, visit: [Insert live demo link here]

Additional Notes
CORS Issue: The app includes functionality to bypass CORS issues using a browser extension. Ensure that the extension is installed for the app to work correctly.

Supported Regions: The app currently supports the United States, UAE, China, and other regions. More regions can be added upon request.
