document.querySelector(".busca").addEventListener("submit", async (event) => {
  event.preventDefault();

  let input = document.querySelector("#searchInput").value;

  if (input !== "") {
    showMensage("Carregando ...");

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
      input
    )}
        &appid=bd0d786dd4b55ce8718faa3f05857806&units=metric&lang=pt_br`;

    let results = await fetch(url);
    let json = await results.json();

    if (json.cod === 200) {
      showInfo({
        name: json.name,
        country: json.sys.country,
        temp: json.main.temp,
        weather: json.weather[0].icon,
        windSpeed: json.wind.speed,
        windAngle: json.wind.deg,
      });
    } else {
      showMensage("Não encontramos esse localização ...");
    }
    clearInfo();
  }
});

function showInfo(json) {
  showMensage("");

  document.querySelector(
    ".titulo"
  ).innerHTML = `${json.name} - ${json.country}`;
  document.querySelector(".tempInfo").innerHTML = `${json.temp} <sup>ºC</sup>`;
  document.querySelector(
    ".ventoInfo"
  ).innerHTML = `${json.windSpeed} <span>km/h</span>`;

  document
    .querySelector(".temp > img")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${json.weather}@2x.png`
    );

  document.querySelector(".ventoPonto").style.transform = `rotate(${
    json.windAngle - 90
  }deg)`;

  document.querySelector(".resultado").style.display = "block";
}

function showMensage(msg) {
  document.querySelector(".aviso").innerHTML = msg;
}

function clearInfo() {
  document.querySelector(".resultado").style.display = "none";
}
