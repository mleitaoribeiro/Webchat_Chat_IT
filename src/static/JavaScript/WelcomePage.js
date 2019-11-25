// Função que valida nickname introduzido no #nickname e que guarda no sistema o nickname num ficheiro do servidor (userLogin.log):
function loginUser() {
    var nickname = document.getElementById("nickname").value;
    var request = new XMLHttpRequest();
    request.onreadystatechange = function Login () {
        if (this.readyState === 4 && this.status === 200) {
            window.location.href = "http://localhost:63342/web_chat_scomred/src/RoomsPage.html"; ///NAO ESQUECER QUE TEM SE MUDAR!!!!!!!!!!!
        }
        else {
            document.getElementById("errorMessage").innerHTML = this.response;
        }
    };
    request.open ("PUT" , "https://vs280.dei.isep.ipp.pt/cgi-bin/usersLogin", true);
    request.send(nickname);
}

function validateLogin(){
    var e = event || window.event;
    var key = e.keyCode || e.which;
    if ((key >= 32) && (key <= 47) || (key >= 58) && (key <= 64) || (key >= 91) && (key <= 96) || (key >= 123)){
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