let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.textColor = '#FFFFFF';
tg.MainButton.color = '#2cab37';
tg.MainButton.setText("Save");
tg.MainButton.show();


function getQueryParam(name) {
  const urlSearchParams = new URLSearchParams(window.location.search);
  return urlSearchParams.get(name);
}

const encodedJsonData = getQueryParam("json_data");

const addReferenceButton = document.getElementById('add_reference_button');
const referencesForm = document.getElementById('references_form');
const referencesList = document.getElementById('references_list');

if(encodedJsonData) {
    const jsonData = decodeURIComponent(encodedJsonData);
    const jsonObject = JSON.parse(fixedJson);
    jsonObject.forEach(item => {
      addReferenceEntry(item);
    });
}

function addReferenceEntry(entry) {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item justify-content-between align-items-center';

        const entryHTML = `
            <strong>Name:</strong> <i>${entry.name}</i><br>
            <strong>Reference:</strong> <i>${entry.reference}</i><br>
        `;

        listItem.innerHTML = entryHTML;

        // Edit button event listener
        const editButton = document.createElement('button');
        editButton.className = 'btn btn-info btn-sm me-2';
        editButton.textContent = 'Edit';

        editButton.addEventListener('click', () => {
            populateFormForEditing(entry);
            listItem.remove();
        });

        // Delete button event listener
        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger btn-sm me-2';
        deleteButton.textContent = 'Delete';

        deleteButton.addEventListener('click', () => {
            listItem.remove();
        });

        const div = document.createElement('div');
        div.appendChild(editButton);
        div.appendChild(deleteButton);
        listItem.appendChild(div);
        referencesList.appendChild(listItem);
}
// Function to populate the references form with data for editing
    function populateFormForEditing(entry) {
        document.getElementById('name').value = entry.name;
        document.getElementById('reference').value = entry.reference;
    }

    // Edit button event listener
    function editReferenceEntry(entry) {
        populateFormForEditing(entry);
    }

    // Add button click event listener
    addReferenceButton.addEventListener('click', () => {
        const entryData = {
            name: document.getElementById('name').value,
            reference: document.getElementById('reference').value,
        };

        addReferenceEntry(entryData);
        referencesForm.reset();
    });

Telegram.WebApp.onEvent("mainButtonClicked", function(){
    const listItems = referencesList.querySelectorAll('li');
    const refs = [];
    listItems.forEach((item) => {
      const strongElements = item.querySelectorAll('i');
      refs.push({
          name: strongElements[0].textContent.trim(),
          reference: strongElements[1].textContent.trim()
      });
    });
	tg.sendData(JSON.stringify({references: refs}));
	tg.close();
});