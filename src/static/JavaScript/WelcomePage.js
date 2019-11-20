// Função que guarda o nickname introduzido num ficheiro do servidor (userLogin):
function loginUser() {
    var nickname = document.getElementById("nickname").value;
    console.log(nickname);
    var request = new XMLHttpRequest();
    request.onload = function () {
        if (this.readyState == 4 && this.status != 200) {
            document.getElementById("errorMessage").innerHTML = this.response;
        }
    };
    request.open("PUT", "http://vs280.dei.isep.ipp.pt/cgi-bin/userLogin", true);
    request.send(nickname);
}