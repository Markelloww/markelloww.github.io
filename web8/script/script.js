function send(event) {
    event.preventDefault();

    let acceptionEl = document.getElementById("acception");
    if (!acceptionEl.checked) {
        alert("Вы не приняли политичку обработки персональных данных!");
        return false;
    }

    let request = new XMLHttpRequest();
    request.open("POST", "https://formcarry.com/s/Nt3Vrqh1KZs");
    request.setRequestHeader("ACCEPT", "application/json");

    let data = new FormData();

    let inputEls = document.getElementsByClassName("save");
    [...inputEls].forEach(inputEl => {
        data.append(inputEl.id, inputEl.value);
    });

    request.onreadystatechange = () => {
        if (request.readyState === XMLHttpRequest.DONE) {
          const status = request.status;
          if (status === 0 || (status >= 200 && status < 400)) {
            alert("Жалоба была успешно отправлена");
          } else {
            alert("Произошла ошибка: " + status);
          }
        }
    };

    request.send(data);
    [...inputEls].forEach(inputEl => {
        inputEl.value = "";
        localStorage.setItem(inputEl.id, "");
    });

    hide();
}

function show () {
    history.pushState({form: true}, "", "./#form");
    let modal = document.getElementById("modal");
    modal.setAttribute("data--modal", "shown");
}

function hide() {
    history.replaceState({form: false}, "", "./");
    let modal = document.getElementById("modal");
    modal.setAttribute("data--modal", "hidden");
}

function controlModal() {
    if(location.hash == "#form") {
       show();
    }
    else {
       hide();
    }
}

function saveInput(event) {
    localStorage.setItem(event.target.id, event.target.value);
}

document.addEventListener('DOMContentLoaded', function () {
    if (history.state == null) {
        history.pushState({form: false}, "", "./");
    }
    if (history.state.form) {
        show();
    }

    let feedbackButtonEl = document.getElementById("feedback-button");
    feedbackButtonEl.addEventListener('click', show);

    let closeButton = document.getElementById("close-button");
    closeButton.addEventListener("click", hide);

    let inputEls = document.getElementsByClassName("save");

    [...inputEls].forEach(inputEl => {
        inputEl.value = localStorage.getItem(inputEl.id);
    });

    [...inputEls].forEach(inputEl => {
        inputEl.addEventListener("change", saveInput);
    });

    let submitButton = document.getElementById("submit-button");
    submitButton.addEventListener("click", send);
    window.addEventListener("popstate", controlModal);
});