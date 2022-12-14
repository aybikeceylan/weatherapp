const search = document.querySelector(".search")
const btn = document.querySelector(".btn")
const main = document.querySelector(".main")

let counter = 0;

const fetchCity = (name) => {
    if (counter > 3) {
        alert("maximum arama sınırına ulaştınız")
    }
    else {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=98ee7a2b10fb4e81ffcc70e6a64d53c3`

        fetch(url)
            .then((res) => {
                if (!res.ok) {
                    console.log(`Something went wrong: ${res.status}`);
                    renderError();
                    throw new Error();
                }
                return res.json();
            })
            .then((data) => renderCity(data))
            .catch((err) => console.log(err))

    }
}

const renderCity = (data) => {
    console.log(data)
    const { name, weather, main: { temp }, wind: { speed }, main: { humidity } } = data

    console.log(name);
    console.log(Object.values(weather)[0].description)
    console.log(Object.values(weather)[0].icon)
    console.log(temp);
    console.log(humidity);
    console.log(speed);

    main.innerHTML += `
    <div class="card">
      <div class="card-text card-xmark">
        <p class="name">Weather in ${name}</p>
        <i class="fa-solid fa-xmark"></i>
      </div>
      <div class="card-text">
        <p class="temp">${Math.floor(temp) - 273}°C </p>
      </div>
      <div class="card-text">
            <img class="icon" src="http://openweathermap.org/img/wn/${Object.values(weather)[0].icon}.png" alt="">
            <p>${Object.values(weather)[0].description}</p>
        </div>
      <div class="card-text">
        <p class="status">Humidity:% ${humidity}</p>
        <p class="status">Wind Speed:${speed}</p>
      </div>
    
    </div>`

}

const renderError = () => {

    alert("Anlamlı bir şehir ismi giriniz ")

}

btn.addEventListener("click", () => {
    input = search.value
    fetchCity(input)
    search.value = ""
    console.log(input)
    counter++
})
main.addEventListener("click", (e) => {

    console.log(e.target)
    if (e.target.className == "fa-solid fa-xmark") {
        e.target.parentElement.parentElement.remove()
    }
})


window.onload = function () {
    search.focus()
}
search.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
        btn.click()
    }
})