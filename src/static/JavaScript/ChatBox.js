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
    return ((k !== 60) && (k !== 62) && (k !== 124) && (k !== 91) && (k !== 93));
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

// function setJoinChatroomByInput() {
//     joinChatroom = document.getElementById('joinChatroom').value;
// }

//função que através do input do Room do utlizador muda o Room, gera os botões de acesso a cada Room e dá erro se o Room
//não existe
function enterChatRoomByInput() {
    if (document.getElementById('joinChatroom').value === "BashtardsOnly") {
        joinChatroom = 'BashtardsOnly';
        reloadRoom();
        makeRoomVisible()
        document.getElementById("errorRoomMessage").innerHTML = "";
    } else if (document.getElementById('joinChatroom').value === "YouShellNotPass") {
        joinChatroom = 'YouShellNotPass';
        reloadRoom();
        makeRoomVisible()
        document.getElementById("errorRoomMessage").innerHTML = "";
    }
    else if (document.getElementById('joinChatroom').value === "Just4Fun") {
        joinChatroom = 'Just4Fun';
        reloadRoom();
        makeRoomVisible()
        document.getElementById("errorRoomMessage").innerHTML = "";
    }
    else {
        document.getElementById("errorRoomMessage").innerHTML = "<p><i class='fas fa-exclamation-circle'></i> Invalid Room!</p>";
    }
}

// Função para reload das mensagens na outputBox do MainRoom ou de uma Room selecionada
function reloadRoom() {
    var request = new XMLHttpRequest();
    request.onload = function upDate() {
        document.getElementById("outputBox").innerHTML = this.responseText;
        setTimeout(reloadRoom, 500);
    };
    request.ontimeout = function timeoutCase() {
        document.getElementById("outputBox").innerHTML = "Still trying ...";
        setTimeout(reloadRoom, 500);
    };
    request.onerror = function onError () {
        document.getElementById("outputBox").innerHTML = "Still trying ...";
        setTimeout(reloadRoom, 500);
    };
    //acede à Room pretendida através de query-string
    request.open("GET", "https://vs-gate.dei.isep.ipp.pt:26280/cgi-bin/changeRooms?room=" + joinChatroom, true);//MUDAR
    request.timeout = 5000;
    request.send();

    //Fazer scroll-down a cada nova mensagem:
    var elem = document.getElementById('outputBox');
    elem.scrollTop = elem.scrollHeight;
}

// Função que envia as mensagens para o servidor (ficheiro do room escolhido) a partir da caixa de input (#userTextInput):
function sendMessage() {
    var nickname = document.getElementById("usernameDisplay").innerText;
    console.log(nickname);
    var userTextInput = document.getElementById("userTextInput").value;
    var request = new XMLHttpRequest();
    // quando se escreve uma mensagem, gera um erro
    request.onreadystatechange = function sendMessage () {
        /*if (this.readyState == 4 && this.status != 200) {
            document.getElementById("errorUserInputMessage").innerHTML = this.response;
        }*/
    };
    request.open("POST", "https://vs-gate.dei.isep.ipp.pt:26280/cgi-bin/sendMessages?room=" + joinChatroom //MUDAR PARA QUANDO FOR PARA O SERVIDOR
        + "&nickname=" + nickname, true);
    request.send(userTextInput);
}

function displayNickname() {
    document.getElementById("usernameDisplay").innerHTML = localStorage['nickname'];
}

function validateRoom(){
    var e = event || window.event;
    var key = e.keyCode || e.which;
    if ((key < 48) || (key >= 58) && (key <= 64) || (key >= 91) && (key <= 96) || (key > 122) && (key < 199) || (key > 199)) {
        if (e.preventDefault) e.preventDefault();
        e.returnValue = false;
    }
}

function enterToSubmitRoom() {
    document.getElementById('joinChatroom').onkeydown = function(e){
        if(e.keyCode === 13){
            document.getElementById("joinRoomButton").click();
        }
    };
}

var color = 0;
function changeVarForColorMode() {
    color++;
}

function changeColorMode() {
    var theme=document.getElementById('lightRoom');

    if(color % 2 === 0) theme.href="static/CSS/DarkRoom.css"; //MUDAR QUANDO FOR PARA O SERVIDOR
    else theme.href="static/CSS/RoomsPage.css";//MUDAR QUANDO FOR PARA O SERVIDOR
}


