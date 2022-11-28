const jokeButton = document.querySelector("#jokeButton");
const jokeText = document.querySelector("#jokeText");

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

}

let reportAcudits = [];

function reportJokes(score) {
    const id = document.querySelector("[data-id]").dataset.id; //para guardar información en el elemento
    const date = new Date().toISOString();

    const joke = {
        joke: id,
        score, 
        date
    }

    reportAcudits.push(joke); 

    console.log(score, id, date); 
    console.log(reportAcudits); 
}

