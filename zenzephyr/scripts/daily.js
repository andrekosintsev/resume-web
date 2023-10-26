//let tg = window.Telegram.WebApp;

//tg.expand();
//tg.MainButton.hide();

function getQueryParam(name) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get(name);
}

document.addEventListener("DOMContentLoaded", function() {
    const encodedJsonData = getQueryParam("json_data");

    if (encodedJsonData) {
        const jsonData = decodeURIComponent(encodedJsonData);
        const fixedJson = jsonData.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":');
        const jsonObject = JSON.parse(fixedJson);
        populateFormForEditing(jsonObject);
    } else {


    }
});