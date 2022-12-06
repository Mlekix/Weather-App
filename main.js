const input = document.querySelector(".search-bar");
const button = document.querySelector(".search button");
const cityList = [];

input.addEventListener("keyup", async function () {
    if (!input.value) {
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
    } else if (event.key === "Enter") {
        await handleSearch(input.value);
    }
});

const deleteCity = (id) => {
    const card = document.querySelector(`[data-id="${id}"]`);
    card.remove();
    cityList.splice(id, 1);
};

const cardElement = (city) => `<div id="card" data-id="${city.id}">
                <h2 class="city">${city.name}</h2>
                <div class="temp">${city.temp.toFixed(0)}°C</div>
                <img class="icon" src="${
                    "http://openweathermap.org/img/wn/" + city.icon + "@2x.png"
                }" alt="" />
                <div class="main">${city.main}</div>
                <button class="delete" href="#" onclick="deleteCity(${
                    city.id
                })"><ion-icon name="trash-outline"></ion-icon</button>
                    
                >
            </div>`;

const checkCityExist = (data) =>
    cityList.filter((city) => {
        return city.name === data.name;
    }).length === 0;

const handleSearch = async (city) => {
    await fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&units=metric&appid=" +
            "f5bdb001418c0e448f214340aaa98c11"
    )
        .then((response) => response.json())
        .then((data) => {
            if (checkCityExist(data)) {
                const { name } = data;
                const { icon, main } = data.weather[0];
                const { temp } = data.main;
                const city = { name, icon, main, temp };
                cityList.push(city);
                const card = cardElement(city);
                document
                    .querySelector(".cardwrapper")
                    .insertAdjacentHTML("beforeend", card);
            } else {
                Toastify({
                    text: "City already exists",
                    offset: {
                        x: 50,
                        y: 10,
                    },
                    style: {
                        background: "red",
                    },
                }).showToast();
            }
        });
};

button.addEventListener("click", () => handleSearch(input.value));

(() => {
    handleSearch("London");
})();
