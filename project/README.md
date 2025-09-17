# SnapCart - Receipt Scanner

A full-stack receipt scanning and expense tracking application built with React, Spring Boot, and MongoDB.

## Features

- **Receipt OCR**: Upload receipt photos and extract item names/prices using Google Vision API
- **Expense Tracking**: Store and categorize expenses with detailed analytics
- **Analytics Dashboard**: View spending patterns, most bought items, and monthly reports
- **Modern UI**: Responsive design with smooth animations and professional aesthetics

## Tech Stack

- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Spring Boot + Java
- **Database**: MongoDB
- **OCR**: Google Vision API
- **Charts**: Chart.js for analytics visualization

## Project Structure

```
snapcart/
├── frontend/          # React + Vite application
├── backend/           # Spring Boot application
├── docker-compose.yml # MongoDB setup
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js 18+
- Java 17+
- Maven 3.6+
- MongoDB (via Docker or local installation)

### 1. Database Setup

```bash
# Start MongoDB using Docker
docker-compose up -d
```

### 2. Backend Setup

```bash
cd backend
./mvnw clean install
./mvnw spring-boot:run
```

The backend will run on `http://localhost:8080`

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173`

### 4. Environment Configuration

Make sure to configure the Google Vision API credentials in the backend application.properties file.

## API Endpoints

- `POST /api/receipts/upload` - Upload and process receipt
- `GET /api/receipts` - Get all receipts
- `GET /api/analytics/monthly` - Get monthly spending data
- `GET /api/analytics/top-items` - Get most bought items
- `GET /api/analytics/summary` - Get spending summary

## Usage

1. Open the application at `http://localhost:5173`
2. Upload a receipt photo using the upload interface
3. View extracted items and prices
4. Check analytics dashboard for spending insights
5. Track expenses over time

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request