const locations = require('./locations.json');

/**
 * Get all available locations.
 * @returns {Array} List of locations with their coordinates.
 */
function getAllLocations() {
    return locations;
}

/**
 * Get the coordinates of a specific location by name.
 * @param {string} name - The name of the location.
 * @returns {Object|null} The coordinates of the location or null if not found.
 */
function getCoordinatesByName(name) {
    const location = locations.find(loc => loc.name.toLowerCase() === name.toLowerCase());
    return location ? { lat: location.lat, lon: location.lon } : null;
}

module.exports = {
    getAllLocations,
    getCoordinatesByName
};
