function getQueryParam(name) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get(name);
}

document.addEventListener("DOMContentLoaded", function() {
    const encodedJsonData = getQueryParam("json_data");

    if (encodedJsonData) {
        const jsonData = decodeURIComponent(encodedJsonData);
        const jsonObject = JSON.parse(jsonData);
        document.getElementById("daily").href="daily.html?json_data="+encodedJsonData;
        document.getElementById("ingredients").href="ingredients.html?json_data="+encodedJsonData;
        document.getElementById("nut").href="nut.html?json_data="+encodedJsonData;
        populateFormForEditing(jsonObject);
    }
});

function populateFormForEditing(entry) {
    if(entry.ingredients) {

    entry.ingredients.forEach(item => {
        const colDiv = document.createElement('div');
        colDiv.classList.add('col-lg-6', 'col-sm-12', 'mb-4');
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card', 'card-small', 'card-post', 'card-post--aside', 'card-post--1');
        const imageDiv = document.createElement('div');
        imageDiv.classList.add('card-post__image');
        imageDiv.style.backgroundImage = "url('"+item.image+"')";
        const categoryBadge = document.createElement('a');
        categoryBadge.classList.add('card-post__category', 'badge', 'badge-pill', 'badge-info');
        categoryBadge.href = '#';
        categoryBadge.textContent = item.foodCategory + "/ " + item.food;
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        const titleLink = document.createElement('a');
        titleLink.classList.add('text-fiord-blue');
        titleLink.href = '#';
        titleLink.textContent = item.text;
        cardTitle.appendChild(titleLink);
        const cardText = document.createElement('p');
        cardText.classList.add('card-text', 'd-inline-block', 'mb-3');
        cardText.textContent = ['Quantity:',item.quatity,item.measure].join(' ');
        const br = document.createElement('br');
        cardText.appendChild(br);
        const weightText = document.createElement('span');
        weightText.classList.add('text-muted');
        weightText.textContent = ['Weight:',Math.round(item.weight),'g'].join(' ');
        imageDiv.appendChild(categoryBadge);
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        cardBody.appendChild(weightText);
        cardDiv.appendChild(imageDiv);
        cardDiv.appendChild(cardBody);
        colDiv.appendChild(cardDiv);
        document.getElementById("ingredientList").appendChild(colDiv);
    });
}


}