let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.setText("Добавить поездку");
tg.MainButton.show();

function getQueryParam(name) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get(name);
}
let initDataUnsafe = tg.initDataUnsafe;
let userData = tg.initDataUnsafe.user;

const encodedJsonData = getQueryParam("json_data");

if (encodedJsonData) {
    const jsonData = decodeURIComponent(encodedJsonData);
    const fixedJson = jsonData.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":');
    const jsonObject = JSON.parse(fixedJson);
}
Telegram.WebApp.onEvent("mainButtonClicked", function() {
    tg.showPopup({
        title: 'Сохранение поездки',
        message: 'Вы уверены в правильности заполнении информации о поездке?',
        buttons: [{
            id: 'delete',
            type: 'destructive',
            text: 'Сохранить'
        }, {
            type: 'cancel'
        }, ]
    }, function(buttonId) {
        if (buttonId === 'delete') {
            const data = {
                d_country: document.getElementById('d_country').value,
                d_city: document.getElementById('d_city').value,
                a_country: document.getElementById('a_country').value,
                a_city: document.getElementById('a_city').value,
                d_date: document.getElementById('d_date').value,
                price: document.getElementById('price').value,
                count: document.getElementById('count').value
            };
            fetch('https://httpbin.org/post?userId='+`${userData.id }`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }).then(response => response.json())
                .then(responseData => {
                    tg.close();
                }).catch(error => {});
        }
    });
});