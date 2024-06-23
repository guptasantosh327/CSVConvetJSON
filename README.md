# CSV TO JSON Converter

> A node application to convert CSV file to JSON and Upload the data into Postgres DB and gives analysis on Age Distribution on terminal.


## How to install and run the project
1. ` npm install `
3. Run `node index.js`

## To change the confihuration
I have attached the .env file in the repo
### 1. To change csv path
Replace the value in ` CSV_PATH ` in  `.env` file
### 2. Change Database string 
replace the value in ` DATABASE_URL ` in .env file


## Assumptions taken while building the application

1. Making `id` as primary field.
2. Using Node.js without framework as csv file path has to be taken from enviroment and output of age distubation should be printed in terminal. Also there was no information of API response. Hence did not created an API.
3. While Inserting the user data, i have used transactions so if success all the data will be inserted or nothing.
   

## Output Images
Console


![image](https://github.com/guptasantosh327/csvToJSON/assets/50738674/2a30eb1d-80a3-4d9d-9c16-caf68c740094)

Database


![image](https://github.com/guptasantosh327/csvToJSON/assets/50738674/6211cc86-4407-4a8f-ade2-4a9401d10e19)
