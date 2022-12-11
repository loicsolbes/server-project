const map = L.map('map').setView([0, 0], 5);
    
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// We want to retrieve data from the database.
// We will use the fetch() function, by default GET method.

//Here getData() will store the data ask from the server.
async function getData() {

    let response = await fetch('/api')
    /*
        What's happen on the line above:
        We call the function fetch and assign it a variable call response.
        As we know fetch() always return a promise.
        In our case it will return a resolved promise with the result of the data that we have asked.
    */

    let data = await response.json()
    /*
        The json() method return a promise.
        It returns a resolved promise with the result of parsing the body text as JSON.
        The result is not JSON but is instead the result of taking JSON as input and parsing it to produce a JavaScript object.
    */

    for (item of data) {

        const marker = L.marker([item.lat, item.long]).addTo(map);

        const root = document.createElement('div')
        root.className = "container"

        const position = document.createElement('div')
        const date = document.createElement('div')

        position.textContent = `Position: ${item.lat}, ${item.long}`
        
        const dateString = new Date(item.timestamp).toLocaleString()
        date.textContent = `Date: ${dateString}`

        root.append(position, date)
        document.body.append(root)
    }



}

getData()
