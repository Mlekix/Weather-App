let cities = [];

let weather = {
    apiKey: "f5bdb001418c0e448f214340aaa98c11",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
                city +
                "&units=metric&appid=" +
                this.apiKey
        )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, main } = data.weather[0];
        const { temp } = data.main;
        cities.push({
            name: name,
            icon: icon,
            main: main,
            temp: temp,
        });

        document.querySelector(".city").innerText = name;
        document.querySelector(".temp").innerText = `${temp.toFixed(0)}°C`;
        document.querySelector(".icon").src =
            "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".main").innerText = main;
        console.log(cities);
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};

const duplicateChildNodes = () => {
    const elem = document.getElementById("card");
    const copy = elem.cloneNode(true);
    elem.parentNode.insertBefore(copy, elem);
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
    duplicateChildNodes();
});

document.querySelector(".search-bar").addEventListener("keyup", function () {
    if (event.key == "Enter") {
        weather.search();
        duplicateChildNodes();
    }
});

weather.fetchWeather("London");
