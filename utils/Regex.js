const usernameRe = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
const emailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRe = [];
const URLRe = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

const isValidUsername = (username) => {
    return usernameRe.test(String(username).toLowerCase());
}

const isValidEmail = (email) => {
    return emailRe.test(String(email).toLowerCase());
}
// TODO Complete
const isValidPassword = (password) => {
    return passwordRe.test(String(password));
}

const isValidURL = (url) => {
    return URLRe.test(url.toString());
}

module.exports = {
    isValidUsername,
    isValidEmail,
    isValidPassword,
    isValidURL
}
