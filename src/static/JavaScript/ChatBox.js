
// Função para carregar no botão "sendButton" ao carregar no Enter:
function enterToSend() {
    var input = document.getElementById("userTextInput");
    input.addEventListener("keydown", function(event) {
        if (event.key == "Enter") {
            event.preventDefault();
            document.getElementById("sendButton").click();
        }
    });
}
// Função para apagar caixa de texto do input do utilizador:
function clearInputText(){
    document.getElementById("userTextInput").value = "";
}
// Função para colocar os emojis na textbox (JQuery) :
function addEmojis(){
    $(document).ready(function() {
        $("#emojiDiv").emojioneArea();
    });
}

// Função para reload das mensagens na outputBox sincronizando-as com o ficheiro responseText presente no servidor.
function reloadMessage() {
    var request = new XMLHttpRequest();
    request.onload = function upDate() {
        document.getElementById("outputBox").innerHTML = this.responseText;
        setTimeout(reloadMessage, 500);
    };
    request.ontimeout = function timeoutCase() {
        document.getElementById("outputBox").innerHTML = "Still trying ...";
        setTimeout(reloadMessage, 1000);
    };
    request.open("GET", "https://vs280.dei.isep.ipp.pt/cgi-bin/outputBox", true);
    request.timeout = 5000;
    request.send();
}

// Função que envia as mensagens para o srvidor a partir da barra de input: userTextInput.
function sendMessage () {
    var userTextInput = document.getElementById("userTextInput").value;
    var request = new XMLHttpRequest();
    request.open("POST", "https://vs280.dei.isep.ipp.pt/cgi-bin/outputBox", true);
    request.send(userTextInput);
}