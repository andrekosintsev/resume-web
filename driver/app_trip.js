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
let chatData = tg.initDataUnsafe.chat;
let usercard = document.getElementById("usercard"); //Используем getElementById, чтобы получить карточку пользователя

let queryId = document.createElement('p');
queryId.innerText = `${initDataUnsafe.query_id}`;
usercard.appendChild(queryId);

if (userData) {
    let userNames = document.createElement('p');
    userNames.innerText = `${userData.first_name }`;
    usercard.appendChild(userNames);
}
if (chatData) {
    let chatInfo = document.createElement('p');
    chatInfo.innerText = `${chatData.id }`;
    usercard.appendChild(chatInfo);
}


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
                /*JSON.stringify({
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
                    })*/
                tg.close();
            }
        });
});