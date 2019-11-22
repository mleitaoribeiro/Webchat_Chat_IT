// Função que guarda o nickname introduzido num ficheiro do servidor (userLogin):
/*function bla() {
    var nickname = document.getElementById("nickname").value;
    console.log(nickname);
    var request = new XMLHttpRequest();
    request.onload = function() {
        if (this.readyState == 4 && this.status != 200) {
            document.getElementById("errorMessage").innerHTML = this.response;
        }
    };
    request.open("POST", "http://vs280.dei.isep.ipp.pt/cgi-bin/usersLogin", true);
    request.send(nickname);
}*/

// Função que valida nickname introduzido no #nickname:
function loginUser() {
    console.log("True");
    var nickname = document.getElementById("nickname").value;
    var request = new XMLHttpRequest();
    /*request.onload = function Login () {
        if () {
            console.log("Response is " + this.response);
            window.location.href = "http://localhost:63342/web_chat_scomred/src/RoomsPage.html"; ///NAO ESQUECER QUE TEM SE MUDAR!!!!!!!!!!!
        }
        else {
            document.getElementById("errorMessage").innerHTML = this.response;
        }
    };*/
    request.open ("PUT" , "https://vs280.dei.isep.ipp.pt/cgi-bin/usersLogin", true);
    request.send(nickname);
}
