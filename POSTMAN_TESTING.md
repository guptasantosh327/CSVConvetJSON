# Postman Testing Guide

## 🚀 API Endpoints

Your CSV to JSON converter now has only **2 API endpoints** for testing with Postman.

## 📋 **1. Upload and Process CSV**

### **Request Details**

- **Method**: `POST`
- **URL**: `http://localhost:3000/api/upload-csv`
- **Headers**:
  - `Content-Type`: `multipart/form-data` (Postman sets this automatically)

### **Body Setup in Postman**

1. Select **Body** tab
2. Choose **form-data**
3. **IMPORTANT**: Add key: `csvFile` (type: File) - **Field name must be exactly "csvFile"**
4. Select your CSV file

### **Expected Response**

```json
{
  "success": true,
  "message": "Successfully processed CSV with X users",
  "users": [
    {
      "name": { "firstName": "John", "lastName": "Doe" },
      "age": 28,
      "address": { "line1": "123 Main St", "city": "Springfield" },
      "gender": "male",
      "additional_info": { "favorite_color": "blue", "hobby": "reading" }
    }
  ]
}
```

## 📊 **2. Get All Users**

### **Request Details**

- **Method**: `GET`
- **URL**: `http://localhost:3000/api/users`
- **Headers**: None required

### **Expected Response**

```json
{
  "success": true,
  "count": 10,
  "users": [
    // Array of all users in database
  ]
}
```

## 🧪 **Testing Steps**

### **Step 1: Start the API Server**

```bash
npm run api
```

### **Step 2: Upload CSV File**

- **POST** `http://localhost:3000/api/upload-csv`
- Use form-data with `csvFile` key (exact field name)
- Upload your CSV file

### **Step 3: Retrieve Users**

- **GET** `http://localhost:3000/api/users`
- Should return all processed users

## 📁 **Sample CSV for Testing**

Use the included sample CSV file:

```
csv/sample.csv
```

This file contains 10 users with nested fields like:

- `hie.data.fname.rata.gita`
- `company.department.team.role`
- `preferences.ui.theme.color`

## ⚠️ **Important Notes**

1. **Database Required**: Ensure PostgreSQL is running and `csv_to_json` database exists
2. **File Size Limit**: Maximum 10MB CSV files
3. **File Type**: Only `.csv` files are accepted
4. **Field Name**: Must use exactly `csvFile` as the field name in form-data
5. **Temporary Files**: Uploaded files are automatically cleaned up after processing

## 🚨 **Error Responses**

### **No File Uploaded**

```json
{
  "error": "No CSV file uploaded",
  "help": "Make sure to use field name \"csvFile\" in your form data"
}
```

### **Invalid File Type**

```json
{
  "success": false,
  "error": "Invalid file type. Only CSV files are allowed."
}
```

### **File Too Large**

```json
{
  "success": false,
  "error": "File too large. Maximum size is 10MB."
}
```

### **Multer Error: Unexpected Field**

This error occurs when the field name in your form data doesn't match `csvFile`.

**Solution:**

- Ensure your form field name is exactly `csvFile` (case-sensitive)
- In Postman: Key = `csvFile`, Type = `File`
- Don't use `file`, `csv`, or any other field name

### **Database Error**

```json
{
  "success": false,
  "error": "Failed to get users: database \"csv_to_json\" does not exist"
}
```

## 🔧 **Troubleshooting**

### **Port Already in Use**

```bash
# Kill existing process
lsof -ti:3000 | xargs kill

# Or change port in .env
PORT=3001
```

### **Database Issues**

```sql
-- Create database if it doesn't exist
CREATE DATABASE csv_to_json;
```

### **File Upload Issues**

- Ensure CSV file is valid
- Check file size (max 10MB)
- Verify file extension is `.csv`
- **Use exact field name `csvFile`**

### **Multer Configuration**

The server is configured with:

- **Field name**: `csvFile` (exact match required)
- **File size limit**: 10MB
- **File types**: Only CSV files
- **Storage**: Memory storage (no disk writes)

## 📱 **Postman Setup Example**

### **1. Create New Request**

- Method: `POST`
- URL: `http://localhost:3000/api/upload-csv`

### **2. Set Body**

- Tab: `Body`
- Type: `form-data`
- Key: `csvFile` (exactly this name)
- Type: `File`
- Value: Select your CSV file

### **3. Send Request**

- Click `Send`
- Should receive success response with processed users

## 🎯 **Common Mistakes to Avoid**

1. **Wrong field name**: Using `file`, `csv`, or any variation instead of `csvFile`
2. **Wrong body type**: Using `x-www-form-urlencoded` instead of `form-data`
3. **File type mismatch**: Uploading non-CSV files
4. **File too large**: Exceeding 10MB limit
5. **Missing file**: Not selecting a file in the form field

## 🚀 **Quick Test Commands**

### **Test API Documentation**

```bash
curl http://localhost:3000/
```

### **Test CSV Upload**

```bash
curl -X POST -F "csvFile=@csv/sample.csv" http://localhost:3000/api/upload-csv
```

### **Get All Users**

```bash
curl http://localhost:3000/api/users
```
