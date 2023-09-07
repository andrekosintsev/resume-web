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

let educationForm = document.getElementById('education_form');
let educationList = document.getElementById('education_list');

[document.getElementById('institution'),
    document.getElementById('url'),
    document.getElementById('area'),
    document.getElementById('type'),
    document.getElementById('startDate'),
    document.getElementById('courses'),
    document.getElementById('score')
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
        addEducationEntry(item);
    });
}


// Function to generate and append award entry HTML
function addEducationEntry(entry) {
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item justify-content-between align-items-center';

               const entryHTML = `
                           <strong>Institution:</strong> <i>${entry.institution}</i><br>
                           <strong>URL:</strong> <a href="${entry.url}" target="_blank"><i>${entry.url}</i></a><br>
                           <strong>Area:</strong> <i>${entry.area}</i><br>
                           <strong>Study Type:</strong> <i>${entry.type}</i><br>
                           <strong>Start Date:</strong> <i>${entry.startDate}</i><br>
                           <strong>End Date:</strong> <i>${entry.endDate}</i><br>
                           <strong>Courses:</strong> <i>${entry.courses}</i><br>
                           <strong>Score:</strong> <i>${entry.score}</i><br>
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
    educationList.appendChild(listItem);
}

function populateFormForEditing(entry) {
             document.getElementById('institution').value = entry.institution;
                        document.getElementById('url').value = entry.url;
                        document.getElementById('area').value = entry.area;
                        document.getElementById('type').value = entry.type;
                        document.getElementById('startDate').value = entry.startDate;
                        document.getElementById('endDate').value = entry.endDate;
                        document.getElementById('courses').value = entry.courses;
                        document.getElementById('score').value = entry.score;
        }

// Edit button event listener
function editEntry(entry) {
    populateFormForEditing(entry);
}

// Add button click event listener
function addEntry() {
    if (validateInput(['institution', 'area','type','startDate','endDate'])) {
        return;
    }
    const entryData = {
                    institution: document.getElementById('institution').value,
                    url: document.getElementById('url').value,
                    area: document.getElementById('area').value,
                    type: document.getElementById('type').value,
                    startDate: document.getElementById('startDate').value,
                    endDate: document.getElementById('endDate').value,
                    courses: document.getElementById('courses').value,
                    score: document.getElementById('score').value,
                };
    addEducationEntry(entryData);
    educationForm.reset();
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
    const listItems = educationList.querySelectorAll('li');
    const edus = [];
    listItems.forEach((item) => {
        const strongElements = item.querySelectorAll('i');
        edus.push({
            institution: strongElements[0].textContent.trim(),
            url: strongElements[1].textContent.trim(),
            area: strongElements[2].textContent.trim(),
            type: strongElements[3].textContent.trim(),
            startDate: strongElements[4].textContent.trim(),
            endDate: strongElements[5].textContent.trim(),
            courses: strongElements[6].textContent.trim(),
            score: strongElements[7].textContent.trim()
        });
    });
    tg.sendData(JSON.stringify({
        educations: edus
    }));
    tg.close();
});