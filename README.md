# Word to JPG Converter

Full-stack app for converting Word documents (`.doc`, `.docx`) into JPG images.

## Tech Stack

- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express
- Conversion: mammoth + sharp

## Project Structure

- `/server` - API for document conversion
- `/client` - React web interface

## Run Locally

### 1) Server

```bash
cd server
cp .env.example .env
npm install
npm run dev
```

### 2) Client

```bash
cd client
npm install
npm run dev
```

Open `http://localhost:5173`.

## API

`POST /api/convert`

- Multipart form-data key: `files`
- Supports multiple uploads
- Returns converted JPG pages as Data URLs for immediate preview/download
