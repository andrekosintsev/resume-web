let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.setText("Save");

tg.MainButton.show();

function getQueryParam(name) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get(name);
}

const encodedJsonData = getQueryParam("json_data");

let deleteButton = document.getElementById("delete-button");

if (encodedJsonData) {
    const jsonData = decodeURIComponent(encodedJsonData);
    const jsonObject = JSON.parse(jsonData);
    populateFormForEditing(jsonObject);
    toggleDeleteButton(true);
} else {
     toggleDeleteButton(false);
 }

 function toggleDeleteButton(showButton) {
     let deleteButton = document.getElementById("delete-button");
     if (showButton) {
         deleteButton.style.display = "block"; // Show the button
     } else {
         deleteButton.style.display = "none"; // Hide the button
     }
 }

// Function to populate the certificate form with data for editing
function populateFormForEditing(entry) {
    document.getElementById('id').value = entry.id || "";
    document.getElementById('name').value = entry.name || "";
    document.getElementById('date').value = entry.date || "";
    document.getElementById('url').value = entry.url || "";
    document.getElementById('issuer').value = entry.issuer || "";
}


deleteButton.addEventListener("click", function () {
            tg.showPopup({
                              title: 'Action Delete',
                              message: 'Are you sure you want to delete this certificate?',
                              buttons: [
                                  {id: 'delete', type: 'destructive', text: 'Delete anyway'},
                                  {type: 'cancel'},
                              ]
                          }, function(buttonId) {
                              if (buttonId === 'delete') {
                                 tg.sendData(JSON.stringify(
                                 {
                                     del_element: {
                                         cert_id: document.getElementById('id').value
                                     }
                                 }
                                 ));
                                 tg.close();
                              }
                          });
});

Telegram.WebApp.onEvent("mainButtonClicked", function() {
     if (validateInput(['name', 'date'])) {
            return;
        }
    tg.sendData(JSON.stringify({
        certificates: [{
                id: document.getElementById('id').value,
                name: document.getElementById('name').value,
                date: document.getElementById('date').value,
                url: document.getElementById('url').value,
                issuer: document.getElementById('issuer').value
        }]
    }));
    tg.close();
});