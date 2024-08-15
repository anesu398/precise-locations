const haversine = require('haversine-distance'); // Assume this is an installed npm package for distance calculation

/**
 * Validate the structure of location data.
 * @param {Object} location - The location object to validate.
 * @returns {boolean} True if valid, false otherwise.
 */
function validateLocationData(location) {
    return (
        typeof location.name === 'string' &&
        typeof location.lat === 'number' &&
        typeof location.lon === 'number' &&
        (!location.region || typeof location.region === 'string')
    );
}

/**
 * Calculate the distance between two coordinates using the Haversine formula.
 * @param {Object} coords1 - The first set of coordinates { lat: number, lon: number }.
 * @param {Object} coords2 - The second set of coordinates { lat: number, lon: number }.
 * @returns {number} The distance between the coordinates in kilometers.
 */
function calculateDistance(coords1, coords2) {
    const point1 = { lat: coords1.lat, lon: coords1.lon };
    const point2 = { lat: coords2.lat, lon: coords2.lon };
    const distanceInMeters = haversine(point1, point2);
    return distanceInMeters / 1000; // Convert to kilometers
}

module.exports = {
    validateLocationData,
    calculateDistance
};
