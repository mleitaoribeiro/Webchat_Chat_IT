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
function loginUser () {
    var nickname = document.getElementById("nickname").value;
    var request = new XMLHttpRequest();
    request.reload = function(){
        if(this.response == "True") {
            window.location.href = "#RoomsPage.html";
        }
        else {
            document.getElementById("errorMessage").innerHTML = this.response;
        }
    };
    request.open ("PUT" , "https://vs280.dei.isep.ipp.pt/cgi-bin/usersLogin", true);
    request.send(nickname);
}
