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

// se não estivermos a aceder a nenhuma Room, acede por omissão à Main Room
var joinChatroom = "MainRoom";

// set variable joinChatroom
function setJoinChatroom(room) {
    joinChatroom = room;
}

function makeRoomVisible() {
    //Colocar uma sala visivel
    document.getElementById(joinChatroom).style.display = "inline-block";
}

function setJoinChatroomByInput() {
    joinChatroom = document.getElementById('joinChatroom').value;
}

// Função para reload das mensagens na outputBox do MainRoom ou de uma Room selecionada
function reloadRoom() {
    var request = new XMLHttpRequest();
    request.onload = function upDate() {
        this.status;
        /*document.getElementById("errorRoomMessage").innerHTML = "<p><i class='fas fa-exclamation-circle'>" +
            "</i>Invalid Room!<p>";*/
        document.getElementById("outputBox").innerHTML = this.responseText;
        setTimeout(reloadRoom, 500);
    };
    request.ontimeout = function timeoutCase() {
        document.getElementById("outputBox").innerHTML = "Still trying ...";
        setTimeout(reloadRoom, 500);
    };
    //gerar erro quando não são cumpridos os requsitos de acesso e quando está em overload
    request.onerror = function onError () {
        document.getElementById("outputBox").innerHTML = "Still trying ...";
        setTimeout(reloadRoom, 500);
    };
    if (joinChatroom === "") {
        joinChatroom = "MainRoom";
    }
    //acede à Room pretendida através de query-string
    request.open("GET", "https://vs-gate.dei.isep.ipp.pt:26280/cgi-bin/changeRooms?room=" + joinChatroom, true);
    request.timeout = 500;
    request.send();
    //limpa o erro criado quando está tudo bem
    //document.getElementById("errorRoomMessage").innerHTML = "";

    //Fazer scroll-down a cada nova mensagem:
    var elem = document.getElementById('outputBox');
    elem.scrollTop = elem.scrollHeight

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
    request.open("POST", "https://vs-gate.dei.isep.ipp.pt:26280/cgi-bin/sendMessages?room=" + joinChatroom, true);
    request.send(userTextInput);
}

function displayNickname() {
    document.getElementById("usernameDisplay").innerHTML = localStorage['nickname'];
}

function enterToSubmitRoom() {
    document.getElementById("joinChatroom").onkeypress=function(e){
        if(e.keyCode === 13){
            document.getElementById("joinRoomButton").click();
        }
    }
}

