let lat, long

const button = document.getElementById('submit')

button.addEventListener('click', async event => {

    const data = { lat, long }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    const response = await fetch('/api', options)
    const json = await response.json()
    console.log(json)

})

if("geolocation" in navigator) {

    console.log('geolocation availiable')
    navigator.geolocation.getCurrentPosition(async position => {

        lat = position.coords.latitude
        long = position.coords.longitude

        document.getElementById('latitude').textContent = lat
        document.getElementById('longitude').textContent =  long

        const map = L.map('map').setView([lat, long], 13);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        let myPosition = L.marker([lat, long]).addTo(map)

    })
    
} else {
    console.log('geolocation not availiable')
}