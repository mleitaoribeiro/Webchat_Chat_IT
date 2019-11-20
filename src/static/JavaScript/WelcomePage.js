
function loginUser() {
    var nickname = document.getElementById("nickname").value;
    console.log(nickname);
    var request = new XMLHttpRequest();
    request.onload = function() {
        if (this.readyState == 4 && this.status != 200) {
            document.getElementById("errorMessage").innerHTML = "<p><i class='fas fa-exclamation-circle' " +
                "style=font-size:15px;></i> This nickname already exists. Please enter a new one!</p>";
        }
    };
    request.open("PUT", "https://vs280.dei.isep.ipp.pt/cgi-bin/usersLogin", true);
    request.send(nickname);
}