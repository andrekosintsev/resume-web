let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.textColor = '#FFFFFF';
tg.MainButton.color = '#229ED9';
tg.MainButton.setText("Add to List");


function getQueryParam(name) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get(name);
}

const encodedJsonData = getQueryParam("json_data");

let languagesForm = document.getElementById('languages_form');
let languagesList = document.getElementById('languages_list');

[document.getElementById('language'),
    document.getElementById('fluency')
].forEach(item => {
    item.addEventListener('mouseover', function() {
        tg.MainButton.color = '#229ED9';
        tg.MainButton.setText("Add to List");
        tg.MainButton.hide();
        if (!tg.MainButton.isVisible) {
            tg.MainButton.show();
        }
    });
});

if (encodedJsonData) {
    const jsonData = decodeURIComponent(encodedJsonData);
    const fixedJson = jsonData.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":');
    const jsonObject = JSON.parse(fixedJson);
    jsonObject.forEach(item => {
        addLanguageEntry(item);
    });
}

// Function to generate and append language entry HTML
function addLanguageEntry(entry) {
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item justify-content-between align-items-center';

    const entryHTML = `
        <strong>Language:</strong> <i>${entry.language}</i><br>
        <strong>Fluency:</strong> <i>${entry.fluency}</i><br>
        `;
    listItem.innerHTML = entryHTML;

    // Edit button event listener
    const editButton = document.createElement('button');
    editButton.className = 'btn btn-info btn-sm me-2';
    editButton.textContent = 'Edit';

    editButton.addEventListener('click', () => {
        populateFormForEditing(entry);
        listItem.remove();
        tg.MainButton.color = '#229ED9';
        tg.MainButton.setText("Save changes");
        tg.MainButton.hide();
        if (!tg.MainButton.isVisible) {
            tg.MainButton.show();
        }
    });

    // Delete button event listener
    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-danger btn-sm me-2';
    deleteButton.textContent = 'Delete';

    deleteButton.addEventListener('click', () => {
        listItem.remove();
        if (!tg.MainButton.isVisible) {
            tg.MainButton.show();
            tg.MainButton.color = '#2CAB37';
            tg.MainButton.setText("Save");
        }
    });

    const div = document.createElement('div');
    div.appendChild(editButton);
    div.appendChild(deleteButton);
    listItem.appendChild(div);
    languagesList.appendChild(listItem);
}

// Function to populate the language form with data for editing
function populateFormForEditing(entry) {
    document.getElementById('language').value = entry.language;
    document.getElementById('fluency').value = entry.fluency;
}

// Edit button event listener
function editLanguageEntry(entry) {
    populateFormForEditing(entry);
}

// Add button click event listener
function addEntry() {
    const entryData = {
        language: document.getElementById('language').value,
        fluency: document.getElementById('fluency').value,
    };
    addLanguageEntry(entryData);
    languagesForm.reset();
});

Telegram.WebApp.onEvent("mainButtonClicked", function() {
    if (tg.MainButton.text === "Add to List") {
        addEntry();
        tg.MainButton.color = '#2CAB37';
        tg.MainButton.setText("Save");
        return;
    }
    if (tg.MainButton.text === "Save changes") {
        addEntry();
        tg.MainButton.color = '#2CAB37';
        tg.MainButton.setText("Save");
        return;
    }
}
const listItems = languagesList.querySelectorAll('li');
const langs = []; listItems.forEach((item) => {
    const strongElements = item.querySelectorAll('i');
    langs.push({
        language: strongElements[0].textContent.trim(),
        fluency: strongElements[1].textContent.trim()
    });
}); tg.sendData(JSON.stringify({
    languages: langs
})); tg.close();
});