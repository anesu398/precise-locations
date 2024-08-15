# Precise Locations

This project provides a robust and feature-rich Node.js package for managing locations and their associated geographic coordinates. The API includes functionalities for retrieving all locations, fetching coordinates by location name, validating location data, calculating distances between locations, and logging operations.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Utilities](#utilities)
- [Logging](#logging)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Prerequisites

Ensure you have Node.js installed on your machine. You can download it from [here](https://nodejs.org/).

### Steps

1. Clone the repository:

    ```bash
    git clone https://github.com/anesu398/precise-locations.git
    cd precise-locations
    ```

2. Install the necessary dependencies:

    ```bash
    npm install
    ```

3. Ensure that the `locations.json` file exists in the root directory and contains valid location data.

## Usage

### Starting the API

To start the API, simply run:

```bash
node index.js
```
This will start the API server on the configured port.

### Example Usage
You can interact with the API using any HTTP client like curl, Postman, or your browser.

Fetch all locations:
```bash
curl http://localhost:3000/locations
```
Fetch coordinates by location name:
```bash
curl http://localhost:3000/locations/coordinates?name=LocationName
```
### Features
- Retrieve All Locations: Get a list of all available locations with their respective coordinates.
- Fetch Coordinates by Name: Retrieve the geographic coordinates (latitude and longitude) of a location by its name.
- Data Validation: Ensure the integrity of location data with validation functions.
- Distance Calculation: Calculate the distance between two locations using the Haversine formula.
- Robust Logging: Log all significant operations and errors for easy debugging and monitoring.
### API Endpoints
`GET /locations`
Description: Retrieves a list of all locations with their coordinates.

Response:
```json
[
  {
    "name": "Bulawayo",
    "lat": -20.132499,
    "lon": 28.626479,
    "region": "Matabeleland"
  },
  ...
]
```
`GET /locations/coordinates`
Description: Retrieves the coordinates of a specific location by name.

Query Parameters:

- name: The name of the location (case-insensitive).
Response:
```json
{
  "lat": 12.34,
  "lon": 56.78
}
```
#### Error Response:

If the location is not found:
```json
{
  "error": "Location not found"
}
```
### Utilities
`utils.js`
Contains utility functions for validation and distance calculation.

- validateLocationData(location): Validates the structure of location data.
- calculateDistance(coords1, coords2): Calculates the distance between two coordinates using the Haversine formula.
Example:
```javascript
const { validateLocationData, calculateDistance } = require('./utils');

// Validate location data for a city in Zimbabwe
const isValid = validateLocationData({ name: "Harare", lat: -17.8251657, lon: 31.03351 });
console.log(`Is Harare data valid? ${isValid}`); // true

// Calculate distance between two cities in Zimbabwe
const distance = calculateDistance(
    { lat: -17.8251657, lon: 31.03351 }, // Harare
    { lat: -20.132499, lon: 28.626479 }   // Bulawayo
);
console.log(`Distance between Harare and Bulawayo: ${distance} km`);

```
### Logging
`logger.js`
Handles logging for the application.

- logInfo(message): Logs an informational message.
- logError(message): Logs an error message.
- Logs are stored in the app.log file in the root directory.

Example:
```javascript
const { logInfo, logError } = require('./logger');

logInfo('Server started successfully');
logError('Failed to retrieve location data');
```
### Contributing
Contributions are welcome! Please open an issue or submit a pull request with your proposed changes.

#### Guidelines
- Ensure your code is well-documented.
- Write tests for any new features or changes.
- Follow the project's coding style.
## License
This project is licensed under the MIT License. See the <LICENSE> file for more details.