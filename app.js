let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.textColor = '#FFFFFF';
tg.MainButton.color = '#2cab37';
tg.MainButton.setText("Save");
tg.MainButton.show();

// Get references to the input fields
let basic = document.getElementById("basic");
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
                });
                console.log(countries);
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
              tg.MainButton.setText("Save");
              tg.MainButton.show();

}
        // Call the function to populate the dropdown
populateCountryDropdown();

Telegram.WebApp.onEvent("mainButtonClicked", function(){
	tg.sendData(JSON.stringify({
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
                            countryCode: countryCodeInput.value,
                            region: regionInput.value
                          }
                        })
                      );
	tg.close();
});