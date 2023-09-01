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
		tg.MainButton.setText("Вы выбрали basic!");
		item = "1";
		tg.MainButton.show();
	}
});

address.addEventListener("click", function(){
	if (tg.MainButton.isVisible) {
		tg.MainButton.hide();
	}
	else {
		tg.MainButton.setText("Вы выбрали address!");
		item = "2";
		tg.MainButton.show();
	}
});

work.addEventListener("click", function(){
	if (tg.MainButton.isVisible) {
		tg.MainButton.hide();
	}
	else {
		tg.MainButton.setText("Вы выбрали work!");
		item = "3";
		tg.MainButton.show();
	}
});

education.addEventListener("click", function(){
	if (tg.MainButton.isVisible) {
		tg.MainButton.hide();
	}
	else {
		tg.MainButton.setText("Вы выбрали education!");
		item = "4";
		tg.MainButton.show();
	}
});

awards.addEventListener("click", function(){
	if (tg.MainButton.isVisible) {
		tg.MainButton.hide();
	}
	else {
		tg.MainButton.setText("Вы выбрали awards!");
		item = "5";
		tg.MainButton.show();
	}
});

certificates.addEventListener("click", function(){
	if (tg.MainButton.isVisible) {
		tg.MainButton.hide();
	}
	else {
		tg.MainButton.setText("Вы выбрали certificates!");
		item = "6";
		tg.MainButton.show();
	}
});

publications.addEventListener("click", function(){
	if (tg.MainButton.isVisible) {
		tg.MainButton.hide();
	}
	else {
		tg.MainButton.setText("Вы выбрали publications!");
		item = "6";
		tg.MainButton.show();
	}
});

volunteer.addEventListener("click", function(){
	if (tg.MainButton.isVisible) {
		tg.MainButton.hide();
	}
	else {
		tg.MainButton.setText("Вы выбрали volunteer!");
		item = "6";
		tg.MainButton.show();
	}
});

skills.addEventListener("click", function(){
	if (tg.MainButton.isVisible) {
		tg.MainButton.hide();
	}
	else {
		tg.MainButton.setText("Вы выбрали skills!");
		item = "6";
		tg.MainButton.show();
	}
});

languages.addEventListener("click", function(){
	if (tg.MainButton.isVisible) {
		tg.MainButton.hide();
	}
	else {
		tg.MainButton.setText("Вы выбрали languages!");
		item = "6";
		tg.MainButton.show();
	}
});


Telegram.WebApp.onEvent("mainButtonClicked", function(){
	tg.sendData(item);
});


let usercard = document.getElementById("usercard");

let allinfo = document.getElementById("allinfo");

let p = document.createElement("p");

p.innerText = `${tg.initDataUnsafe.user.first_name} ${tg.initDataUnsafe.user.last_name}`;
p.innerText = `${tg.initDataUnsafe} ${tg.initDataUnsafe.user}`;
console.log(${tg.initDataUnsafe} ${tg.initDataUnsafe.user});

usercard.appendChild(p);

allinfo.appendChild();