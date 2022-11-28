const jokeButton = document.querySelector("#jokeButton");
const jokeText = document.querySelector("#jokeText");
const reportJokesButtons = document.querySelector("#reportJokesButtons");

let reportAcudits = [];
let id = ""; 

//EXERCICI 1
async function fetchJoke() { //fetchJoke() is an asynchronous function since it's marked with the async keyword
    //To start a request, call the special function fetch():
    const response = await fetch('https://icanhazdadjoke.com', { //fetch() starts an HTTP request to the url and returns a promise
                    //Because the await keyword is present, the asynchronous function is paused until the request completes
                    //When the request completes, "const response" is assigned with the response object of the request (promise is resolved)
        headers: {  //Headers are an option to use when configurating the object with properties
            Accept: "application/json", //definiendo qué tipo de info se quiere recibir. para que la respuesta sea formato json
        }, 
    });

    //The response object, returned by the await fetch(), is a generic placeholder for multiple data formats.

    const joke = await response.json(); //Response.json() is a method on the Response object that lets you extract a JSON object from the response
                                        //The method returns a promise, so you have to wait for the JSON
    
    jokeText.textContent = joke.joke;
    jokeText.setAttribute("data-id", joke.id); 

    //Source: https://dmitripavlutin.com/javascript-fetch-async-await/

    //DOM
    reportJokesButtons.style = "display: flex;";
    id = document.querySelector("[data-id]").dataset.id; //para guardar información en el elemento
    
    //Creating new object and adding it to reportAcudits array
    const date = new Date().toISOString();
    const acudit = {
        joke: id,
        score: 0, 
        date
    }; reportAcudits.push(acudit); 
}


//EXERCICI 3
function reportJokes(score) { //finds id in reportAcudits and updates score

    let rateJoke = reportAcudits.find(joke => {
        return joke.joke === id;
    }); 

    rateJoke.score = score; 

    console.log(reportAcudits);
}

//EXERCICI 4
const weatherBox = document.querySelector("#weatherBox");
const tempBox = document.querySelector("#tempBox");

async function fetchWeather() {
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?id=3128760&appid=f27eba93b60f95a5bdc014f378ab093f',
    {
        headers: {
            Accept: 'application/json',
        },
    },);

    const weather = await response.json();
    weatherBox.textContent = "Avui: " + weather.weather[0].description; 
    let temperature = (Number(weather.main.temp)-273).toFixed(0); 
    tempBox.textContent = "Temperatura: " + temperature + "ºC"; 
}

fetchWeather();