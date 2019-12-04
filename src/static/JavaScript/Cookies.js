function cookiePopUp(hideOrshow) {
    if (hideOrshow == 'hide') {
        document.getElementById('cookieConsent').style.display = "none";
    }
    else if(localStorage.getItem("cookiepopupWasShown") == null) {
        localStorage.setItem("cookiepopupWasShown",1);
        document.getElementById('cookieConsent').removeAttribute('style');
    }
}

window.onload = function () {
    setTimeout(function () {
        cookiePopUp('show');
    }, 0);
};

function hideNow(e) {
    if (e.target.id == 'cookieConsent')
        document.getElementById('cookieConsent').style.display = 'none';
}

