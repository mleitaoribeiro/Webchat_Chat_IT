// Função que simula click no #sendButton após pressionar Enter:
function enterToSend() {
    var input = document.getElementById("userTextInput");
    input.addEventListener("keydown", function (event) {
        if (event.key == "Enter") {
            event.preventDefault();
            document.getElementById("sendButton").click();
        }
    });
}

// Função para apagar caixa de input do utilizador (#userTextInput):
function clearInputText() {
    document.getElementById("userTextInput").value = "";
}

// Restrição de inputs na caixa de input do utilizador (#userTextInput):
function blockSpecialChar(event) {
    var k;
    document.all ? k = event.keyCode : k = event.which;
    return ((k != 58) && (k != 59) && (k != 60) && (k != 62) && (k != 124) && (k != 91) && (k != 93));
}

// Função para reload das mensagens na outputBox sincronizando-as com o ficheiro responseText presente no servidor:
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
    request.open("GET", "http://vs280.dei.isep.ipp.pt/cgi-bin/outputBox", true);
    request.timeout = 5000;
    request.send();
}

// Função que envia as mensagens para o srvidor a partir da caixa de input (#userTextInput):
function sendMessage() {
    var userTextInput = document.getElementById("userTextInput").value;
    var request = new XMLHttpRequest();
    request.open("POST", "http://vs280.dei.isep.ipp.pt/cgi-bin/outputBox", true);
    request.send(userTextInput);
}