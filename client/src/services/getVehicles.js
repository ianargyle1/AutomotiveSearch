/**
 * @file Contains function to get vehicles via API call.
 * @param {object} data - Search parameters
 */
export const getVehicles = (data) => {
  const params = Object.entries(data)
    .map((param) => {
      return param[1] != "" ? param[0] + "=" + param[1] : "";
    })
    .filter(Boolean)
    .join("&");
  return new Promise((resolve, reject) => {
    fetch("http://localhost:3000/api/vehicles?" + params)
      .then((response) => response.json())
      .then((data) => resolve(data));
  });
};
