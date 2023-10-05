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
    const jsonObject = JSON.parse(jsonData);
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

function populateFormForEditing(entry) {
    document.getElementById('id').value = entry.id || "";
    document.getElementById('institution').value = entry.institution || "";
    document.getElementById('url').value = entry.url || "";
    document.getElementById('area').value = entry.area || "";
    document.getElementById('type').value = entry.type || "";
    document.getElementById('startDate').value = entry.startDate || "";
    document.getElementById('endDate').value = entry.endDate || "";
    document.getElementById('courses').value = entry.courses || "";
    document.getElementById('score').value = entry.score || "";
}

deleteButton.addEventListener("click", function() {
    tg.showPopup({
        title: 'Action Delete',
        message: 'Are you sure you want to delete this institution?',
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
                    edu_id: document.getElementById('id').value
                }
            }));
            tg.close();
        }
    });
});

Telegram.WebApp.onEvent("mainButtonClicked", function() {
    if (validateInput(['institution', 'area', 'type', 'startDate', 'endDate'])) {
        return;
    }
    tg.sendData(JSON.stringify({
        educations: [{
            id: document.getElementById('id').value,
            institution: document.getElementById('institution').value,
            url: document.getElementById('url').value,
            area: document.getElementById('area').value,
            type: document.getElementById('type').value,
            startDate: document.getElementById('startDate').value,
            endDate: document.getElementById('endDate').value,
            courses: document.getElementById('courses').value,
            score: document.getElementById('score').value
        }]
    }));
    tg.close();
});