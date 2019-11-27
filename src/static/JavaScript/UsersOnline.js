// Função para reload das mensagens na outputBox sincronizando-as com o ficheiro outputBox presente no servidor:
function reloadUserOnline() {
    var request = new XMLHttpRequest();
    request.onload = function upDate() {
        document.getElementById("listOnlineUsers").innerHTML = this.responseText;
        setTimeout(reloadMessage, 500);
    };
    request.ontimeout = function timeoutCase() {
        document.getElementById("listOnlineUsers").innerHTML = "Still trying ...";
        setTimeout(reloadMessage, 1000);
    };
    request.open("GET", "https://vs-gate.dei.isep.ipp.pt:26280/cgi-bin/usersOnline.txt", true);
    request.timeout = 5000;
    request.send();
}