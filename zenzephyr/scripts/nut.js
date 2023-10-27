
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
    if(entry.calories) {
        document.getElementById("calories").innerHTML = "Calories " + Math.round(entry.calories);
        //Math.round((total / daily) * 100);
    }
    if(entry.digest) {
    const tableElement = document.getElementById("nutritionFacts");
    entry.digest.forEach(item => {
        const tableRow1 = document.createElement("tr");
        // Create the first table cell with colspan
        const tableCell1 = document.createElement("th");
        tableCell1.setAttribute("colspan", "2");
        // Create the bold element for "Total Fat"
        const boldElement1 = document.createElement("b");
        boldElement1.textContent = "Total " + item.label;
        tableCell1.appendChild(boldElement1);
        // Add the text for fat content
        tableCell1.appendChild(document.createTextNode([" ", Number(item.total.toFixed(2)), item.unit].join(" ")));

        // Create the second table cell
        const tableCell2 = document.createElement("td");
        if (item.total > 0 && item.daily > 0) {
           tableCell2.textContent = Math.round((item.total / item.daily) * 100)+"%";
        }
        // Append the cells to the first table row
        tableRow1.appendChild(tableCell1);
        tableRow1.appendChild(tableCell2);
        tableElement.appendChild(tableRow1);

        if(item.sub) {
           item.sub.forEach(subItem=>{
               // Create a new table row
                       const tableRow2 = document.createElement("tr");

                       // Create the first table cell with class "blank-cell"
                       const blankCell = document.createElement("td");
                       blankCell.classList.add("blank-cell");

                       // Create the second table cell
                       const tableCell3 = document.createElement("th");

                       // Create the bold element for "Saturated Fat"
                       const boldElement2 = document.createElement("b");
                       boldElement2.textContent = subItem.label;
                       tableCell3.appendChild(boldElement2);

                       // Add the text for saturated fat content
                       tableCell3.appendChild(document.createTextNode([" ", Number(subItem.total.toFixed(2)), subItem.unit].join(" ")));

                       // Create the third table cell with a bold element for percentage
                       const tableCell4 = document.createElement("td");
                       const boldElement3 = document.createElement("b");
                       if (subItem.total > 0 && subItem.daily > 0) {
                           boldElement3.textContent = Math.round((subItem.total / subItem.daily) * 100)+"%";
                       }
                       tableCell4.appendChild(boldElement3);

                       // Append the cells to the second table row
                       tableRow2.appendChild(blankCell);
                       tableRow2.appendChild(tableCell3);
                       tableRow2.appendChild(tableCell4);

                       tableElement.appendChild(tableRow2);


           });
        }

    });

    }
}

