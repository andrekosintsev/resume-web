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

let projectsForm = document.getElementById('projects_form');
let projectsList = document.getElementById('projects_list');

[document.getElementById('name'),
    document.getElementById('description'),
    document.getElementById('highlights'),
    document.getElementById('keywords'),
    document.getElementById('startDate'),
    document.getElementById('endDate'),
    document.getElementById('url'),
    document.getElementById('roles'),
    document.getElementById('entity'),
    document.getElementById('type')
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
        addProjectEntry(item);
    });
}


// Function to generate and append award entry HTML
function addProjectEntry(entry) {
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item justify-content-between align-items-center';

    const entryHTML = `
                            <strong>Name:</strong> <i>${entry.name}</i><br>
                            <strong>Description:</strong> <i>${entry.description}</i><br>
                            <strong>Highlights:</strong> <i>${entry.highlights}</i><br>
                            <strong>Keywords:</strong> <i>${entry.keywords}</i><br>
                            <strong>Start Date:</strong> <i>${entry.startDate}</i><br>
                            <strong>End Date:</strong> <i>${entry.endDate}</i><br>
                            <strong>URL:</strong> <i>${entry.url}</i><br>
                            <strong>Roles:</strong> <i>${entry.roles}</i><br>
                            <strong>Entity:</strong> <i>${entry.entity}</i><br>
                            <strong>Type:</strong> <i>${entry.type}</i><br>
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
    projectsList.appendChild(listItem);
}

function populateFormForEditing(entry) {
    document.getElementById('name').value = entry.name;
    document.getElementById('description').value = entry.description;
    document.getElementById('highlights').value = entry.highlights;
    document.getElementById('keywords').value = entry.keywords;
    document.getElementById('startDate').value = entry.startDate;
    document.getElementById('endDate').value = entry.endDate;
    document.getElementById('url').value = entry.url;
    document.getElementById('roles').value = entry.roles;
    document.getElementById('entity').value = entry.entity;
    document.getElementById('type').value = entry.type;
}

// Add button click event listener
function addEntry() {
    if (validateInput(['name', 'description', 'startDate', 'endDate'])) {
        return;
    }
    const entryData = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        highlights: document.getElementById('highlights').value,
        keywords: document.getElementById('keywords').value,
        startDate: document.getElementById('startDate').value,
        endDate: document.getElementById('endDate').value,
        url: document.getElementById('url').value,
        roles: document.getElementById('roles').value,
        entity: document.getElementById('entity').value,
        type: document.getElementById('type').value,
    };
    addProjectEntry(entryData);
    projectsForm.reset();
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
    const listItems = projectsList.querySelectorAll('li');
    const projs = [];
    listItems.forEach((item) => {
        const strongElements = item.querySelectorAll('i');
        projs.push({
            name: strongElements[0].textContent.trim(),
            description: strongElements[1].textContent.trim(),
            highlights: strongElements[2].textContent.trim(),
            keywords: strongElements[3].textContent.trim(),
            startDate: strongElements[4].textContent.trim(),
            endDate: strongElements[5].textContent.trim(),
            url: strongElements[6].textContent.trim(),
            roles: strongElements[7].textContent.trim(),
            entity: strongElements[8].textContent.trim(),
            type: strongElements[9].textContent.trim()
        });
    });
    tg.sendData(JSON.stringify({
        projects: projs
    }));
    tg.close();
});