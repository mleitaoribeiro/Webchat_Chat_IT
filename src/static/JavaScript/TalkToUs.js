function sendEmail() {
    var fname = document.getElementById("fname").value;
    var email = document.getElementById("email").value;
    var topic = document.getElementById("Topic").value;
    var message = document.getElementById("Message").value;
    var corpoEmail =fname + email + topic + message;
    var request = new XMLHttpRequest();
    request.open("POST", "http://vs280.dei.isep.ipp.pt/cgi-bin/sendEmail", true);
    request.send(corpoEmail);
}
