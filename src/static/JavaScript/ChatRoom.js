// Função que simula click no #sendButton após se pressionar o Enter:
function enterToSend() {
    var input = document.getElementById("userTextInput");
    input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("sendButton").click();
        }
    });
}

// Função para limpar caixa de input do utilizador após este enviar mensagem(#userTextInput):
function clearInputText() {
    document.getElementById("userTextInput").value = "";
}

// Função que limpa a caixa de texto onde se introduz o nome da room, após este ser utilizado:
function clearRoomInputText() {
    document.getElementById("joinChatroom").value = "";
}

// Restrição de certos caractéres na caixa de input do utilizador (#userTextInput):
function blockSpecialChar(event) {
    var k;
    document.all ? k = event.keyCode : k = event.which;
    return ((k !== 60) && (k !== 62) && (k !== 124) && (k !== 91) && (k !== 93));
}

// Se não estivermos a aceder a nenhuma Room, acede por omissão á Main Room:
var joinChatroom = "MainRoom";

// Função que chama outras funções necessárias para quando se entra numa nova chatroom :
function setJoinChatroom(room) {
    joinChatroom = room;
    reloadRoom();
    activeRoomButton();
    scrollDown();
}

// Função que gere o aparecimento e desaparecimento dos botões com os nomes das rooms:
function activeRoomButton() {
    document.getElementById('MainRoom').classList.remove("activeRoom");
    document.getElementById('Just4Fun').classList.remove("activeRoom");
    document.getElementById('BashtardsOnly').classList.remove("activeRoom");
    document.getElementById('YouShellNotPass').classList.remove("activeRoom");
    document.getElementById(joinChatroom).classList.add("activeRoom");
}

// Javascript para a funcionalidade dos emojis (open source: https://github.com/joeattardi/emoji-button):
function Emojis() {
    var input = document.querySelector("#userTextInput");
    var button = document.querySelector("#emojiButton");
    var picker = new EmojiButton({
        position: 'top-end',
        autoHide: (false),
        showSearch: (false),
        showPreview: (false),
        showRecents: (false)
    })
    picker.on('emoji', function (emoji) {
        input.value += emoji;
    })
    button.addEventListener('click', () => {
        picker.pickerVisible ? picker.hidePicker() : picker.showPicker(button)
    })
}

//torna visivel o Room selecionado no campo Join ChatRoom:
function makeRoomVisible() {
    //Colocar uma sala visivel
    document.getElementById(joinChatroom).style.display = "inline-block";
}

//função que através do input do Room do utlizador muda o Room, gera os botões de acesso a cada Room e dá erro se o Room
//não existir :
function enterChatRoomByInput() {
    if (document.getElementById('joinChatroom').value === "BashtardsOnly") {
        joinChatroom = 'BashtardsOnly';
        reloadRoom();
        makeRoomVisible();
        document.getElementById("errorRoomMessage").innerHTML = "";
    } else if (document.getElementById('joinChatroom').value === "YouShellNotPass") {
        joinChatroom = 'YouShellNotPass';
        reloadRoom();
        makeRoomVisible();
        document.getElementById("errorRoomMessage").innerHTML = "";
    } else if (document.getElementById('joinChatroom').value === "Just4Fun") {
        joinChatroom = 'Just4Fun';
        reloadRoom();
        makeRoomVisible();
        document.getElementById("errorRoomMessage").innerHTML = "";
    }
    //gera erro se não existir o Room selecionado
    else {
        document.getElementById("errorRoomMessage").innerHTML = "<p><i class='fas fa-exclamation-circle'></i> Invalid Room!</p>";
    } clearRoomInputText(); activeRoomButton(); scrollDown();
}

// Função para reload das mensagens na outputBox do MainRoom ou de uma Room selecionada:
function reloadRoom() {
    var nickname = document.getElementById("usernameDisplay").innerText;
    var request = new XMLHttpRequest();
    request.onload = function upDate() {
        if (this.status === 403 && nickname !== "Loading...") {
            window.location.href = "http://localhost:63342/web_chat_scomred/src/WelcomePage.html"; //MUDAR QUANDO FOR PARA O SERVIDOR
        }
        else {
            document.getElementById("outputBox").innerHTML = this.responseText;
        }
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
    //acede à Room pretendida através de query-string:
    request.open("GET", "https://vs-gate.dei.isep.ipp.pt:26280/cgi-bin/changeRooms?room=" + joinChatroom
        + "&nickname=" + nickname, true); //MUDAR QUANDO FOR PARA O SERVIDOR
    request.timeout = 5000;
    request.send();
}

//Função para o scrolldown da outputBox:
function scrollDown() {
    setTimeout(
        function actualScrollDown() {
            //Fazer scroll-down a cada nova mensagem:
            var elem = document.getElementById('outputBox');
            elem.scrollTop = elem.scrollHeight;}
        , 900);
    }

// Função que envia as mensagens para o servidor (ficheiro do room escolhido) a partir da caixa de input (#userTextInput):
function sendMessage() {
    var nickname = document.getElementById("usernameDisplay").innerText;
    console.log(nickname);
    var userTextInput = document.getElementById("userTextInput").value;
    var request = new XMLHttpRequest();
    // quando se escreve uma mensagem, gera um erro:
    request.onreadystatechange = function sendMessage () {
        document.getElementById("errorUserInputMessage").innerHTML = "";
        //gera erro se não introduzir qualquer mensagem:
        if (this.readyState === 4 && this.status !== 200) {
            document.getElementById("errorUserInputMessage").innerHTML = this.response;
        }
    };
    request.open("POST", "https://vs-gate.dei.isep.ipp.pt:26280/cgi-bin/sendMessages?room=" + joinChatroom
        + "&nickname=" + nickname, true); //MUDAR PARA QUANDO FOR PARA O SERVIDOR
    request.send(userTextInput);
    scrollDown();
}

// Função que permite o display do nickname do presente utilizador.
function displayNickname() {
    document.getElementById("usernameDisplay").innerHTML = localStorage['nickname'];
}

// Função que valida os caractéres que podem ser utilizados para o nome da room onde se pretende entrar:
function validateRoom(){
    var e = event || window.event;
    var key = e.keyCode || e.which;
    if ((key < 48) || (key >= 58) && (key <= 64) || (key >= 91) && (key <= 96) || (key > 122) && (key < 199) || (key > 199)) {
        if (e.preventDefault) e.preventDefault();
        e.returnValue = false;
    }
}

// Função que faz submit ao nome da room introduzido através do Enter:
function enterToSubmitRoom() {
    var input = document.getElementById("joinChatroom");
    input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("joinRoomButton").click();
            clearRoomInputText();
        }
    });
}

// Funções utilizadas para o Darkmode:
var color = "white";

function changeVarForColorMode() {
    if(color === "white"){
        color = "black";
        document.getElementById("changemode").innerText = "Change to lightmode";
    }
    else {
        color = "white";
        document.getElementById("changemode").innerText = "Change to darkmode";
    }
}

// Função utilizada para alterar o Lightmode para Darkmode e vice-versa:
function changeColorMode() {
    var theme=document.getElementById('lightRoom');

    if(color === "white") theme.href="static/CSS/DarkRoom.css"; //MUDAR QUANDO FOR PARA O SERVIDOR
    else theme.href="static/CSS/ChatRoomsPage.css"; //MUDAR QUANDO FOR PARA O SERVIDOR
}
