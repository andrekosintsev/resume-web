let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.setText("Добавить фильтр");
tg.MainButton.show();

let deleteButton = document.getElementById("delete-button");

const tokenJson = getQueryParam("token");
if(tokenJson) {
        const decodedToken = decodeURIComponent(tokenJson);
        const fixedTokenJson = decodedToken.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":');
        const tokenObject = JSON.parse(fixedTokenJson);
        token = btoa([tokenObject.userId,tokenObject.id,tg.initDataUnsafe.query_id].join(' '));
        document.getElementById('token').value = token;
}

document.addEventListener("DOMContentLoaded", function() {
    const encodedJsonData = getQueryParam("json_data");

    if (encodedJsonData) {
        tg.MainButton.hide();
        const jsonData = decodeURIComponent(encodedJsonData);
        const fixedJson = jsonData.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":');
        const jsonObject = JSON.parse(fixedJson);
        populateFormForEditing(jsonObject);
        toggleDeleteButton(true);
    } else {
        toggleDeleteButton(false);
    }
});

function getQueryParam(name) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get(name);
}
let initDataUnsafe = tg.initDataUnsafe;
let userData = tg.initDataUnsafe.user;

function toggleDeleteButton(showButton) {
    if (showButton) {
        deleteButton.style.display = "block"; // Show the button
    } else {
        deleteButton.style.display = "none"; // Hide the button
    }
}


// Function to populate the award form with data for editing
function populateFormForEditing(entry) {
    document.getElementById('id').value = entry.id || "";
    document.getElementById('dCountry').value = entry.dCountry || "";
    document.getElementById('dCountry').disabled = true;
    document.getElementById('dCity').value = entry.dCity || "";
    document.getElementById('dCity').disabled = true;
    document.getElementById('aCountry').value = entry.aCountry || "";
    document.getElementById('aCountry').disabled = true;
    document.getElementById('aCity').value = entry.aCity || "";
    document.getElementById('aCity').disabled = true;
    document.getElementById('dDate').value = entry.dDate || "";
    document.getElementById('dDate').disabled = true;
    document.getElementById('package').value = entry.package || "";
    document.getElementById('package').disabled = true;
}

deleteButton.addEventListener("click", function() {
    tg.showPopup({
        title: 'Удаление',
        message: 'Вы уверены, что хотите удалить фильтр?',
        buttons: [{
            id: 'delete',
            type: 'destructive',
            text: 'Удалить'
        }, {
            type: 'cancel',
            text: 'Отмена'
        }, ]
    }, function(buttonId) {
        if (buttonId === 'delete') {
            tg.sendData(JSON.stringify({
                del_element: {
                    filter_id: document.getElementById('id').value
                }
            }));
            tg.close();
        }
    });
});

Telegram.WebApp.onEvent("mainButtonClicked", function() {
    tg.showPopup({
            title: 'Сохранение фильтра',
            message: 'Вы уверены в правильности заполнении информации?',
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
                    dCountry: document.getElementById('dCountry').value,
                    dCity: document.getElementById('dCity').value,
                    aCountry: document.getElementById('aCountry').value,
                    aCity: document.getElementById('aCity').value,
                    dDate: document.getElementById('dDate').value,
                    package: document.getElementById('package').checked,
                    token: document.getElementById('token').value
                };
                fetch('https://tdriver-service.kvadsoft.de/create', {
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
