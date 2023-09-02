let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.textColor = '#FFFFFF';
tg.MainButton.color = '#2cab37';

// Get references to the input fields
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

fullNameInput.addEventListener("mouseover", function(){
	if (tg.MainButton.isVisible) {
		tg.MainButton.hide();
	}
	else {
		tg.MainButton.setText("Save");
		tg.MainButton.show();
	}
});


tg.MainButton.setText("Save");
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