let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.textColor = '#FFFFFF';
tg.MainButton.color = '#2cab37';

let item = "";

let basic = document.getElementById("basic");
let address = document.getElementById("address");
let work = document.getElementById("work");
let education = document.getElementById("education");
let awards = document.getElementById("awards");
let certificates = document.getElementById("certificates");
let publications = document.getElementById("publications");
let volunteer = document.getElementById("volunteer");
let skills = document.getElementById("skills");
let languages = document.getElementById("languages");

basic.addEventListener("click", function(){
	if (tg.MainButton.isVisible) {
		tg.MainButton.hide();
	}
	else {
		tg.MainButton.setText("Add/update basic info");
		item = "basic";
		tg.MainButton.show();
	}
});

address.addEventListener("click", function(){
	if (tg.MainButton.isVisible) {
		tg.MainButton.hide();
	}
	else {
		tg.MainButton.setText("Add/update address");
		item = "address";
		tg.MainButton.show();
	}
});

work.addEventListener("click", function(){
	if (tg.MainButton.isVisible) {
		tg.MainButton.hide();
	}
	else {
		tg.MainButton.setText("Add/update work");
		item = "work";
		tg.MainButton.show();
	}
});

education.addEventListener("click", function(){
	if (tg.MainButton.isVisible) {
		tg.MainButton.hide();
	}
	else {
		tg.MainButton.setText("Add/update education");
		item = "education";
		tg.MainButton.show();
	}
});

awards.addEventListener("click", function(){
	if (tg.MainButton.isVisible) {
		tg.MainButton.hide();
	}
	else {
		tg.MainButton.setText("Add/update awards");
		item = "awards";
		tg.MainButton.show();
	}
});

certificates.addEventListener("click", function(){
	if (tg.MainButton.isVisible) {
		tg.MainButton.hide();
	}
	else {
		tg.MainButton.setText("Add/update certificates");
		item = "certificates";
		tg.MainButton.show();
	}
});

publications.addEventListener("click", function(){
	if (tg.MainButton.isVisible) {
		tg.MainButton.hide();
	}
	else {
		tg.MainButton.setText("Add/update publications");
		item = "publications";
		tg.MainButton.show();
	}
});

volunteer.addEventListener("click", function(){
	if (tg.MainButton.isVisible) {
		tg.MainButton.hide();
	}
	else {
		tg.MainButton.setText("Add/update volunteer");
		item = "volunteer";
		tg.MainButton.show();
	}
});

skills.addEventListener("click", function(){
	if (tg.MainButton.isVisible) {
		tg.MainButton.hide();
	}
	else {
		tg.MainButton.setText("Add/update skills");
		item = "skills";
		tg.MainButton.show();
	}
});

languages.addEventListener("click", function(){
	if (tg.MainButton.isVisible) {
		tg.MainButton.hide();
	}
	else {
		tg.MainButton.setText("Add/update languages");
		item = "languages";
		tg.MainButton.show();
	}
});


Telegram.WebApp.onEvent("mainButtonClicked", function(){
	//tg.sendData(item);
	window.Telegram.WebApp.sendData(item);
	tg.close();
});