const id = ((id) => {
    return document.getElementById(id);
})

const userInput = id('user-input'),
btn = id('btn'),
ipAddressDisplay = id('ip-address'),
locationDisplay = id('location'),
timezoneDisplay = id('timezone'),
ispDisplay = id('isp')


let map = null;

getAndDisplayInfo();

btn.addEventListener('click', (e) => {
    getAndDisplayInfo();
});

async function getAddress(url) {
    const resp = await fetch(url);
    const result = await resp.json();
    return result;
};

function getLocation(lat, log) {
    if (map !== undefined && map !== null) {
        map.remove();
    }

    map = L.map('map').setView([lat, log], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'}).addTo(map);

    const marker = L.marker([lat, log]).addTo(map);
}

function getAndDisplayInfo() {
    let ipAddress = userInput.value;

    let url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_kDioDP5fhT0RITgcIXTCDlir1O4Gl&ipAddress=${ipAddress}`;

    getAddress(url)
    .then((result) => {

        const ipAddr = result.ip;
        const country = result.location.country;
        const city = result.location.city;
        const postalCode = result.location.postalCode;
        const timezone = result.location.timezone;
        const isp =  result.isp;
        const latitude = result.location.lat;
        const longitude = result.location.lng;

        ipAddressDisplay.innerHTML = ipAddr;
        locationDisplay.innerHTML = `${city}, ${country} ${postalCode}`;
        timezoneDisplay.innerHTML = `UTC ${timezone}`;
        ispDisplay.innerHTML = isp;
        userInput.value = ipAddr;

        getLocation(latitude, longitude);

    }).catch(status => {
        alert("An error occurred! Input correct IPv4 or IPv5 address or check your internet connection")
    });
};


