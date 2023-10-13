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
populateCountryDropdown();

const encodedJsonData = getQueryParam("json_data");

let fullNameInput = document.getElementById('full_name');
let labelInput = document.getElementById('label');
let emailInput = document.getElementById('email');
let phoneInput = document.getElementById('phone');
let summaryInput = document.getElementById('summary');
let addressInput = document.getElementById('address');
let postalCodeInput = document.getElementById('postal_code');
let cityInput = document.getElementById('city');
let countryCodeInput = document.getElementById('country');
let regionInput = document.getElementById('region');

summaryInput.setAttribute("maxlength", "1000");

if (encodedJsonData) {

  const jsonData = decodeURIComponent(encodedJsonData);
  const jsonObject = JSON.parse(jsonData);

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
  if (regionInput && jsonObject.location) {
    regionInput.value = jsonObject.location.region || "";
  }
  populateCountryDropdown(jsonObject);
}

function populateCountryDropdown(jsonObject) {
  const countries = [];

  fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => {
      data.forEach(country => {
        const countryCode = country.cca2;
        const countryName = country.name.common;
        countries.push({
          code: countryCode,
          name: countryName
        });
        countries.sort((a, b) => a.name.localeCompare(b.name));
      });
      countries.forEach((country) => {
        const option = document.createElement("option");
        option.value = country.code;
        option.text = country.name;
        if (jsonObject && jsonObject.location) {
          if (option.value === jsonObject.location.countryCode) {
            option.selected = true;
          }
        }
        countryCodeInput.appendChild(option);
      });

    })
    .catch(error => {
      console.error('Error fetching country data:', error);
    });
}


Telegram.WebApp.onEvent("mainButtonClicked", function() {
  if (validateInput(['full_name', 'email', 'phone'])) {
    return;
  }
  tg.sendData(JSON.stringify({
    basic: {
      name: fullNameInput.value,
      label: labelInput.value,
      email: emailInput.value,
      phone: phoneInput.value,
      summary: summaryInput.value,
      location: {
        address: addressInput.value,
        postalCode: postalCodeInput.value,
        city: cityInput.value,
        countryCode: countryCodeInput.value,
        region: regionInput.value
      }
    }
  }));
  tg.close();
});