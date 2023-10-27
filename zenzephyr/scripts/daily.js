const jsonDailyData = {
    "label": "Jello Aquarium",
    "image": "https://image.com",
    "source": "Foodista",
    "url": "http://www.foodista.com/recipe/X3RFGDTT/jello-aquarium",
    "dietLabels": [
      "High-Protein",
      "Low-Fat",
      "Low-Carb",
      "Low-Sodium"
    ],
    "healthLabels": [
      "Sugar-Conscious",
      "Low Sugar",
      "Low Potassium",
      "Kidney-Friendly",
      "Keto-Friendly",
      "Dairy-Free",
      "Gluten-Free",
      "Wheat-Free",
      "Egg-Free",
      "Peanut-Free",
      "Tree-Nut-Free",
      "Soy-Free",
      "Fish-Free",
      "Shellfish-Free",
      "Red-Meat-Free",
      "Crustacean-Free",
      "Celery-Free",
      "Mustard-Free",
      "Sesame-Free",
      "Lupine-Free",
      "Mollusk-Free",
      "Alcohol-Free",
      "No oil added",
      "FODMAP-Free"
    ],
    "cautions" : ["Gluten"],
    "ingredients": [
      {
        "text": "4 ounces Jell-o berry blue gelatin",
        "quantity": 4.0,
        "measure": "ounce",
        "food": "gelatin",
        "weight": 113.3980925,
        "foodCategory": "candy",
        "foodId": "food_bh3w81wbiqrfmhbaw9hgwa3u7lky",
        "image": "https://www.edamam.com/food-img/47a/47a5b5c20c3cbfaf7332d572a5bfddbe.jpg"
      },
      {
        "text": "cup Water -- cold",
        "quantity": 1.0,
        "measure": "cup",
        "food": "Water",
        "weight": 236.5882365,
        "foodCategory": "water",
        "foodId": "food_a99vzubbk1ayrsad318rvbzr3dh0",
        "image": "https://www.edamam.com/food-img/5dd/5dd9d1361847b2ca53c4b19a8f92627e.jpg"
      },
      {
        "text": "cup Water -- boiling",
        "quantity": 1.0,
        "measure": "cup",
        "food": "Water",
        "weight": 236.5882365,
        "foodCategory": "water",
        "foodId": "food_a99vzubbk1ayrsad318rvbzr3dh0",
        "image": "https://www.edamam.com/food-img/5dd/5dd9d1361847b2ca53c4b19a8f92627e.jpg"
      }
    ],
    "calories": 379.88360987500005,
    "totalWeight": 586.5745655000001,
    "totalTime": 365.0,
    "cuisineType": ["british"],
    "mealType": ["lunch/dinner"],
    "dishType": ["desserts"]
};

//let tg = window.Telegram.WebApp;

//tg.expand();
//tg.MainButton.hide();

function getQueryParam(name) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get(name);
}

document.addEventListener("DOMContentLoaded", function() {
    const encodedJsonData = getQueryParam("json_data");

    if (encodedJsonData) {
        const jsonData = decodeURIComponent(encodedJsonData);
        const fixedJson = jsonData.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":');
        const jsonObject = JSON.parse(fixedJson);
        populateFormForEditing(jsonObject);
    } else {


    }
});

populateFormForEditing(jsonDailyData);

function populateFormForEditing(entry) {
    if(entry.dietLabels) {
        document.getElementById("dietLabels").innerHTML = formatDietLabels(entry.dietLabels);
    }
    if(entry.label) {
        document.getElementById("label").textContent = entry.label;
    }
    if(entry.healthLabels) {
        document.getElementById("health").textContent = entry.healthLabels.join(', ');
    }
    if(entry.cautions) {
        document.getElementById("cautions").textContent = "Cautions: " + entry.cautions.join(', ');
        document.getElementById("cautions").style.display = 'block';
    }
    if(entry.cuisineType) {
        document.getElementById("cuisineType").textContent = "Cusine: " + entry.cuisineType.join(', ');
    }
    if(entry.mealType) {
        document.getElementById("mealType").textContent = "Meal: " + entry.mealType.join(', ');
    }
    if(entry.dishType) {
        document.getElementById("dishType").textContent = entry.dishType.join(', ');
        document.getElementById("dishType").style.display = 'block';
    }
    if(entry.totalTime >= 0) {
        document.getElementById("time").textContent = minutesToHours(entry.totalTime);
        document.getElementById("totalTime").style.display = 'block';
    }
    if(entry.source) {
        document.getElementById("source").textContent = "From " + entry.source;
        if(entry.url) {
            document.getElementById("source").href = entry.url;
        }
    }
}

function formatDietLabels(inputArray) {
    // Concatenate the array elements with ","
    var concatenatedString = inputArray.join(', ');

    // Split the string into lines with a maximum of 2 words per line
    var lines = [];
    var words = concatenatedString.split(' ');
    for (var i = 0; i < words.length; i += 2) {
        var line = words.slice(i, i + 2).join(' ');
        lines.push(line);
    }

    // Add <br> to the end of each line except for the last line
    var formattedString = lines.join('<br> ');

    return formattedString;
}

function minutesToHours(minutes) {
  if (typeof minutes !== 'number' || minutes < 0) {
    return 'Invalid input';
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) {
    return `${remainingMinutes}m`;
  }

  if (remainingMinutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${remainingMinutes}m`;
}