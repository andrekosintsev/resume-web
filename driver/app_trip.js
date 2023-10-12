let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.setText("Добавить поездку");
tg.MainButton.show();

let deleteButton = document.getElementById("delete-button");

document.addEventListener("DOMContentLoaded", function() {
    const encodedJsonData = getQueryParam("json_data");

    if (encodedJsonData) {
        tg.MainButton.setText("Сохранить изменения");
        const jsonData = decodeURIComponent(encodedJsonData);
        const fixedJson = jsonData.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":');
        const jsonObject = JSON.parse(fixedJson);
        populateFormForEditing(jsonObject);
        toggleDeleteButton(true);
    } else {
        toggleDeleteButton(false);
    }
});

document.getElementById('count').addEventListener('input', function() {
    const value = parseInt(this.value);
    if (value < 1) {
        this.value = '1';
    } else if (value > 10) {
        this.value = '10';
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
    document.getElementById('price').value = entry.price || "";
    document.getElementById('count').value = entry.count || "";
    document.getElementById('currency').value = entry.currency || "";
}

deleteButton.addEventListener("click", function() {
    tg.showPopup({
        title: 'Удаление',
        message: 'Вы уверены, что хотите удалить поездку?',
        buttons: [{
            id: 'delete',
            type: 'destructive',
            text: 'Конечно удалить'
        }, {
            type: 'cancel',
            text: 'Отмена'
        }, ]
    }, function(buttonId) {
        if (buttonId === 'delete') {
            tg.sendData(JSON.stringify({
                del_element: {
                    trip_id: document.getElementById('id').value
                }
            }));
            tg.close();
        }
    });
});

Telegram.WebApp.onEvent("mainButtonClicked", function() {
    if (validateInput(['dDate', 'price', 'count','currency'])) {
            document.getElementById("message").textContent = "Необходимо заполнить все обязательные поля";
            return;
        }
    if (tg.MainButton.text ==="Сохранить изменения") {
        update();
    } else {
        save();
    }
});

function update() {
    if (validateInput(['dDate', 'price', 'count','currency'])) {
        return;
    }
    tg.sendData(JSON.stringify({
        trip: {
            id: document.getElementById('id').value,
            dCountry: document.getElementById('dCountry').value,
            dCity: document.getElementById('dCity').value,
            aCountry: document.getElementById('aCountry').value,
            aCity: document.getElementById('aCity').value,
            dDate: document.getElementById('dDate').value,
            price: document.getElementById('price').value,
            count: document.getElementById('count').value,
            currency: document.getElementById('currency').value
        }
    }));
    tg.close();
}

function save() {
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
                dCountry: document.getElementById('dCountry').value,
                dCity: document.getElementById('dCity').value,
                aCountry: document.getElementById('aCountry').value,
                aCity: document.getElementById('aCity').value,
                dDate: document.getElementById('dDate').value,
                price: document.getElementById('price').value,
                count: document.getElementById('count').value,
                currency: document.getElementById('currency').value
            };
            fetch('https://httpbin.org/post?userId=' + `${userData.id }`, {
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
}