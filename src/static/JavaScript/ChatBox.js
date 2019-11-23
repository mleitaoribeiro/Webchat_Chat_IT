// Função que simula click no #sendButton após se pressionar o Enter:
function enterToSend() {
    var input = document.getElementById("userTextInput");
    input.addEventListener("keydown", function (event) {
        if (event.key === "Enter" && document.getElementById("userTextInput").value !== "") {
            event.preventDefault();
            document.getElementById("sendButton").click();
        }
    });
}

// Função para limpar caixa de input do utilizador após este enviar mensagem(#userTextInput):
function clearInputText() {
    document.getElementById("userTextInput").value = "";
}

// Restrição de certos caractéres na caixa de input do utilizador (#userTextInput):
function blockSpecialChar(event) {
    var k;
    document.all ? k = event.keyCode : k = event.which;
    return ((k != 58) && (k != 59) && (k != 60) && (k != 62) && (k != 124) && (k != 91) && (k != 93));
}

var joinChatroom = "MainRoom"

// Função para reload das mensagens na outputBox do MainRoom ou de uma Room selecionada
function reloadRoom() {
    joinChatroom = document.getElementById("joinChatroom").value;
    var request = new XMLHttpRequest();
    request.onload = function upDate() {
        document.getElementById("outputBox").innerHTML = this.responseText;
        setTimeout(reloadRoom, 100);
    };
    request.ontimeout = function timeoutCase() {
        document.getElementById("outputBox").innerHTML = "Still trying ...";
        setTimeout(reloadRoom, 100);
    };
    //gerar erro quando não são cumpridos os requsitos de acesso e quando está em overload
    request.onerror = function onError () {
        console.log("Error")
        /*document.getElementById("errorRoomMessage").innerHTML = "<p><i class='fas fa-exclamation-circle'>" +
            "</i>Invalid Room!<p>";*/
    };
    // se não estivermos a aceder a nenhuma Room, cede por omissão à Main Room
    if (joinChatroom === "") {
        joinChatroom = "MainRoom";
    }
    //acede à Room pretendida através de query-string
    request.open("GET", "https://vs280.dei.isep.ipp.pt/cgi-bin/changeRooms?room=" + joinChatroom, true);
    request.timeout = 500;
    request.send();
    //limpa o erro criado quando está tudo bem
    //document.getElementById("errorRoomMessage").innerHTML = "";

    //Fazer scroll-down a cada nova mensagem:
    var elem = document.getElementById('outputBox');
    elem.scrollTop = elem.scrollHeight;
}

// Função que envia as mensagens para o servidor (ficheiro do room escolhido) a partir da caixa de input (#userTextInput):
function sendMessage() {
    var userTextInput = document.getElementById("userTextInput").value;
    var request = new XMLHttpRequest();
    // quando se escreve uma mensagem, gera um erro
    request.onreadystatechange = function sendMessage () {
        /*if (this.readyState == 4 && this.status != 200) {
            document.getElementById("errorUserInputMessage").innerHTML = this.response;
        }*/
    };
    request.open("POST", "http://vs280.dei.isep.ipp.pt/cgi-bin/sendMessages?room=" + joinChatroom, true);
    request.send(userTextInput);
}