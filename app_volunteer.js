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
var maxCharacters = 1000;
let summaryText = new SimpleMDE({
    element: document.getElementById("summary"),
    spellChecker: false, // Enable spell checker if desired
    toolbar: [
        "bold", // Bold text
        "italic", // Italic text
        "heading", // Headings (h1, h2, h3, etc.)
        "|", // Separator
        "unordered-list", // Unordered list (bullets)
        "ordered-list", // Ordered list (numbers)
        "|", // Separator
        "preview" // Toggle preview mode
    ]
});
let highlightsText = new SimpleMDE({
    element: document.getElementById("highlights"),
    spellChecker: false, // Enable spell checker if desired
    toolbar: [
        "bold", // Bold text
        "italic", // Italic text
        "heading", // Headings (h1, h2, h3, etc.)
        "|", // Separator
        "unordered-list", // Unordered list (bullets)
        "ordered-list", // Ordered list (numbers)
        "|", // Separator
        "preview" // Toggle preview mode
    ]
});

[summaryText, highlightsText].forEach(item => {
    item.codemirror.on("change", function() {
        var currentText = item.value();
        var currentLength = currentText.length;

        if (currentLength > maxCharacters) {
            currentText = currentText.substring(0, maxCharacters);
            item.value(currentText);
        }
    });
});

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
    document.getElementById('organization').value = entry.organization || "";
    document.getElementById('position').value = entry.position || "";
    document.getElementById('url').value = entry.url || "";
    document.getElementById('startDate').value = entry.startDate || "";
    document.getElementById('endDate').value = entry.endDate || "";
    summaryText.value(entry.summary || "");
    highlightsText.value(entry.highlights || "");
}

deleteButton.addEventListener("click", function() {
    tg.showPopup({
        title: 'Action Delete',
        message: 'Are you sure you want to delete this volunteer job?',
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
                    vol_id: document.getElementById('id').value
                }
            }));
            tg.close();
        }
    });
});

Telegram.WebApp.onEvent("mainButtonClicked", function() {
    if (validateInput(['organization', 'position', 'startDate', 'endDate'])) {
        return;
    }
    tg.sendData(JSON.stringify({
        volunteers: [{
            id: document.getElementById('id').value,
            organization: document.getElementById('organization').value,
            position: document.getElementById('position').value,
            url: document.getElementById('url').value,
            startDate: document.getElementById('startDate').value,
            endDate: document.getElementById('endDate').value,
            summary: summaryText.value(),
            highlights: highlightsText.value()
        }]
    }));
    tg.close();
});