const input = document.querySelector(".search-bar");
const button = document.querySelector(".search button");

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
        this.fetchWeather(input.value);
    },
};

const duplicateChildNodes = () => {
    const elem = document.getElementById("card");
    const copy = elem.cloneNode(true);
    elem.parentNode.insertBefore(copy, elem);
};

button.addEventListener("click", function () {
    if (input.value === "" || search === 0) {
        Toastify({
            text: "Type name of city",
            offset: {
                x: 50, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                y: 10, // vertical axis - can be a number or a string indicating unity. eg: '2em'
            },
            style: {
                background: "red",
            },
        }).showToast();
    } else {
        weather.search();
        duplicateChildNodes();
    }
    return;
});

input.addEventListener("keyup", function () {
    if (input.value === "") {
        Toastify({
            text: "Type name of city",
            offset: {
                x: 50, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                y: 10, // vertical axis - can be a number or a string indicating unity. eg: '2em'
            },
            style: {
                background: "red",
            },
        }).showToast();
    } else if (event.key == "Enter") {
        weather.search();
        duplicateChildNodes();
    }
    return;
});

weather.fetchWeather("London");
