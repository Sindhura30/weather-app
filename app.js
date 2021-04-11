window.addEventListener('load', () => {
    let longitude;
    let latitude;
    const API_KEY = '7bfc0186a79b2880e23fc3441bdcddc1';
    let location = document.querySelector(".location-section");
    let temperature = document.querySelector(".temperature-degree");
    let temperature_max = document.querySelector(".temperature-max");
    let temperature_min = document.querySelector(".temperature-min");
    let temperaturedescription = document.querySelector(".temperature-description");
    let icon_placeholder = document.querySelector(".icon");
    let location_disabled = document.querySelector('.location-disabled');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=${API_KEY}&units=metric`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data)
                    const { temp, temp_max, temp_min } = data.main;
                    const { main, icon } = data.weather[0];
                    location.textContent = data.name;
                    temperature.textContent = temp;
                    temperaturedescription.textContent = main;
                    temperature_max.textContent = temp_max;
                    temperature_min.textContent = temp_min;
                    const image = document.createElement('img')
                    image.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
                    icon_placeholder.appendChild(image);
                })
        });
    }
    else {
        location_disabled.textContent = 'Please enable location on your browser';
    }

});