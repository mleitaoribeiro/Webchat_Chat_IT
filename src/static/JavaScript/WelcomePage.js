// Função que valida nickname introduzido no #nickname e que guarda no sistema o nickname num ficheiro do servidor (userLogin.log):
function loginUser() {
    var nickname = document.getElementById("nickname").value;
    localStorage.setItem( 'nickname', nickname );
    var request = new XMLHttpRequest();
    request.onreadystatechange = function login () {
        if (this.readyState === 4 && this.status === 200) {
            window.location.href = "http://localhost:63342/web_chat_scomred/src/RoomsPage.html"; ///NAO ESQUECER QUE TEM SE MUDAR!!!!!!!!!!!
        }
        else {
            document.getElementById("errorMessage").innerHTML = this.response;
        }
    };
    request.ontimeout = function timeoutCase() {
        document.getElementById("errorMessage").innerHTML = "Still trying ...";
        setTimeout(reloadRoom, 500);
    };
    request.onerror = function onError () {
        document.getElementById("errorMessage").innerHTML = "Still trying ...";
        setTimeout(reloadRoom, 500);
    };
    request.open ("PUT" , "https://vs-gate.dei.isep.ipp.pt:26280/cgi-bin/usersLogin", true); //MUDAR QUANDO FOR PARA O SERVIDOR
    request.timeout = 5000;
    request.send(nickname);
}

function validateLogin(){
    var e = event || window.event;
    var key = e.keyCode || e.which;
    if ((key < 48) || (key >= 58) && (key <= 64) || (key >= 91) && (key <= 96) || (key > 122) && (key < 199) || (key > 199)) {
        if (e.preventDefault) e.preventDefault();
        e.returnValue = false;
    }
}

function enterToSubmitNickname() {
    var input = document.getElementById("nickname");
    input.addEventListener("keydown", function (event) {
        if (event.key === "Enter" && document.getElementById("nickname").value.length > 1) {
            event.preventDefault();
            document.getElementById("loginButton").click();
        }
    });
}