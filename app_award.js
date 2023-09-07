let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.textColor = '#FFFFFF';
tg.MainButton.color = '#2cab37';
tg.MainButton.setText("Save");


function getQueryParam(name) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get(name);
}

const encodedJsonData = getQueryParam("json_data");


let addButton = document.getElementById('add_button');
let awardsForm = document.getElementById('awards_form');
let awardsList = document.getElementById('awards_list');

if (encodedJsonData) {
    const jsonData = decodeURIComponent(encodedJsonData);
    const fixedJson = jsonData.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":');
    const jsonObject = JSON.parse(fixedJson);
    jsonObject.forEach(item => {
        addAwardEntry(item);
    });
}


// Function to generate and append award entry HTML
function addAwardEntry(entry) {
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item justify-content-between align-items-center';

    const entryHTML = `
            <strong>Title:</strong> <i>${entry.title}</i><br>
            <strong>Date:</strong> <i>${entry.date}</i><br>
            <strong>Awarder:</strong> <i>${entry.awarder}</i><br>
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
        if (tg.MainButton.isVisible) {
            tg.MainButton.hide();
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
        }
    });

    const div = document.createElement('div');
    div.appendChild(editButton);
    div.appendChild(deleteButton);
    listItem.appendChild(div);
    awardsList.appendChild(listItem);
}

// Function to populate the award form with data for editing
function populateFormForEditing(entry) {
    document.getElementById('title').value = entry.title;
    document.getElementById('date').value = entry.date;
    document.getElementById('awarder').value = entry.awarder;
    document.getElementById('summary').value = entry.summary;
}

// Edit button event listener
function editAwardEntry(entry) {
    populateFormForEditing(entry);
}

// Add button click event listener
addButton.addEventListener('click', () => {
    const entryData = {
        title: document.getElementById('title').value,
        date: document.getElementById('date').value,
        awarder: document.getElementById('awarder').value,
        summary: document.getElementById('summary').value,
    };
    addAwardEntry(entryData);
    awardsForm.reset();
    if (!tg.MainButton.isVisible) {
        tg.MainButton.show();
    }
});

Telegram.WebApp.onEvent("mainButtonClicked", function() {
    const listItems = awardsList.querySelectorAll('li');
    const aws = [];
    listItems.forEach((item) => {
        const strongElements = item.querySelectorAll('i');
        aws.push({
            title: strongElements[0].textContent.trim(),
            date: strongElements[1].textContent.trim(),
            awarder: strongElements[2].textContent.trim(),
            summary: strongElements[3].textContent.trim()
        });
    });
    tg.sendData(JSON.stringify({
        awards: aws
    }));
    tg.close();
});