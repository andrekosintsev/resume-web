let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.textColor = '#FFFFFF';
tg.MainButton.color = '#3F51B5';
tg.MainButton.setText("Добавить фильтр");


function getQueryParam(name) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get(name);
}

const encodedJsonData = getQueryParam("json_data");

let filterForm = document.getElementById('filter_form');
let filterList = document.getElementById('filter_list');

[document.getElementById('d_country'),
    document.getElementById('d_city'),
    document.getElementById('a_country'),
    document.getElementById('a_city'),
    document.getElementById('d_date')
].forEach(item => {
    item.addEventListener('mouseover', function() {
        tg.MainButton.color = '#3F51B5';
        tg.MainButton.setText("Добавить фильтр");
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
        addFilterEntry(item);
    });
}


// Function to generate and append award entry HTML
function addFilterEntry(entry) {
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item justify-content-between align-items-left';

    const entryHTML = `
            <strong>Страна отправления:</strong> <i>${entry.d_country}</i><br>
            <strong>Город отправления:</strong> <i>${entry.d_city}</i><br>
            <strong>Страна прибытия:</strong> <i>${entry.a_country}</i><br>
            <strong>Город прибытия:</strong> <i>${entry.a_city}</i><br>
            <strong>Дата поездки:</strong> <i>${entry.d_date}</i><br>
        `;

    listItem.innerHTML = entryHTML;

    // Edit button event listener
    const editButton = document.createElement('button');
    editButton.className = 'mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab';
    const spanEditButton = document.createElement('i');
    spanEditButton.className = 'material-icons';
    spanEditButton.textContent = 'edit';
    editButton.appendChild(spanEditButton);

    editButton.addEventListener('click', () => {
        populateFormForEditing(entry);
        listItem.remove();
        tg.MainButton.color = '#229ED9';
        tg.MainButton.setText("Сохранить изменения");
        tg.MainButton.hide();
        if (!tg.MainButton.isVisible) {
            tg.MainButton.show();
        }
    });

    // Delete button event listener
    const deleteButton = document.createElement('button');
    deleteButton.className = 'mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored';
    const spanDeleteButton = document.createElement('i');
    spanDeleteButton.className = 'material-icons';
    spanDeleteButton.textContent = 'delete';
    deleteButton.appendChild(spanDeleteButton);

    deleteButton.addEventListener('click', () => {
        listItem.remove();
        if (!tg.MainButton.isVisible) {
            tg.MainButton.show();
            tg.MainButton.color = '#2CAB37';
            tg.MainButton.setText("Сохранить");
        }
    });

    const div = document.createElement('div');
    div.className = 'mdl-grid';
    div.appendChild(editButton);
    div.appendChild(deleteButton);
    listItem.appendChild(div);
    filterList.appendChild(listItem);
}

// Function to populate the award form with data for editing
function populateFormForEditing(entry) {
    document.getElementById('d_country').value = entry.d_country;
    document.getElementById('d_city').value = entry.d_city;
    document.getElementById('a_country').value = entry.a_country;
    document.getElementById('a_city').value = entry.a_city;
    document.getElementById('d_date').value = entry.d_date;
}

// Edit button event listener
function editAwardEntry(entry) {
    populateFormForEditing(entry);
}

// Add button click event listener
function addEntry() {
    if (validateInput(['d_country', 'd_city','a_country', 'a_country', 'a_city', 'd_date'])) {
        return;
    }
    const entryData = {
        d_country: document.getElementById('d_country').value,
        d_city: document.getElementById('d_city').value,
        a_country: document.getElementById('a_country').value,
        a_city: document.getElementById('a_city').value,
        d_date: document.getElementById('d_date').value
    };
    addFilterEntry(entryData);
    filterForm.reset();
};

Telegram.WebApp.onEvent("mainButtonClicked", function() {
    if (tg.MainButton.text === "Добавить фильтр") {
        addEntry();
        tg.MainButton.color = '#2CAB37';
        tg.MainButton.setText("Сохранить");
        return;
    }
    if (tg.MainButton.text === "Сохранить измнения") {
        addEntry();
        tg.MainButton.color = '#2CAB37';
        tg.MainButton.setText("Сохранить");
        return;
    }
    const listItems = filterList.querySelectorAll('li');
    const flts = [];
    listItems.forEach((item) => {
        const strongElements = item.querySelectorAll('i');
        flts.push({
            d_country: strongElements[0].textContent.trim(),
            d_city: strongElements[1].textContent.trim(),
            a_country: strongElements[2].textContent.trim(),
            a_city: strongElements[3].textContent.trim(),
            d_date: strongElements[4].textContent.trim()
        });
    });
    tg.sendData(JSON.stringify({
        filters: flts
    }));
    tg.close();
});