//função que me envia um email para com o conteúdo recebido no formulário Talk to Us.
function sendEmail() {
    var confirmed = "Form sent. We'll get back at you as soon as possible."
    var noField = "It looks like you forgot something."
    var falseEmail = "You need to enter a valid email."
    var fname = document.getElementById("fname").value;
    var email = document.getElementById("email").value;
    var topic = document.getElementById("Topic").value;
    var message = document.getElementById("Message").value;
    var TaC = false;
    if (document.getElementById("TermsAndConditions").checked === true) {TaC = true;}

    var emailLegit = confirmEmail(email);
    if (email !== "" && emailLegit === false) {alert(falseEmail)}

    var allTrue = false;
    if (fname === "" || message === "" || TaC !== true || email === "") {alert(noField)}
       else allTrue = true;

    if (allTrue === true && emailLegit === true) {
        var corpoEmail = "Subject: " + topic + ".  Sent from: " + fname + ", at " + email + ";  The message is: '" + message + "'";
        var request = new XMLHttpRequest();
        request.open("POST", "https://vs-gate.dei.isep.ipp.pt:26280/cgi-bin/sendEmail", true); //MUDAR QUANDO FOR PARA O SERVIDOR
        request.send(corpoEmail);
        alert(confirmed);
    }
}

//função que valida o e-mail, caso seja composto pelos caractéres (e ordem) necessários.
function confirmEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return true;
    }
    else return false;
}
