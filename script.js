async function getDashboardData(query){
    const destinations = fetch(`http://localhost:3333/destinations?search=${query}`).then(res => res.json());
    const weathers = fetch(`http://localhost:3333/weathers?search=${query}`).then(res => res.json());
    const airports = fetch(`http://localhost:3333/airports?search=${query}`).then(res => res.json());

    const promises = [destinations, weathers, airports]
    const result = await Promise.all(promises)
    const resultDestination = result[0];
    const resultWeather = result[1];
    const resultAirport = result[2]; 

    return {
        city: resultDestination[0].name,
        country: resultDestination[0].country
    }
}

getDashboardData('london')