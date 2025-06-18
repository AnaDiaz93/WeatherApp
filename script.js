// async function saludarConRetraso() {
//     console.log("Iniciando saludo...");

//     await new Promise(resolve => setTimeout(resolve, 4000));
//     console.log('Hola despues de 4 segundos');
    
// }

// saludarConRetraso();   

document.addEventListener('DOMContentLoaded', ()=>{
    const countryInput = document.getElementById('country');
    const cityInput = document.getElementById('city');
    const getWeatherBtn =document.getElementById('getWeatherBtn');

    const displayCity = document.getElementById('display-city');
    const temperatureDisplay = document.getElementById('temperature');
    const descriptionDisplay = document.getElementById('description');
    const humidityDisplay = document.getElementById('humidity');

    const errorMessage = document.getElementById('error-message');

    const API_KEY = '';

    getWeatherBtn.addEventListener('click', async()=>{
        const country =countryInput.value.trim()
        const city = cityInput.value.trim();
        
        // Limpiar Formulario
        errorMessage.textContent ='';
        displayCity.textContent ='N/A';
        temperatureDisplay.textContent ='N/A';
        descriptionDisplay.textContent ='N/A';
        humidityDisplay.textContent ='N/A';

        if (!country || !city){
            errorMessage.textContent = 'Por favor ingrese el nobmre del país y la cuidad';
            return
        }
        try{
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric&lang=es`;

            response = await fetch(url);

            if(!response.ok){
                if(response.status === 404){
                    throw new Error('Cuidad o pais no encontrado, intenta con otro.');
                } else{
                    throw new Error(`Error en la solicitud: ${response.status}${response.statusText}`);
                }
            }

            const data = await response.json();

            displayCity.textContent = data.name + ";" + data.sys.country;
            temperatureDisplay.textContent = `${data.main.temp} C`;
            descriptionDisplay.textContent = data.weather[0].description.charAt(0).toUpperCase()+data.weather[0].description.slice(1);
            humidityDisplay.textContent = `${data.main.humidity}%`;
        } catch(error){
            console.log('Hubo un problema con la operación del fetch:', error);
            errorMessage.textContent =`Error: ${error.message}`;
        }

    });
    
});