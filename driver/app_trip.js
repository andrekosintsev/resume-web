let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.setText("Добавить поездку");

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
    if (validateInput(['d_country', 'd_city','a_country', 'a_country', 'a_city', 'd_date','d_time', 'count'])) {
        return;
    }
    tg.sendData(JSON.stringify({
        trips: [{
                    d_country: document.getElementById('d_country').value,
                    d_city: document.getElementById('d_city').value,
                    a_country: document.getElementById('a_country').value,
                    a_city: document.getElementById('a_city').value,
                    d_date: document.getElementById('d_date').value,
                    d_time: document.getElementById('d_time').value,
                    price: document.getElementById('price').value,
                    count: document.getElementById('count').value
        }]
    }));
    tg.close();
});