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

const skillsForm = document.getElementById('skills_form');
const skillsList = document.getElementById('skills_list');

[document.getElementById('name'),
    document.getElementById('level'),
    document.getElementById('keywords')
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
        addSkillEntry(item);
    });
}

function addSkillEntry(entry) {
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item justify-content-between align-items-center';

    const entryHTML = `
            <strong>Name:</strong> <i>${entry.name}</i><br>
            <strong>Level:</strong> <i>${entry.level}</i><br>
            <strong>Keywords:</strong> <i>${entry.keywords}</i><br>
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
    skillsList.appendChild(listItem);
}

// Function to populate the skill form with data for editing
function populateFormForEditing(entry) {
    document.getElementById('name').value = entry.name;
    document.getElementById('level').value = entry.level;
    document.getElementById('keywords').value = entry.keywords;
}

// Edit button event listener
function editSkillEntry(entry) {
    populateFormForEditing(entry);
}

// Add button click event listener
function addEntry() {
    if (validateInput(['name', 'level'])) {
        return;
    }
    const entryData = {
        name: document.getElementById('name').value,
        level: document.getElementById('level').value,
        keywords: document.getElementById('keywords').value,
    };

    addSkillEntry(entryData);
    skillsForm.reset();
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
}
const listItems = skillsList.querySelectorAll('li');
const sks = []; listItems.forEach((item) => {
    const strongElements = item.querySelectorAll('i');
    sks.push({
        name: strongElements[0].textContent.trim(),
        level: strongElements[1].textContent.trim(),
        keywords: strongElements[2].textContent.trim()
    });
}); tg.sendData(JSON.stringify({
    skills: sks
})); tg.close();
});