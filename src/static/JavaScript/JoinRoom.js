
function reloadRoom () {
    var joinChatroom = document.getElementById("joinChatroom").value;
    var request = new XMLHttpRequest();
    request.onload = function upDate() {
        document.getElementById("outputBox").innerHTML = this.responseText;
        setTimeout(reloadMessage, 500);
    };
    request.ontimeout = function timeoutCase() {
        document.getElementById("outputBox").innerHTML = "Still trying ...";
        setTimeout(reloadMessage, 1000);
    };
    request.open("GET", "http://vs280.dei.isep.ipp.pt/cgi-bin/generateRoom?room=" + joinChatroom, true);
    request.timeout = 5000;
    request.send();
}