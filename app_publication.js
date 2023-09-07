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

let publicationsForm = document.getElementById('publications_form');
let publicationsList = document.getElementById('publications_list');

[document.getElementById('name'),
    document.getElementById('publisher'),
    document.getElementById('releaseDate'),
    document.getElementById('url'),
    document.getElementById('summary')
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
    const jsonObject = JSON.parse(jsonData);
    jsonObject.forEach(item => {
        addPublicationEntry(item);
    });
}

// Function to generate and append publication entry HTML
function addPublicationEntry(entry) {
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item justify-content-between align-items-center';

    const entryHTML = `
            <strong>Name:</strong> <i>${entry.name}</i><br>
            <strong>Publisher:</strong> <i>${entry.publisher}</i><br>
            <strong>Release Date:</strong> <i>${entry.releaseDate}</i><br>
            <strong>URL:</strong> <a href="${entry.url}" target="_blank"><i>${entry.url}</i></a><br>
            <strong>Summary:</strong> <i>${entry.summary}</i><br>
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
    publicationsList.appendChild(listItem);
}

// Function to populate the publication form with data for editing
function populateFormForEditing(entry) {
    document.getElementById('name').value = entry.name;
    document.getElementById('publisher').value = entry.publisher;
    document.getElementById('releaseDate').value = entry.releaseDate;
    document.getElementById('url').value = entry.url;
    document.getElementById('summary').value = entry.summary;
}

// Edit button event listener
function editPublicationEntry(entry) {
    populateFormForEditing(entry);
}

// Add button click event listener
function addEntry() {
    if (validateInput(['name', 'releaseDate'])) {
        return;
    }
    const entryData = {
        name: document.getElementById('name').value,
        publisher: document.getElementById('publisher').value,
        releaseDate: document.getElementById('releaseDate').value,
        url: document.getElementById('url').value,
        summary: document.getElementById('summary').value,
    };

    addPublicationEntry(entryData);
    publicationsForm.reset();
};

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
    const listItems = publicationsList.querySelectorAll('li');
    const pubs = [];
    listItems.forEach((item) => {
        const strongElements = item.querySelectorAll('i');
        pubs.push({
            name: strongElements[0].textContent.trim(),
            publisher: strongElements[1].textContent.trim(),
            releaseDate: strongElements[2].textContent.trim(),
            url: strongElements[3].textContent.trim(),
            summary: strongElements[4].textContent.trim()
        });
    });
    tg.sendData(JSON.stringify({
        publications: pubs
    }));
    tg.close();
});