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

const addButton = document.getElementById('add_button');
const certificatesForm = document.getElementById('certificates_form');
const certificatesList = document.getElementById('certificates_list');

if(encodedJsonData) {
    const jsonData = decodeURIComponent(encodedJsonData);
    const fixedJson = jsonData.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":');
    const jsonObject = JSON.parse(fixedJson);
    jsonObject.forEach(item => {
      addCertificateEntry(item);
    });
}


// Function to generate and append certificate entry HTML
function addCertificateEntry(entry) {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item justify-content-between align-items-center';

        const entryHTML = `
            <strong>Name:</strong> <i>${entry.name}</i<br>
            <strong>Date:</strong> <i>${entry.date}</i<br>
            <strong>URL:</strong> <a href="${entry.url}" target="_blank"><i>${entry.url}</i></a><br>
            <strong>Issuer:</strong> <i>${entry.issuer}</i><br>
        `;

        listItem.innerHTML = entryHTML;
        // Edit button event listener
        const editButton = document.createElement('button');
        editButton.className = 'btn btn-info btn-sm me-2';
        editButton.textContent = 'Edit';

        editButton.addEventListener('click', () => {
             populateFormForEditing(entry);
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

        certificatesList.appendChild(listItem);
    }


    // Function to populate the certificate form with data for editing
    function populateFormForEditing(entry) {
        document.getElementById('name').value = entry.name;
        document.getElementById('date').value = entry.date;
        document.getElementById('url').value = entry.url;
        document.getElementById('issuer').value = entry.issuer;
    }

    // Edit button event listener
    function editCertificateEntry(entry) {
        populateFormForEditing(entry);
    }

    // Add button click event listener
    addButton.addEventListener('click', () => {
        const entryData = {
            name: document.getElementById('name').value,
            date: document.getElementById('date').value,
            url: document.getElementById('url').value,
            issuer: document.getElementById('issuer').value,
        };

        addCertificateEntry(entryData);
        certificatesForm.reset();
    });

Telegram.WebApp.onEvent("mainButtonClicked", function(){
    const listItems = certificatesList.querySelectorAll('li');
    const certs = [];
    listItems.forEach((item) => {
      const strongElements = item.querySelectorAll('i');
      certs.push({
          name: strongElements[0].textContent.trim(),
          date: strongElements[1].textContent.trim(),
          url: strongElements[2].textContent.trim(),
          issuer: strongElements[3].textContent.trim()
      });
    });
	tg.sendData(JSON.stringify({certificates: certs}));
	tg.close();
});