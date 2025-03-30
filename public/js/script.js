const socket=io();

if(navigator.geolocation){
    navigator.geolocation.watchPosition((position)=>{
        const {latitude,longitude}=position.coords
        socket.emit('send-location',{latitude,longitude})

    },
    (err)=>{
        console.error('Error:',err);
        
    },
    {
        enableHighAccuracy: true,
        maximumAge:0,
        timeout:5000
    }

)
}

var map=L.map('map').setView([23.250923, 77.4706921],16)
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

const markers={}

socket.on('recevied-location',(data)=>{
    const {id,latitude,longitude}=data;
    map.setView([latitude,longitude])
    if(markers[id]){
        markers[id].setLatLng([latitude,longitude])
    }
    else{
        markers[id]=L.marker([latitude,longitude]).addTo(map)
    }
})

socket.on('user-disconnected',(id)=>{
    if(markers[id]){
        map.removeLayer(markers[id])
        delete markers[id]
    }
})

// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
//     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// }).addTo(map);

// var marker= L.marker([23.250923, 77.4706921]).addTo(map);

