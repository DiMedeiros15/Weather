let date = new Date()
let hour = date.getHours()
let background = document.querySelector('.background-container')


updateBackground()

function updateBackground() {

    let backgroundContainer = document.querySelector('.background-container')

    if(hour >= 0 && hour < 12) {
        background.style.backgroundImage = 'url(img/dia.jpg)'
        document.querySelector('.header h1').innerHTML = 'Olá, bom dia!'
        backgroundContainer.style.setProperty('--background-color-before', 'rgba(0, 0, 0, 0.20)')
    } else if (hour >= 12 && hour < 17) {
        background.style.backgroundImage = 'url(img/tarde.jpg)'
        document.querySelector('.header h1').innerHTML = 'Olá, boa tarde!'
        backgroundContainer.style.setProperty('--background-color-before', 'rgba(0, 0, 0, 0.0)')
    } else if(hour >= 17 && hour < 18 ) {
        background.style.backgroundImage = 'url(img/finaltarde.jpg)'
        let titulo = document.querySelector('.header h1')
        titulo.innerHTML = 'Finalzinho de tarde...'
        titulo.style.fontSize = '45px'
        backgroundContainer.style.setProperty('--background-color-before', 'rgba(0, 0, 0, 0.40)')
    } else {
        background.style.backgroundImage = 'url(img/noite.jpg)'
        document.querySelector('.header h1').innerHTML = 'Olá, boa noite!'
        backgroundContainer.style.setProperty('--background-color-before', 'rgba(0, 0, 0, 0.60)')
    }
}

setTimeout(()=>{
    document.querySelector('.loadingContainer').style.display = 'none'
    document.querySelector('.container').style.display = 'flex'
},1300)

setTimeout(()=>{
    document.querySelector('.header h3').style.display = 'flex'
},2300)

document.querySelector('.busca').addEventListener('submit', async(event)=>{
    event.preventDefault();

    let input = document.querySelector('#searchInput').value

    if (input !== '') {
        showMensage('Carregando ...');
        
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}
        &appid=bd0d786dd4b55ce8718faa3f05857806&units=metric&lang=pt_br`

        let results = await fetch(url)
        let json = await results.json()


        if (json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                weather: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg,
                feelsLike: json.main.feels_like,
                tempMax: json.main.temp_max,
                tempMin: json.main.temp_min
            })
        }
        else{
            clearInfo()
            showMensage('Não encontramos essa localização.')
        }}
    });

function showInfo(json){
    showMensage('');

    document.querySelector('.titulo').innerHTML = `${json.name} - ${json.country}`
    document.querySelector('.tempInfo').innerHTML = `${json.temp.toFixed(0)} <sup>ºC</sup>`
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed.toFixed(1)} <span>km/h</span>`
    
    document.querySelector('.temp img').setAttribute('src',`http://openweathermap.org/img/wn/${json.weather}@2x.png`) 
    
    document.querySelector('.wind-position').style.transform = `rotate(${json.windAngle}deg)`

    document.querySelector('.feels-like-info').innerHTML = `${json.feelsLike.toFixed(0)}<sup>ºC</sup>`
    document.querySelector('.temp-max-info').innerHTML = `${json.tempMax.toFixed(0)}<sup>ºC</sup>`
    document.querySelector('.temp-min-info').innerHTML = `${json.tempMin.toFixed(0)}<sup>ºC</sup>`

    document.querySelector('.resultado').style.display = 'block';
}

function showMensage(msg){
    document.querySelector('.aviso').innerHTML = msg;
}

function clearInfo(){
    showMensage('')
    document.querySelector('.resultado').style.display = 'none'
}