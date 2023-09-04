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

let fullNameInput = document.getElementById('full_name');
let labelInput = document.getElementById('label');
let imageInput = document.getElementById('image');
let emailInput = document.getElementById('email');
let phoneInput = document.getElementById('phone');
let summaryInput = document.getElementById('summary');
let addressInput = document.getElementById('address');
let postalCodeInput = document.getElementById('postal_code');
let cityInput = document.getElementById('city');
let countryCodeInput = document.getElementById('country');
let regionInput = document.getElementById('region');

if(encodedJsonData) {

    const jsonData = decodeURIComponent(encodedJsonData);
    const fixedJson = jsonData.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":');
    console.log(fixedJson);
    const jsonObject = JSON.parse(fixedJson);

    if (fullNameInput) {
      fullNameInput.value = jsonObject.name || "";
    }
    if (labelInput) {
      labelInput.value = jsonObject.label || "";
    }
    if (emailInput) {
      emailInput.value = jsonObject.email || "";
    }
    if (phoneInput) {
      phoneInput.value = jsonObject.phone || "";
    }
    if (summaryInput) {
      summaryInput.value = jsonObject.summary || "";
    }
    if (addressInput && jsonObject.location) {
      addressInput.value = jsonObject.location.address || "";
    }
    if (postalCodeInput && jsonObject.location) {
      postalCodeInput.value = jsonObject.location.postalCode || "";
    }
    if (cityInput && jsonObject.location) {
      cityInput.value = jsonObject.location.city || "";
    }
    if (countryCodeInput && jsonObject.location) {
      countryCodeInput.value = jsonObject.location.countryCode || "";
    }
    if (regionInput && jsonObject.location) {
      regionInput.value = jsonObject.location.region || "";
    }
}

function populateCountryDropdown() {
            let countrySelect = document.getElementById("country");
            const countries = [];

            fetch('https://restcountries.com/v3.1/all')
              .then(response => response.json())
              .then(data => {
                data.forEach(country => {
                  const countryCode = country.cca2;
                  const countryName = country.name.common;
                  countries.push({ code: countryCode, name: countryName });
                  countries.sort((a, b) => a.name.localeCompare(b.name));
                });
                countries.forEach((country) => {
                const option = document.createElement("option");
                option.value = country.code;
                option.text = country.name;
                if (option.value==='DE') {
                    option.selected=true;
                }
                countrySelect.appendChild(option);
            });
              })
              .catch(error => {
                console.error('Error fetching country data:', error);
              });
}
        // Call the function to populate the dropdown
populateCountryDropdown();

Telegram.WebApp.onEvent("mainButtonClicked", function(){
	tg.sendData(JSON.stringify(
	{ basic : {
                        name: fullNameInput.value,
                        label: labelInput.value,
                        image: imageInput.value,
                        email: emailInput.value,
                        phone: phoneInput.value,
                        summary: summaryInput.value,
                        location: {
                            address: addressInput.value,
                            postalCode: postalCodeInput.value,
                            city: cityInput.value,
                            countryCode: country.value,
                            region: regionInput.value
                          }
                        }})
                      );
	tg.close();
});