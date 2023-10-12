let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.setText("Добавить поездку");
tg.MainButton.show();

document.addEventListener("DOMContentLoaded", function () {
    const encodedJsonData = getQueryParam("json_data");

    if (encodedJsonData) {
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
        let deleteButton = document.getElementById("delete-button");
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
    document.getElementById('dCity').value = entry.dCity || "";
    document.getElementById('aCountry').value = entry.aCountry || "";
    document.getElementById('aCity').value = entry.aCity || "";
    document.getElementById('dDate').value = entry.dDate || "";
    document.getElementById('price').value = entry.price || "";
    document.getElementById('count').value = entry.count || "";
    document.getElementById('currency').value = entry.currency || "";
}

Telegram.WebApp.onEvent("mainButtonClicked", function() {
    if (validateInput(['dDate', 'price','count'])) {
        return;
    }
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