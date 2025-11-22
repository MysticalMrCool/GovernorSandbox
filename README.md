# Governor's Sandbox

A React-based interactive simulation dashboard for visualising and managing geopolitical data. This project serves as a sandbox environment for testing governance simulations, sentiment analysis streams, and dimensional metrics.

## 🚀 Features

- **Interactive Dashboard**: A central hub for monitoring simulation states.
- **Real-time Sentiment Stream**: Visualises incoming data streams with sentiment analysis.
- **Dimensional Metrics**: Track various governance dimensions using visual bars.
- **Simulation Engine**: Powered by a custom `useSimulation` hook for managing state and logic.
- **Responsive Design**: Built with Tailwind CSS for a modern, adaptive UI.

## 🛠️ Tech Stack

- **Framework**: [React](https://react.dev/) (v18)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Linting**: ESLint

## 📦 Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MysticalMrCool/GovernorSandbox.git
   cd GovernorSandbox
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

## 📂 Project Structure

```
GovernorSandbox/
├── src/
│   ├── components/         # React components
│   │   ├── ui/             # Reusable UI elements (DimensionBar, SentimentStream)
│   │   └── GovernorSandbox.jsx  # Main dashboard component
│   ├── data/               # Static data files (countries.js)
│   ├── hooks/              # Custom React hooks (useSimulation.js)
│   ├── App.jsx             # Root application component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles & Tailwind directives
├── public/                 # Static assets
├── index.html              # HTML entry point
├── package.json            # Project dependencies and scripts
├── tailwind.config.js      # Tailwind configuration
└── vite.config.js          # Vite configuration
```

## 📜 Licence

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

