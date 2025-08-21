# CSV to JSON Converter

A simple and clean CSV to JSON converter built with TypeScript, demonstrating basic design patterns and best practices without excessive complexity. Now includes a minimal REST API for CSV processing!

## 🚀 Features

- **Simple CSV Parsing**: Basic CSV parsing with nested object support
- **TypeScript**: Full type safety with modern ES2020 features
- **Design Patterns**: Strategy, Factory, Repository, and MVC patterns
- **PostgreSQL Integration**: Basic database operations with connection pooling
- **Age Analysis**: Simple age distribution calculation and statistics
- **Clean Architecture**: Separation of concerns with dedicated services
- **Minimal REST API**: Express.js server with CSV upload and data retrieval
- **CLI Support**: Command-line interface for batch processing

## 📋 Prerequisites

- Node.js 18+
- PostgreSQL 12+
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd csvToJSON
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Configure your `.env` file:

   ```env
   CSV_PATH=./csv/sample.csv
   DATABASE_URL=postgresql://username:password@localhost:5432/csv_to_json
   PORT=3000
   ```

4. **Set up PostgreSQL database**

   ```sql
   CREATE DATABASE csv_to_json;
   ```

## 🚀 Usage

### Command Line Interface (CLI)

```bash
# Development mode
npm run cli

# Production mode
npm run cli:prod
```

### REST API Server

```bash
# Development mode
npm run api

# Production mode
npm run api:prod
```

### Development Mode

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm start
```

### Code Quality

```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

## 🌐 API Endpoints

Your CSV to JSON converter now has only **2 API endpoints**:

### 1. **Upload and Process CSV**

```http
POST /api/upload-csv
Content-Type: multipart/form-data

Body: csvFile (CSV file)
```

**Response:**

```json
{
  "success": true,
  "message": "Successfully processed CSV with 10 users",
  "users": [...]
}
```

### 2. **Get All Users**

```http
GET /api/users
```

**Response:**

```json
{
  "success": true,
  "count": 10,
  "users": [...]
}
```

## 🧪 Testing with Postman

See `POSTMAN_TESTING.md` for detailed testing instructions.

**Quick Start:**

1. Start server: `npm run api`
2. Test root: `GET http://localhost:3000/`
3. Upload CSV: `POST http://localhost:3000/api/upload-csv`
4. Get users: `GET http://localhost:3000/api/users`

## 🏗️ Architecture

### Design Patterns

- **Strategy Pattern**: CSV parsing and age calculation strategies
- **Factory Pattern**: Service instantiation and configuration management
- **Repository Pattern**: Database service for data access abstraction
- **MVC Pattern**: Controller-based workflow orchestration

### Project Structure

```
src/
├── controllers/          # Application controllers
├── factories/           # Service factory classes
├── interfaces/          # TypeScript interfaces
├── services/            # Business logic services
├── types/               # Type definitions
├── server.ts            # Express API server (2 endpoints only)
├── cli.ts              # Command-line interface
└── index.ts            # Legacy main entry point
```

## 📊 CSV Format

The application expects CSV files with the following structure:

```csv
name.firstName,name.lastName,age,address.line1,address.line2,address.city,address.state,gender,favorite_color,hobby,hie.data.fname.rata.gita,company.department.team.role,preferences.ui.theme.color
John,Doe,28,123 Main St,Apt 4B,Springfield,IL,male,blue,reading,John Doe,Developer,Blue
Jane,Smith,32,456 Oak Ave,Suite 100,Chicago,IL,female,green,hiking,Jane Smith,Manager,Green
```

### Supported Nested Fields

- **Core fields**: `name.firstName`, `address.city` → Structured objects
- **Additional fields**: `hie.data.fname.rata.gita` → Nested objects in `additional_info`

## 🗄️ Database Schema

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  age INT NOT NULL,
  address JSONB NULL,
  additional_info JSONB NULL
);
```

## 🔧 Configuration

### CSV Configuration

```typescript
interface CSVConfig {
  filePath: string; // Path to CSV file
  encoding?: BufferEncoding; // File encoding (default: utf-8)
}
```

### Database Configuration

```typescript
interface DatabaseConfig {
  connectionString: string; // PostgreSQL connection string
}
```

## ✨ Key Features

### 1. Simple CSV Parsing

- Basic CSV parsing with quoted value support
- Nested object structures via dot notation
- Deep nesting support for additional fields
- Simple error handling for invalid lines

### 2. Basic Age Analysis

- Age distribution calculation in predefined ranges
- Simple statistical analysis (min, max, average, median)

### 3. Database Operations

- Connection pooling for performance
- Basic transaction support for data integrity
- Simple error handling

### 4. Minimal REST API

- CSV file upload via multipart/form-data
- JSON responses with proper error handling
- File size limits (10MB) and validation
- Temporary file cleanup
- Only 2 essential endpoints

### 5. Command Line Interface

- Batch CSV processing
- Age distribution analysis
- Sample data structure display

## 🎯 Code Quality Standards

### TypeScript Configuration

- Strict mode enabled
- Modern ES2020 features
- Type safety throughout

### Linting & Formatting

- ESLint with basic rules
- Prettier for consistent formatting
- Basic code quality enforcement

## 🚀 Performance Considerations

- Connection pooling for database operations
- Efficient CSV parsing without excessive validation
- Memory-conscious data processing
- Temporary file cleanup for API uploads

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Ensure code quality with linting
5. Submit a pull request

## 📝 License

This project is licensed under the ISC License.

## 🔮 Future Enhancements

- **Authentication** - User authentication and authorization
- **Rate Limiting** - API rate limiting and throttling
- **Additional Endpoints** - More data retrieval options
- **Data Export** - Export processed data in various formats
