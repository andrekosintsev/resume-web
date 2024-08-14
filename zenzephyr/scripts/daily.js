let tg = window.Telegram.WebApp;

tg.expand();
//tg.MainButton.hide();

function getQueryParam(name) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get(name);
}

document.addEventListener("DOMContentLoaded", function() {
    const encodedJsonData = getQueryParam("json_data");

    if (encodedJsonData) {
        const jsonData = decodeURIComponent(encodedJsonData);
        const jsonObject = JSON.parse(jsonData);
        populateFormForEditing(jsonObject);
    }
});

function populateFormForEditing(entry) {
document.getElementById("image").style.backgroundImage = "url('https://images.unsplash.com/photo-1466637574441-749b8f19452f?q=80&w=2428&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
    if(entry.image) {
        document.getElementById("image").style.backgroundImage = `url('${entry.image}')`;
    }
    if(entry.ingredientLines) {
     const ul = document.createElement("ul");
        entry.ingredientLines.forEach(ingredient => {
            const li = document.createElement("li");
            li.textContent = ingredient;
            ul.appendChild(li);
        });
        document.getElementById("ingredients").appendChild(ul);
    }
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
        document.getElementById("mealType").textContent = "Meal type: " + entry.mealType.join(', ');
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
        document.getElementById("source").textContent = "Link to original recipe from " + entry.source;
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