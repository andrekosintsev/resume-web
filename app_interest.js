let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.setText("Save");

tg.MainButton.show();

function getQueryParam(name) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get(name);
}

const encodedJsonData = getQueryParam("json_data");

let deleteButton = document.getElementById("delete-button");

if (encodedJsonData) {
    const jsonData = decodeURIComponent(encodedJsonData);
    const fixedJson = jsonData.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":');
    const jsonObject = JSON.parse(fixedJson);
    populateFormForEditing(jsonObject);
    toggleDeleteButton(true);
} else {
    toggleDeleteButton(false);
}

function toggleDeleteButton(showButton) {
    let deleteButton = document.getElementById("delete-button");
    if (showButton) {
        deleteButton.style.display = "block"; // Show the button
    } else {
        deleteButton.style.display = "none"; // Hide the button
    }
}

// Function to populate the interests form with data for editing
function populateFormForEditing(entry) {
    document.getElementById('id').value = entry.id || "";
    document.getElementById('name').value = entry.name || "";
    document.getElementById('keyword').value = entry.keyword || "";
}

deleteButton.addEventListener("click", function() {
    tg.showPopup({
        title: 'Action Delete',
        message: 'Are you sure you want to delete this interest?',
        buttons: [{
            id: 'delete',
            type: 'destructive',
            text: 'Delete anyway'
        }, {
            type: 'cancel'
        }, ]
    }, function(buttonId) {
        if (buttonId === 'delete') {
            tg.sendData(JSON.stringify({
                del_element: {
                    int_id: document.getElementById('id').value
                }
            }));
            tg.close();
        }
    });
});

Telegram.WebApp.onEvent("mainButtonClicked", function() {
    if (validateInput(['name', 'keyword'])) {
        return;
    }
    tg.sendData(JSON.stringify({
        interests: [{
            id: document.getElementById('id').value,
            name: document.getElementById('name').value,
            keyword: document.getElementById('keyword').value
        }]
    }));
    tg.close();
});