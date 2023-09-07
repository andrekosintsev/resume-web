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

let workExperienceForm = document.getElementById('work_experience_form');
let entryList = document.getElementById('entry_list');

[document.getElementById('name'),
    document.getElementById('address'),
    document.getElementById('website'),
    document.getElementById('industry'),
    document.getElementById('position'),
    document.getElementById('startDate'),
    document.getElementById('endDate'),
    document.getElementById('summary'),
    document.getElementById('highlights'),
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
    const jsonObject = JSON.parse(jsonData);
    jsonObject.forEach(item => {
        addWorkEntry(item);
    });
}


// Function to generate and append award entry HTML
function addWorkEntry(entry) {
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item justify-content-between align-items-center';

    const entryHTML = `
                <strong>Company Name:</strong> <i>${entry.name}</i><br>
                <strong>Company Address:</strong> <i>${entry.address}<br>
                <strong>Company Website:</strong> <a href="${entry.website}" target="_blank"><i>${entry.website}</i></a><br>
                <strong>Industry:</strong> <i>${entry.industry}</i><br>
                <strong>Position:</strong> <i>${entry.position}</i><br>
                <strong>Start Date:</strong> <i>${entry.startDate}</i><br>
                <strong>End Date:</strong> <i>${entry.endDate}</i><br>
                <strong>Summary:</strong> <i>${entry.summary}</i><br>
                <strong>Highlights:</strong> <i>${entry.highlights}</i><br>
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
    entryList.appendChild(listItem);
}

function populateFormForEditing(entry) {
            document.getElementById('name').value = entry.name;
            document.getElementById('address').value = entry.address;
            document.getElementById('website').value = entry.website;
            document.getElementById('industry').value = entry.industry;
            document.getElementById('position').value = entry.position;
            document.getElementById('startDate').value = entry.startDate;
            document.getElementById('endDate').value = entry.endDate;
            document.getElementById('summary').value = entry.summary;
            document.getElementById('highlights').value = entry.highlights;
            document.getElementById('keywords').value = entry.keywords;
        }

// Edit button event listener
function editEntry(entry) {
    populateFormForEditing(entry);
}

// Add button click event listener
function addEntry() {
    if (validateInput(['name', 'industry','position','startDate','endDate'])) {
        return;
    }
    const entryData = {
                    name: document.getElementById('name').value,
                    address: document.getElementById('address').value,
                    website: document.getElementById('website').value,
                    industry: document.getElementById('industry').value,
                    position: document.getElementById('position').value,
                    start_date: document.getElementById('startDate').value,
                    end_date: document.getElementById('endDate').value,
                    summary: document.getElementById('summary').value,
                    highlights: document.getElementById('highlights').value,
                    keywords: document.getElementById('keywords').value,
                };
    addWorkEntry(entryData);
    workExperienceForm.reset();
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
    const listItems = entryList.querySelectorAll('li');
    const jobs = [];
    listItems.forEach((item) => {
        const strongElements = item.querySelectorAll('i');
        jobs.push({
            name: strongElements[0].textContent.trim(),
            address: strongElements[1].textContent.trim(),
            website: strongElements[2].textContent.trim(),
            industry: strongElements[3].textContent.trim(),
            position: strongElements[4].textContent.trim(),
            startDate: strongElements[5].textContent.trim(),
            endDate: strongElements[6].textContent.trim(),
            summary: strongElements[7].textContent.trim(),
            highlights: strongElements[8].textContent.trim(),
            keywords: strongElements[9].textContent.trim()
        });
    });
    tg.sendData(JSON.stringify({
        works: jobs
    }));
    tg.close();
});