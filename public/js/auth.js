/**
 * Sets the loggedIn cookie to true.
 */
function setLoggedIn() {
    Cookies.set('loggedIn', 'true');
}

/**
 * Sets the loggedIn cookie to false.
 */
function setLoggedOut() {
    Cookies.set('loggedIn', 'false');
}

/**
 * 
 * @returns {boolean} true if the user is logged in, false otherwise
 */
function isLoggedIn() {
    return Cookies.get('loggedIn') === 'true';
}

/**
 * Checks if the user is logged in and redirects to the login page if not.
 */
function auth() {
    if (!isLoggedIn()) {
        window.location.href = "/login-page";
    }
}
