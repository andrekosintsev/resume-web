let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.textColor = '#FFFFFF';
tg.MainButton.color = '#2cab37';
tg.MainButton.setText("Save");
tg.MainButton.show();

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