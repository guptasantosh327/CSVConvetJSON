# Quick Start Guide

## 🚀 Getting Started

### 1. **Install Dependencies**

```bash
npm install
```

### 2. **Set Up Database**

```sql
CREATE DATABASE csv_to_json;
```

### 3. **Configure Environment**

```bash
cp .env.example .env
# Edit .env with your database credentials
```

### 4. **Build the Project**

```bash
npm run build
```

## 🖥️ Command Line Interface (CLI)

### **Process CSV from Command Line**

```bash
# Development mode
npm run cli

# Production mode
npm run cli:prod
```

**What it does:**

- Reads CSV from `CSV_PATH` in `.env`
- Processes and stores data in PostgreSQL
- Shows age distribution analysis
- Displays sample user structure

## 🌐 REST API Server

### **Start the API Server**

```bash
# Development mode
npm run api

# Production mode
npm run api:prod
```

**Server starts on:** `http://localhost:3000`

### **API Endpoints**

| Method | Endpoint          | Description                 |
| ------ | ----------------- | --------------------------- |
| `GET`  | `/`               | API documentation           |
| `POST` | `/api/upload-csv` | Upload and process CSV file |
| `GET`  | `/api/users`      | Get all users               |

## 📱 Testing with Postman

1. **Start the API server:** `npm run api`
2. **Upload CSV file:** `POST http://localhost:3000/api/upload-csv`
3. **Retrieve users:** `GET http://localhost:3000/api/users`

See `POSTMAN_TESTING.md` for detailed testing instructions.

## 📁 File Structure

```
├── src/
│   ├── cli.ts              # CLI entry point
│   ├── server.ts            # Express API server (2 endpoints)
│   ├── index.ts             # Legacy entry point
│   └── ...                  # Other source files
├── csv/
│   └── sample.csv          # Sample CSV file
└── package.json
```

## 🔧 Available Commands

```bash
# CLI Processing
npm run cli              # Run CLI in development
npm run cli:prod         # Run CLI in production

# API Server
npm run api              # Run API server in development
npm run api:prod         # Run API server in production

# Development
npm run build            # Build TypeScript to JavaScript
npm run lint             # Run ESLint
npm run format           # Run Prettier
```

## 📊 Sample CSV Format

```csv
name.firstName,name.lastName,age,address.line1,address.line2,address.city,address.state,gender,favorite_color,hobby,hie.data.fname.rata.gita,company.department.team.role,preferences.ui.theme.color
John,Doe,28,123 Main St,Apt 4B,Springfield,IL,male,blue,reading,John Doe,Developer,Blue
Jane,Smith,32,456 Oak Ave,Suite 100,Chicago,IL,female,green,hiking,Jane Smith,Manager,Green
```

## 🧪 Testing the API

### **Test CSV Upload**

```bash
curl -X POST -F "csvFile=@csv/sample.csv" http://localhost:3000/api/upload-csv
```

### **Get All Users**

```bash
curl http://localhost:3000/api/users
```

## 🚨 Troubleshooting

### **Database Connection Issues**

- Ensure PostgreSQL is running
- Check database credentials in `.env`
- Verify database `csv_to_json` exists


### **CSV Parsing Errors**

- Check CSV format matches expected structure
- Ensure all required headers are present
- Verify CSV file encoding is UTF-8

## 📚 Next Steps

1. **Customize CSV structure** for your data
2. **Add authentication** to API endpoints
3. **Implement rate limiting** for production use
4. **Add more data validation** rules
5. **Create custom age ranges** for analysis

## 🆘 Need Help?

- Check the main `README.md` for detailed documentation
- Test with the sample CSV file first
- Use Postman for API testing
- See `POSTMAN_TESTING.md` for detailed testing instructions
