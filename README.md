# Performance Dashboard

## Overview
This project is a **Performance Dashboard** built with **React**, **Recharts**, and **Bootstrap**, displaying the performance of individuals based on **mean performance**, **variance**, and **stability**. The backend is powered by **FastAPI**, analyzing CSV data to return the top 6 most stable performers.

## Features
- Fetches performance data from a FastAPI backend.
- Displays **Mean Performance**, **Variance**, and **Stable Performance Score**.
- Uses **Scatter Charts** to visualize **Mean Performance** and **Variance**.
- Identifies and highlights the **Best Stable Performer**.
- Includes Bootstrap for styling.

## Installation
### Backend Setup (FastAPI)
1. Install dependencies:
   ```sh
   pip install fastapi pandas uvicorn
   ```
2. Place your **CSV file** (e.g., `sample_performance_data.csv`) in the project directory.
3. Run the backend server:
   ```sh
   uvicorn main:app --reload
   ```
   The API will be available at `http://127.0.0.1:8000/api/performance`.

### Frontend Setup (React)
1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the React development server:
   ```sh
   npm start
   ```
   The dashboard will be available at `http://localhost:3000/`.

## API Endpoint
### `GET /api/performance`
Returns an array of the **top 6 most stable performers**, sorted by mean performance and variance.

Example Response:
```json
[
  {
    "index": "Person_10",
    "Mean Performance": 74.93,
    "Variance": 805.17
  },
  {
    "index": "Person_2",
    "Mean Performance": 84.90,
    "Variance": 1178.09
  }
]
```

## Calculation Breakdown
- **Mean Performance**: Average of scores across different days.
- **Variance**: Measures consistency. Lower variance = more stability.
- **Stable Performance Score**: Used to rank top stable performers.

## Enhancements & Future Work
- Add a **Profit Calculation** feature in the dashboard.
- Implement WebSockets for real-time data updates.
- Enhance UI with additional chart types.

## License
This project is open-source under the **MIT License**.