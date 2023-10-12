let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.setText("Сохранить фильтр");
tg.MainButton.show();

function getQueryParam(name) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get(name);
}

const encodedJsonData = getQueryParam("json_data");

if (encodedJsonData) {
    const jsonData = decodeURIComponent(encodedJsonData);
    const fixedJson = jsonData.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":');
    const jsonObject = JSON.parse(fixedJson);
    jsonObject.forEach(item => {
        addFilterEntry(item);
    });
}

Telegram.WebApp.onEvent("mainButtonClicked", function() {
    if (validateInput(['dDate'])) {
        return;
    }
    tg.sendData(JSON.stringify({
        filters: [{
                     dCountry: document.getElementById('dCountry').value,
                     dCity: document.getElementById('dCity').value,
                     aCountry: document.getElementById('aCountry').value,
                     aCity: document.getElementById('aCity').value,
                     dDate: document.getElementById('dDate').value
        }]
    }));
    tg.close();
});