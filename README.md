# 🚗 Vehicle VIN Decoder & Encyclopedia

A modern **Single Page Application (SPA)** built with **React** and **TypeScript**. This tool allows users to decode Vehicle Identification Numbers (VIN) and explore a comprehensive database of technical vehicle variables using the **NHTSA vPIC API**.

## 🔗 Live Demo

[View Live Project on Vercel](https://vin-decoder-pi.vercel.app/)

## 🌟 Key Features

- **VIN Decoding:** Instant decoding of 17-character VINs with detailed technical results.
- **Search History:** Smart tracking of the last 3 decoded VINs for quick reference.
- **Variable Encyclopedia:** A dedicated section to browse and search through all possible vehicle variables.
- **Deep Linking:** Dynamic routing for individual variable details, allowing for easy sharing and bookmarking.
- **Responsive Design:** Optimized for both desktop and mobile devices.

## 🛠️ Tech Stack

- **React 18** — Functional components and modern Hooks (`useState`, `useEffect`, `useParams`).
- **TypeScript** — For type safety, interfaces, and better developer experience.
- **React Router v6** — Handling navigation and dynamic parameters.
- **CSS3** — Custom styling with a focus on usability and clean UI.
- **NHTSA API** — Integration with official government vehicle data.

## 🚀 Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/MarinaKramarchuk/vin-decoder](https://github.com/MarinaKramarchuk/vin-decoder)
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the development server:**
    ```bash
    npm run dev
    ```

## 📝 Technical Implementation Details

- **State Management:** Built using React's built-in hooks, avoiding unnecessary external libraries for a lightweight footprint.
- **Data Fetching:** Implemented robust error handling and loading states for a seamless user experience.
- **Security:** Used `dangerouslySetInnerHTML` carefully to render sanitized HTML descriptions provided by the NHTSA API.

---

_Created with ♥ by Marina_
