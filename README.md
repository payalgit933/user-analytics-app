# User Analytics Application

## Overview

A full-stack analytics application that tracks user interactions on a webpage and visualizes user behavior.

## Features

- Page view tracking
- Click tracking
- Session management
- User journey visualization
- Click heatmap visualization

## Tech Stack

### Frontend
- React
- Axios
- Vite

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas

## APIs

### POST /events
Stores tracking events.

### GET /sessions
Returns sessions with event counts.

### GET /sessions/:sessionId
Returns ordered session events.

### GET /heatmap?pageUrl=<url>
Returns click data for heatmap visualization.

## Setup

### Backend

```bash
cd backend
npm install
node server.js
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Demo Page

Open:

```text
demo/index.html
```

using Live Server.

## Assumptions

- Session IDs are stored in localStorage.
- Heatmap visualization uses click coordinates directly.
- MongoDB Atlas is used as the database.