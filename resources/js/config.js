import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css'; // Ensure the CSS is imported

function showLoader() {
    document.getElementById('loader').classList.remove('d-none');
}

function hideLoader() {
    document.getElementById('loader').classList.add('d-none');
}

function successToast(msg) {
    Toastify({
        gravity: "bottom", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        text: msg,
        className: "mb-5",
        style: {
            background: "green",
        }
    }).showToast();
}

function errorToast(msg) {
    Toastify({
        gravity: "bottom", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        text: msg,
        className: "mb-5",
        style: {
            background: "red",
        }
    }).showToast();
}

window.showLoader = showLoader;
window.hideLoader = hideLoader;
window.successToast = successToast;
window.errorToast = errorToast;