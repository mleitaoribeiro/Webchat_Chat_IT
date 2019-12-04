// Função que atualiza os users nos Online Users sincronizando-as com a pasta Users presente no servidor
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
    request.open("GET", "https://vs-gate.dei.isep.ipp.pt:26280/cgi-bin/usersOnline", true); //MUDAR QUANDO FOR PARA O SERVIDOR
    request.timeout = 5000;
    request.send();
}

// Função que atualiza o número de users presente na pasta Users no servidor e apresenta essa informação no final da
// secção dos Online Users
function reloadNumberOfOnlineUser() {
        var request = new XMLHttpRequest();
        request.onload = function upDate() {
            document.getElementById("numberOnlineUsers").innerHTML = this.responseText;
            setTimeout(reloadNumberOfOnlineUser, 500);
        };
        request.ontimeout = function timeoutCase() {
            document.getElementById("numberOnlineUsers").innerHTML = "0";
            setTimeout(reloadNumberOfOnlineUser, 500);
        };
        request.onerror = function onError () {
            document.getElementById("numberOnlineUsers").innerHTML= "0";
            setTimeout(reloadNumberOfOnlineUser, 500);
        };
        request.open("GET", "https://vs-gate.dei.isep.ipp.pt:26280/cgi-bin/countUserOnline", true); //MUDAR QUANDO FOR PARA O SERVIDOR
        request.timeout = 5000;
        request.send();
}

