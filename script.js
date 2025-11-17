async function getDashboardData(query){

try{
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
        country: resultDestination[0].country,
        temperature : resultWeather[0].temperature,
        weather: resultWeather[0].weather_description,
        airport: resultAirport[0].name
    
        
    }
}catch(error){
    throw new Error('Errore nel caricamento dati');
}

}

getDashboardData('london')
    .then(data => {
        console.log('Dasboard data:', data);
        console.log(
            `${data.city} is in ${data.country}.\n` +
            `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n`+
            `The main airport is ${data.airport}.\n`
        );
    })
    .catch(error => console.error(error));