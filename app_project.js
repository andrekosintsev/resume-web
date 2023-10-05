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

let descriptionText = new SimpleMDE({
            element: document.getElementById("description"),
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
let highlightsText = new SimpleMDE({
            element: document.getElementById("highlights"),
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
let rolesText = new SimpleMDE({
             element: document.getElementById("roles"),
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
[descriptionText,highlightsText,rolesText].forEach(item => {
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
    document.getElementById('name').value = entry.name || "";
    descriptionText.value(entry.description || "");
    highlightsText.value(entry.highlights || "");
    document.getElementById('keywords').value = entry.keywords || "";
    document.getElementById('startDate').value = entry.startDate || "";
    document.getElementById('endDate').value = entry.endDate || "";
    document.getElementById('url').value = entry.url || "";
    rolesText.value(entry.roles || "");
    document.getElementById('entity').value = entry.entity || "";
    document.getElementById('type').value = entry.type || "";
}


deleteButton.addEventListener("click", function () {
            tg.showPopup({
                              title: 'Action Delete',
                              message: 'Are you sure you want to delete this project?',
                              buttons: [
                                  {id: 'delete', type: 'destructive', text: 'Delete anyway'},
                                  {type: 'cancel'},
                              ]
                          }, function(buttonId) {
                              if (buttonId === 'delete') {
                                 tg.sendData(JSON.stringify(
                                 {
                                     del_element: {
                                         proj_id: document.getElementById('id').value
                                     }
                                 }
                                 ));
                                 tg.close();
                              }
                          });
});

Telegram.WebApp.onEvent("mainButtonClicked", function() {
    if (validateInput(['name', 'description', 'startDate', 'endDate'])) {
            return;
    }
    tg.sendData(JSON.stringify({
        projects: [{
                id: document.getElementById('id').value,
                name: document.getElementById('name').value,
                description: descriptionText.value(),
                highlights: highlightsText.value(),
                keywords: document.getElementById('keywords').value,
                startDate: document.getElementById('startDate').value,
                endDate: document.getElementById('endDate').value,
                url: document.getElementById('url').value,
                roles: rolesText.value(),
                entity: document.getElementById('entity').value,
                type: document.getElementById('type').value
        }]
    }));
    tg.close();
});