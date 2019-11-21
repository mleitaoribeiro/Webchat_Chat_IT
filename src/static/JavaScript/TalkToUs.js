function sendEmail() {
    var confirmed = "Form sent. We'll get back at you as soon as possible."
    var noField = "It looks like you forgot something."

    var fname = document.getElementById("fname").value;
    var email = document.getElementById("email").value;
    var topic = document.getElementById("Topic").value;
    var message = document.getElementById("Message").value;
    var TaC = false;
    if (document.getElementById("TermsAndConditions").checked === true) {TaC = true;}

    var allTrue = false;
    if (fname === "" || message === "" || TaC !== true || email === "") {alert(noField)}
       else allTrue = true;

    if (allTrue === true) {
        var corpoEmail = "Subject: " + topic + ".  Sent from: " + fname + ", at " + email + ";  The message is: '" + message + "'";
        var request = new XMLHttpRequest();
        request.open("POST", "http://vs280.dei.isep.ipp.pt/cgi-bin/sendEmail", true);
        request.send(corpoEmail);
        alert(confirmed);
    }


}
