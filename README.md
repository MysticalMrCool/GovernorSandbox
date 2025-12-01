# Governor's Sandbox

An interactive simulation dashboard for exploring **Anti-Fragile Well-Being** policy design across different cultural contexts. This tool helps policymakers understand how cultural dimensions (Hofstede's framework) impact the success or failure of governance interventions.

## 🚀 Features

- **Interactive World Map**: Zoomable and pannable map with four case study countries (Japan, UK, India, Cameroon). Scroll to zoom, click and drag to pan.
- **Cultural Policy Simulation**: Compare "Blueprint" (fragile, top-down) vs "Anti-Fragile Probes" (adaptive, safe-to-fail) policy approaches.
- **Real-time VLL Sentiment Stream**: Live narrative feed showing public reaction to policy interventions.
- **Emotion Trend Visualisation**: Stacked area chart tracking hope, fear, anger, belonging, optimism, and anxiety over time.
- **Well-Being Radar**: Six-domain well-being tracking (Health, Psychological, Social, Civic, Economic, Environmental).
- **Hofstede Cultural Dimensions**: Each country displays PDI, IDV, MAS, UAI, LTO, and IVR scores that influence policy outcomes.
- **Iterative Learning Cycles**: Five-stage cycle (Diagnose → Analyze → Design → Monitor → Refine) with lesson capture.

## 🛠️ Tech Stack

- **Framework**: [React](https://react.dev/) (v18)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Maps**: [React Simple Maps](https://www.react-simple-maps.io/)
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

## 🎮 How to Use

1. **Select a Country**: Click on a marker on the world map to select a case study (Japan, UK, India, or Cameroon).
2. **Diagnose**: Review the country's cultural dimensions, current well-being, and active stressor.
3. **Analyze**: Explore cultural insights that inform policy design.
4. **Design**: Choose between a top-down "Blueprint" approach or adaptive "Anti-Fragile Probes".
5. **Monitor**: Watch real-time sentiment and well-being changes as your policy runs.
6. **Refine**: Retire failing probes, amplify successful ones, and capture lessons for the next cycle.

## 📂 Project Structure

```
GovernorSandbox/
├── src/
│   ├── components/
│   │   ├── ui/                    # UI components
│   │   │   ├── WorldMap.jsx       # Interactive zoomable map
│   │   │   ├── CycleNavigator.jsx # Stage progress indicator
│   │   │   ├── WellbeingRadar.jsx # Radar chart for well-being
│   │   │   ├── EmotionTrendChart.jsx # Emotion stacked area chart
│   │   │   ├── SentimentStream.jsx   # Live narrative feed
│   │   │   ├── ProbeCard.jsx      # Probe status cards
│   │   │   ├── LessonsPanel.jsx   # Captured lessons display
│   │   │   └── DimensionBar.jsx   # Dimension visualisation
│   │   └── GovernorSandbox.jsx    # Main dashboard component
│   ├── data/
│   │   ├── countries.js           # Case study data with cultural dimensions
│   │   └── constants.js           # Cycle stages, domains, emotions
│   ├── hooks/
│   │   └── useSimulation.js       # Core simulation logic
│   ├── App.jsx                    # Root application component
│   ├── main.jsx                   # Entry point
│   └── index.css                  # Global styles & Tailwind directives
├── index.html                     # HTML entry point
├── package.json                   # Project dependencies and scripts
├── tailwind.config.js             # Tailwind configuration
└── vite.config.js                 # Vite configuration
```

## 📜 Licence

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

