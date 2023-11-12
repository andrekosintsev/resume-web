let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.setText("Сохранить");
tg.MainButton.show();

function getQueryParam(name) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get(name);
}

const encodedJsonData = getQueryParam("json_data");

document.getElementById('experience').addEventListener('input', function () {
        const value = parseInt(this.value);
        if (value < 1) {
            this.value = '1';
        } else if (value > 70) {
            this.value = '70';
        }
    });

if (encodedJsonData) {
    const jsonData = decodeURIComponent(encodedJsonData);
    const fixedJson = jsonData.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":');
    const jsonObject = JSON.parse(fixedJson);
    populateFormForEditing(jsonObject);
}

// Function to populate the award form with data for editing
function populateFormForEditing(entry) {
    document.getElementById('id').value = entry.id || "";
    document.getElementById('username').value = entry.username || "";
    document.getElementById('firstName').value = entry.firstName || "";
    document.getElementById('lastName').value = entry.lastName || "";
    document.getElementById('car').value = entry.car || "";
    document.getElementById('experience').value = entry.experience || "";
}

Telegram.WebApp.onEvent("mainButtonClicked", function() {
    tg.sendData(JSON.stringify({
        settings: {
                     id: document.getElementById('id').value,
                     username: document.getElementById('username').value,
                     firstName: document.getElementById('firstName').value,
                     lastName: document.getElementById('lastName').value,
                     car: document.getElementById('car').value,
                     experience: document.getElementById('experience').value
        }
    }));
    tg.close();
});