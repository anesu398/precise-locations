const { getAllLocations, getCoordinatesByName, calculateDistanceBetweenLocations } = require('./index.js');

// Example 1: Get all locations in Europe (you can change 'Europe' to any region you want to filter by)
const locations = getAllLocations({ region: 'Africa', page: 1, pageSize: 5 });
console.log('Locations in Africa (first page, 5 per page):', locations);

// Example 2: Get coordinates by name
const coordinates = getCoordinatesByName('Harare');
console.log('Coordinates of Harare:', coordinates);

// Example 3: Calculate distance between two locations
const distance = calculateDistanceBetweenLocations('Harare', 'Bulawayo');
console.log('Distance between Harare and Bulawayo:', distance, 'km');
