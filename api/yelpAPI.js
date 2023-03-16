const BASE_URL = "https://api.yelp.com/v3";
const API_KEY = "T2thtTUQsbvC2DCa2zTO1NmX65XUAjle292oy-bKOJ8UDrPNAa1-Iy8XDO90LAROTzS0zSw6NGNi40zso2pbO6C8dpQta0Ficp5jMNuA1EltKz38eQHkZwGoomAPZHYx";

const headers = new Headers({
    'Authorization': 'Bearer ' + API_KEY,
    'Content-Type': 'application/json',
    'accept': 'application/json'
});

const options = {
    method: 'GET',
    headers: headers
}

const getAllCategories = async () => {
    try{
        const result = await fetch(`${BASE_URL}/categories?locale=fr_FR`, options);
    
        const data = await result.json();
    
        return data;
    }
    catch(error){
        console.log(error);
        return null;
    }
}

async function searchBusinesses(latitude, longitude, term, radius, categories, limit, offset) {
    try{
        const searchTermParam = (term != null && term.length > 0) ? `&term=${term}`: "";
        const radiusParam = (term != null) ? `&radius=${radius}` : "";
        const limitParam = (limit != null) ? `&limit=${limit}` : "&limit=20";
        const offsetParam = (offset != null) ? `&offset=${offset}` : "";

        const categoriesParam = (categories != null && categories.length > 0) ? categories.map(category => `&categories=${category}`).join('') : ""
        console.log('Requête : ' + `${BASE_URL}/businesses/search?locale=fr_FR&latitude=${latitude}&longitude=${longitude}${categoriesParam}${searchTermParam}${radiusParam}${limitParam}${offsetParam}`)
        const result = await fetch(
            `${BASE_URL}/businesses/search?locale=fr_FR&latitude=${latitude}&longitude=${longitude}${categoriesParam}${searchTermParam}${radiusParam}${limitParam}${offsetParam}`, 
            options);
        const data = await result.json();
        return data;
    }
    catch(error){
        console.log(error);
        return null;
    }
}

export { getAllCategories, searchBusinesses }