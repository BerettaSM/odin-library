function writeToStorage(key, data) {
    window.localStorage.setItem(key, JSON.stringify(data));
}

function readFromStorage(key) {
    return JSON.parse(window.localStorage.getItem(key));
}
