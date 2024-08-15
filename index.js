const locations = require('./locations.json');
const cache = new Map(); // Simple in-memory cache
const { validateLocationData, calculateDistance } = require('./utils'); // Assume utility functions are in a separate file
const { logError, logInfo } = require('./logger'); // Assume a logger module is available

/**
 * Get all available locations with optional filters and pagination.
 * @param {Object} [options] - Optional filters and pagination.
 * @param {string} [options.region] - Filter by region.
 * @param {number} [options.page] - Page number for pagination.
 * @param {number} [options.pageSize] - Number of items per page.
 * @returns {Array} List of filtered and paginated locations.
 */
function getAllLocations(options = {}) {
    const { region, page = 1, pageSize = 10 } = options;
    let filteredLocations = locations;

    if (region) {
        filteredLocations = filteredLocations.filter(loc => loc.region && loc.region.toLowerCase() === region.toLowerCase());
    }

    // Pagination
    const start = (page - 1) * pageSize;
    const paginatedLocations = filteredLocations.slice(start, start + pageSize);

    return paginatedLocations;
}


/**
 * Get the coordinates of a specific location by name with fuzzy search and caching.
 * @param {string} name - The name of the location.
 * @returns {Object|null} The coordinates of the location or null if not found.
 */
function getCoordinatesByName(name) {
    if (!name) {
        logError('Invalid location name provided');
        return null;
    }

    const cachedResult = cache.get(name.toLowerCase());
    if (cachedResult) {
        logInfo(`Cache hit for location: ${name}`);
        return cachedResult;
    }

    const location = locations.find(loc => loc.name.toLowerCase().includes(name.toLowerCase()));

    if (!location) {
        logError(`Location not found: ${name}`);
        return null;
    }

    const result = { lat: location.lat, lon: location.lon };
    cache.set(name.toLowerCase(), result); // Cache the result

    logInfo(`Location found: ${name}`);
    return result;
}

/**
 * Calculate the distance between two locations by name.
 * @param {string} name1 - The name of the first location.
 * @param {string} name2 - The name of the second location.
 * @returns {number|null} The distance in kilometers or null if either location is not found.
 */
function calculateDistanceBetweenLocations(name1, name2) {
    const coords1 = getCoordinatesByName(name1);
    const coords2 = getCoordinatesByName(name2);

    if (!coords1 || !coords2) {
        logError('One or both locations not found for distance calculation');
        return null;
    }

    return calculateDistance(coords1, coords2);
}

/**
 * Validate the location data before processing.
 * This function ensures that the data structure is correct.
 * @param {Array} locationsData - The locations data to validate.
 * @returns {boolean} True if valid, false otherwise.
 */
function validateLocations(locationsData) {
    return locationsData.every(loc => validateLocationData(loc));
}

if (!validateLocations(locations)) {
    throw new Error('Invalid location data in locations.json');
}

module.exports = {
    getAllLocations,
    getCoordinatesByName,
    calculateDistanceBetweenLocations
};
