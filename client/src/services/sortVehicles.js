export const sortVehicles = (vehicles, property, ascending) =>{
    return Object.entries(vehicles).sort((a,b) => {
        if (a[1][property] && b[1][property]) {
            return (ascending) ? b[1][property] - a[1][property] : a[1][property] - b[1][property];
        } else {
            return (a[1][property]) ? -1 : 1;
        }
    });
}