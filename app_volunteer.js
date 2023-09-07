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

let volunteerWorkForm = document.getElementById('volunteer_work_form');
let volunteerWorkList = document.getElementById('volunteer_work_list');

[document.getElementById('organization'),
    document.getElementById('position'),
    document.getElementById('url'),
    document.getElementById('startDate'),
    document.getElementById('endDate'),
    document.getElementById('summary'),
    document.getElementById('highlights')
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
        addVolunteerEntry(item);
    });
}


// Function to generate and append award entry HTML
function addVolunteerEntry(entry) {
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item justify-content-between align-items-center';

    const entryHTML = `
                <strong>Organization:</strong> <i>${entry.organization}</i><br>
                <strong>Position:</strong> <i>${entry.position}</i><br>
                <strong>URL:</strong> <a href="${entry.url}" target="_blank"><i>${entry.url}</i></a><br>
                <strong>Start Date:</strong> <i>${entry.startDate}</i><br>
                <strong>End Date:</strong> <i>${entry.endDate}</i><br>
                <strong>Summary:</strong> <i>${entry.summary}</i><br>
                <strong>Highlights:</strong><i> ${entry.highlights}</i><br>
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
    volunteerWorkList.appendChild(listItem);
}

function populateFormForEditing(entry) {
    document.getElementById('organization').value = entry.organization;
    document.getElementById('position').value = entry.position;
    document.getElementById('url').value = entry.url;
    document.getElementById('startDate').value = entry.startDate;
    document.getElementById('endDate').value = entry.endDate;
    document.getElementById('summary').value = entry.summary;
    document.getElementById('highlights').value = entry.highlights;
}

// Add button click event listener
function addEntry() {
    if (validateInput(['organization', 'position', 'startDate', 'endDate'])) {
        return;
    }
    const entryData = {
        organization: document.getElementById('organization').value,
        position: document.getElementById('position').value,
        url: document.getElementById('url').value,
        startDate: document.getElementById('startDate').value,
        endDate: document.getElementById('endDate').value,
        summary: document.getElementById('summary').value,
        highlights: document.getElementById('highlights').value
    };
    addVolunteerEntry(entryData);
    volunteerWorkForm.reset();
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
    const listItems = volunteerWorkList.querySelectorAll('li');
    const volunJobs = [];
    listItems.forEach((item) => {
        const strongElements = item.querySelectorAll('i');
        volunJobs.push({
            organization: strongElements[0].textContent.trim(),
            position: strongElements[1].textContent.trim(),
            url: strongElements[2].textContent.trim(),
            startDate: strongElements[3].textContent.trim(),
            endDate: strongElements[4].textContent.trim(),
            summary: strongElements[5].textContent.trim(),
            highlights: strongElements[6].textContent.trim()
        });
    });
    tg.sendData(JSON.stringify({
        volunteers: volunJobs
    }));
    tg.close();
});