
function loginUser() {
    var loginButton = document.getElementById("loginButton").value;
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status != 200) {
            document.getElementById("errorMessage").innerHTML = "This nickname already exists. Please enter a new one!";
        }
    };
    request.open("PUT", "https://vs280.dei.isep.ipp.pt/cgi-bin/users", true);
    request.send(loginButton);
}