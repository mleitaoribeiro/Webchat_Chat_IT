
function reloadMessage() {
    var request = new XMLHttpRequest();
    request.onload = function upDate() {
        document.getElementById("outputBox").innerHTML = this.responseText;
        setTimeout(reloadMessage, 500);
    };
    request.ontimeout = function timeoutCase() {
        document.getElementById("outputBox").innerHTML = "Still trying ...";
        setTimeout(reloadMessage, 1000);
    };
    request.onerror = function errorCase() {
        document.getElementById("outputBox").innerHTML = "Still trying ...";
        setTimeout(reloadMessage, 1000);
    };
    request.open("GET", "https://vs280.dei.isep.ipp.pt/cgi-bin/outputBox", true);
    request.timeout = 5000;
    request.send();
}

function sendMessage () {
    var userTextInput = document.getElementById("userTextInput").value;
    var request = new XMLHttpRequest();
    request.open("POST", "https://vs280.dei.isep.ipp.pt/cgi-bin/outputBox", true);
    request.send(userTextInput);
}