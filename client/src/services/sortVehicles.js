/**
 * @file Contains function to sort an object of vehicles
 * @param {object} vehicles - vehicles object
 * @param {string} property - Property to sort by (price, mileage, ect.)
 * @param {boolean} ascending - True for ascending sort, false for descending sort
 */
export const sortVehicles = (vehicles, property, ascending) => {
  return Object.entries(vehicles).sort((a, b) => {
    if (a[1][property] && b[1][property]) {
      return ascending
        ? b[1][property] - a[1][property]
        : a[1][property] - b[1][property];
    } else {
      return a[1][property] ? -1 : 1;
    }
  });
};
