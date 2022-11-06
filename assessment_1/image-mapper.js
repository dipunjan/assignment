var hotspotDetails = []
function loadFile(event) {
    var output = document.getElementById('output');
    var img = new Image();
    var file = event.target.files[0];
    var objectUrl = URL.createObjectURL(file);
    output.src = objectUrl;
    img.src = objectUrl;
    document.getElementsByClassName('details-section')[0].style.display = 'block';
    document.getElementsByTagName('table')[0].style.display = 'table';
    img.onload = function () {
        document.getElementById('dimension').innerHTML = this.width + "x" + this.height;
        URL.revokeObjectURL(objectUrl);
    };
    
    document.getElementById('name').innerHTML = file.name;
    document.getElementById('type').innerHTML = file.type;   
};

function onImageClick(event) {
    var xCoordinate = event.offsetX;
    var yCoordinate = event.offsetY;
    var popup = document.getElementsByClassName('popup')[0];
    popup.style.display = 'block';
    popup.style.top = yCoordinate +'px';
    popup.style.left = xCoordinate +'px';

    localStorage.clear();
    localStorage.setItem("top", popup.style.top);
    localStorage.setItem("left",popup.style.left)
}
function onSave(e) {
    e.preventDefault();
    if(document.getElementById("description").value != ""){
        var hotspot = document.createElement('div');
        hotspot.setAttribute( 'class', 'hotspot' );
        hotspot.style.top = localStorage.getItem("top");
        hotspot.style.left = localStorage.getItem("left");
        document.getElementsByClassName('image-viewer')[0].appendChild(hotspot);

        var point = document.createElement('a');
        hotspot.appendChild(point);

        var desc = document.createElement('div');
        desc.innerHTML = document.getElementById("description").value
        hotspot.appendChild(desc);

        var tbody = document.querySelector('tbody');
        var tr = tbody.insertRow();
        tr.insertCell().innerText = localStorage.getItem("left")
        tr.insertCell().innerText = localStorage.getItem("top")
        tr.insertCell().innerText = document.getElementById("description").value

        document.getElementById("description").value = "";
        document.getElementsByClassName('popup')[0].style.display = 'none';
    } else {
        alert("Please enter description")
    }
}

function onCancel(e){
    e.preventDefault();
    localStorage.clear();
    document.getElementById("description").value = "";
    document.getElementsByClassName('popup')[0].style.display = 'none';
}
