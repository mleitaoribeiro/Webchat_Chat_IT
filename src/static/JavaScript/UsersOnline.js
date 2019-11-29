// Função para reload das mensagens na outputBox sincronizando-as com o ficheiro outputBox presente no servidor:
function reloadUserOnline() {
    var request = new XMLHttpRequest();
    request.onload = function upDate() {
        document.getElementById("userList").innerHTML = this.responseText;
        setTimeout(reloadUserOnline, 500);
    };
    request.ontimeout = function timeoutCase() {
        document.getElementById("userList").innerHTML = "Still trying ...";
        setTimeout(reloadUserOnline, 500);
    };
    request.onerror = function onError () {
        document.getElementById("userList").innerHTML = "Still trying ...";
        setTimeout(reloadUserOnline, 500);
    };
    request.open("GET", "https://vs-gate.dei.isep.ipp.pt:26280/cgi-bin/usersOnline", true);
    request.timeout = 5000;
    request.send();
}
function reloadNumberOfOnlineUser() {
        var request = new XMLHttpRequest();
        request.onload = function upDate() {
            document.getElementById("numberOnlineUsers").innerHTML = this.responseText;
            setTimeout(reloadNumberOfOnlineUser, 500);
        };
        request.ontimeout = function timeoutCase() {
            document.getElementById("numberOnlineUsers").innerHTML = "Still trying ...";
            setTimeout(reloadNumberOfOnlineUser, 1000);
        };
        request.onerror = function onError () {
            document.getElementById("numberOnlineUsers").innerHTML = "Still trying ...";
            setTimeout(reloadNumberOfOnlineUser, 500);
        };
        request.open("GET", "https://vs-gate.dei.isep.ipp.pt:26280/cgi-bin/countUserOnline", true);
        request.timeout = 5000;
        request.send();
}

