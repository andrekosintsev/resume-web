let tg = window.Telegram.WebApp;

tg.expand();
eruda.init();

tg.MainButton.setText("Добавить поездку");
tg.MainButton.show();

let deleteButton = document.getElementById("delete-button");
let previewButton = document.getElementById("preview-button");
let token;

const package = document.getElementById("package");
const countInput = document.getElementById("count");

package.addEventListener("change", function () {
    if (package.checked) {
        countInput.disabled = true;
        countInput.value = "0";
    } else {
       countInput.disabled = false;
    }
});

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
        previewButton.style.display = "block";
    } else {
        deleteButton.style.display = "none"; // Hide the button
        previewButton.style.display = "none";
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
    document.getElementById('package').value = entry.package || "";
    document.getElementById('package').disabled = true;
}

deleteButton.addEventListener("click", function() {
    tg.showPopup({
        title: 'Удаление',
        message: 'Вы уверены, что хотите удалить поездку?',
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
                    trip_id: document.getElementById('id').value
                }
            }));
            tg.close();
        }
    });
});

previewButton.addEventListener("click", function() {
    tg.showPopup({
        title: 'Сообщение превью',
        message: 'Сгенерировать сообщение-превью для рассылки?',
        buttons: [{
            id: 'ok',
            text: 'Да'
        }, {
            type: 'cancel',
            text: 'Отмена'
        }, ]
    }, function(buttonId) {
        if (buttonId === 'ok') {
            tg.sendData(JSON.stringify({
                gen_element: {
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
            currency: document.getElementById('currency').value,
            package: document.getElementById('package').value
        }
    }));
    tg.close();
}

/*var customButton = document.getElementById("custom-button");

    // Add an event listener to the button
    customButton.addEventListener("click", function() {
                  const data = {
                      dCountry: document.getElementById('dCountry').value,
                      dCity: document.getElementById('dCity').value,
                      aCountry: document.getElementById('aCountry').value,
                      aCity: document.getElementById('aCity').value,
                      dDate: document.getElementById('dDate').value,
                      price: document.getElementById('price').value,
                      count: document.getElementById('count').value,
                      currency: document.getElementById('currency').value,
                      package: document.getElementById('package').checked,
                      token: document.getElementById('token').value,
                  };
                  fetch('http://localhost:8081/create', {
                          method: 'POST',
                          headers: {
                              'Content-Type': 'application/json'
                          },
                          body: JSON.stringify(data)
                      }).then(response => response.json())
                      .then(responseData => {
                          tg.close();
                      }).catch(error => {});
    });*/

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
                currency: document.getElementById('currency').value,
                package: document.getElementById('package').checked,
                token: document.getElementById('token').value,
            };
            fetch('http://tdriver-service.kvadsoft.de:8081/create', {
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