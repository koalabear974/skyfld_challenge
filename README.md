# Challenge reviews

## Installation

To install dependencies and run the app:

`npm install`

`npm run dev`

To run tests:

`npm run test`

## Dependency

This app has been built with node version v18.17.1

## Testing

As the default view for the dashboard is to display live data, 
you will probably not be able to see charts at first. 
You can either look at the dummy data provided for both sensor 
that would be present within those dates: '2024-05-22' - '2024-05-30'

Or you can generate dummy data yourself via the Add Data page. 

To test the live view and the auto refresh you can add dummy data from another page.
As long as it's within the time span from the live data the chart will fetch new 
data added or even edited from the file itself.

## Challenge completion steps:
 - Generate code base with nextjs create app
 - Create file database helper, api and tests for it
 - Install UI Framework adequate for dashboard and configure it
 - Generate temperature, humidity, etc data 
 - Add chart components and display it on dashboard
 - Add data upload interface with dummy data generation and file input
 - Add tests for the frontend

## Things to improve
 - I would need more time to improve the front end tests 
   - Add test for the chart display
   - Add tests for date picker and time picker
 - In the future I might use another package for charts as apexchart was used in flowbite
 - The data schema could be improve on for a more scalable structure 
 - Off course run the database from something else than files
 - In terms of product I would improve the following
    - Have the ability to add sensors and other sensor type (images, etc)
    - Add geoposition of sensors and map 
    - Have sensors and charts be able to send/show multiple types of data at the same time
    - Have interactive chart to compare type of data and different sensor within a same timeframe


# Coding Challenge: Farm Sensor Data API and Visualization

## Objective
Develop a simplified version of a farm sensor data management system that consists of two main parts: A backend API to handle sensor data (e.g., temperature, humidity) and a basic frontend to display this data. Use any backend or frontend framework that you feel comfortable with.

## Backend
### Create a RESTful API with the following endpoints:
`POST` `/sensors/data`: Accepts and stores sensor data (e.g., sensor ID, type, value, timestamp).  
`GET` `/sensors/data`: Retrieves the latest data for all sensors.

### Data Storage:
For simplicity, use an in-memory store or a simple file-based storage solution to persist sensor data.

### Error Handling:
Implement basic error handling for the API endpoints.

## Testing
Write a test to verify the functionality of the API endpoints.


## Frontend

### Sensor Data Display:
Develop a web application to fetch and display sensor data from the backend in a simple, readable format (e.g. a list or table).

### Sensor Data Input:
Add a functionality to input new sensor data

### Data Refresh:
Implement a mechanism to periodically refresh the sensor data displayed on the frontend, ensuring the latest data is always shown.

## Testing
Include a basic test for the frontend to check that sensor data is correctly fetched and displayed.

## Submission Guidelines
Provide a zip file containing your project.  
Include a `README` file with setup instructions and a brief explanation of your solution.  
Ensure the application can be easily set up and run locally for evaluation purposes.
