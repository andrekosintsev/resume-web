let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.setText("Save");

tg.MainButton.show();

function getQueryParam(name) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get(name);
}

const encodedJsonData = getQueryParam("json_data");

let awardsForm = document.getElementById('awards_form');
let deleteButton = document.getElementById("delete-button");
var maxCharacters = 1000;

let summaryText = new SimpleMDE({
            element: document.getElementById("summary"),
            spellChecker: false, // Enable spell checker if desired
            toolbar: [
                "bold",           // Bold text
                "italic",         // Italic text
                "heading",        // Headings (h1, h2, h3, etc.)
                "|",              // Separator
                "unordered-list", // Unordered list (bullets)
                "ordered-list",   // Ordered list (numbers)
                "|",              // Separator
                "preview"        // Toggle preview mode
            ]
        });
[summaryText].forEach(item => {
            item.codemirror.on("change", function () {
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

// Function to populate the award form with data for editing
function populateFormForEditing(entry) {
    document.getElementById('id').value = entry.id || "";
    document.getElementById('title').value = entry.title || "";
    document.getElementById('date').value = entry.date || "";
    document.getElementById('awarder').value = entry.awarder || "";
    document.getElementById('summary').value = entry.summary || "";
}

deleteButton.addEventListener("click", function () {
            tg.showPopup({
                              title: 'Action Delete',
                              message: 'Are you sure you want to delete this award?',
                              buttons: [
                                  {id: 'delete', type: 'destructive', text: 'Delete anyway'},
                                  {type: 'cancel'},
                              ]
                          }, function(buttonId) {
                              if (buttonId === 'delete') {
                                 tg.sendData(JSON.stringify(
                                 {
                                     del_element: {
                                         award_id: document.getElementById('id').value
                                     }
                                 }
                                 ));
                                 tg.close();
                              }
                          });
});

Telegram.WebApp.onEvent("mainButtonClicked", function() {
    if (validateInput(['title', 'date'])) {
        return;
    }
    tg.sendData(JSON.stringify({
        awards: [
            {
                id: document.getElementById('id').value,
                title: document.getElementById('title').value,
                date: document.getElementById('date').value,
                awarder: document.getElementById('awarder').value,
                summary: document.getElementById('summary').value
            }]}));
    tg.close();
});