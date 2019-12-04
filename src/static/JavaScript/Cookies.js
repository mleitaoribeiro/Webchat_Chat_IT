// Função utilizada para a mensagem de pop up dos cookies:

function cookiePopUp(hideOrshow) {
    if (hideOrshow == 'hide') {
        document.getElementById('cookieConsent').style.display = "none";
    }
    else if(localStorage.getItem("cookiepopupWasShown") == null) {
        localStorage.setItem("cookiepopupWasShown",1);
        document.getElementById('cookieConsent').removeAttribute('style');
    }
}

// Função que faz com que a mensagem de pop up apareça:
window.onload = function () {
    setTimeout(function () {
        cookiePopUp('show');
    }, 0);
};

// Função que faz com que a mensagem de pop up desapareça após input do utilizador:
function hideNow(e) {
    if (e.target.id == 'cookieConsent')
        document.getElementById('cookieConsent').style.display = 'none';
}

