let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.textColor = '#FFFFFF';
tg.MainButton.color = '#2cab37';

// Get references to the input fields
const fullNameInput = document.getElementById('full_name');
const labelInput = document.getElementById('label');
const imageInput = document.getElementById('image');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const summaryInput = document.getElementById('summary');
const addressInput = document.getElementById('address');
const postalCodeInput = document.getElementById('postal_code');
const cityInput = document.getElementById('city');
const countryCodeInput = document.getElementById('country');
const regionInput = document.getElementById('region');


tg.MainButton.show();


Telegram.WebApp.onEvent("mainButtonClicked", function(){
	tg.sendData(basics: {
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
                        }
                      );
	tg.close();
});