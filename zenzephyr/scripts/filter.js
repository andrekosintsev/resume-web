let tg = window.Telegram.WebApp;
tg.expand();
tg.MainButton.setText("Save filter");
tg.MainButton.show();

const basic = document.getElementById('basic');
const allergies = document.getElementById('allergies');
const diets = document.getElementById('diets');
const calories = document.getElementById('calories');
const nutrients = document.getElementById('nutrients');

function getQueryParam(name) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get(name);
}

function hideAnother(nameActive) {
    [basic, allergies, calories, nutrients].forEach(item => {
        if (nameActive === item) {
            document.getElementById(item.id + 'Options').style.display = 'block';
            item.classList.add("btn-primary");
            item.classList.remove("btn-white");
        } else {
            document.getElementById(item.id + 'Options').style.display = 'none';
            item.classList.add("btn-white");
            item.classList.remove("btn-primary");
        }
    });
}

[basic, allergies, calories, nutrients].forEach(item => {
    item.addEventListener('click', function() {
        hideAnother(item);
    });
});

// Function to populate the award form with data for editing
function populateFormForEditing(entry) {
    const selectElement = document.getElementById('cuisineType');
    document.getElementById('id').value = entry.id || "";
    document.getElementById('kcal').value = entry.kcal || "";
    populateList(entry.cuisineType, 'cuisineType');
    populateList(entry.mealType, 'mealType');
    populateList(entry.dishType, 'dishType');
    populateList(entry.health, 'health');
    populateList(entry.diet, 'diet');

}

function populateList(arrayElement, fieldName) {
    const selectElement = document.getElementById(fieldName);
    if (Array.isArray(arrayElement)) {
        for (const option of selectElement.options) {
            if (arrayElement.includes(option.value)) {
                option.selected = true;
            }
        }
    }
}

['fat', 'fatsat', 'fattrn', 'mono', 'poly', 'carb', 'fiber', 'sugar', 'protein',
    'cholesterol', 'sodium', 'calcium', 'magnesium', 'potassium', 'iron', 'phos',
    'vita', 'vitc', 'thiaminb1', 'riboflavinB2', 'niacinB3', 'vitB6', 'folate',
    'vitb12', 'vitD', 'vitE', 'vitK'
].forEach(item => {
    const element = document.getElementById(item + 'Toggle');
    element.addEventListener('change', function() {
        if (element.checked) {
            document.getElementById(item + 'Slider').style.display = 'block';
        } else {
            document.getElementById(item + 'Slider').style.display = 'none';
        }
    });
});

(function($) {
    $(document).ready(function() {
        hideAnother(basic);
        const encodedJsonData = getQueryParam("json_data");
        let entry = {};

        if (encodedJsonData) {
            const jsonData = decodeURIComponent(encodedJsonData);
            const jsonObject = JSON.parse(jsonData);
            populateFormForEditing(jsonObject);
            entry = jsonObject;
        }
        ['fat', 'fatsat', 'fattrn', 'mono', 'poly', 'carb', 'fiber', 'sugar', 'protein'].forEach(item => {
            let initArray;
            if (entry[item]) {
                document.getElementById(item + 'Slider').style.display = 'block';
                document.getElementById(item + 'Toggle').checked = true;
                initArray = entry[item]
            }
            $('#' + item + 'Slider').customSlider({
                start: initArray ? initArray : [35, 65],
                step: 1,
                range: {
                    min: 0,
                    max: 1000,
                },
                connect: true,
                tooltips: true,
                pips: {
                    mode: 'positions',
                    values: [0, 25, 50, 75, 100],
                    density: 10
                }
            });
        });
        ['cholesterol', 'sodium', 'magnesium', 'potassium', 'iron', 'phos',
            'vitc', 'thiaminb1', 'riboflavinB2', 'niacinB3', 'vitB6', 'vitE', 'calcium'
        ].forEach(item => {
            let initArray;
            if (entry[item]) {
                document.getElementById(item + 'Slider').style.display = 'block';
                document.getElementById(item + 'Toggle').checked = true;
                initArray = entry[item]
            }
            $('#' + item + 'Slider').customSlider({
                start: initArray ? initArray : [3000, 6000],
                step: 1,
                range: {
                    min: 0,
                    max: 10000,
                },
                connect: true,
                tooltips: true,
                pips: {
                    mode: 'positions',
                    values: [0, 2500, 5000, 7500, 10000],
                    density: 10
                }
            });
        });
        ['vita', 'folate',
            'vitb12', 'vitD', 'vitK'
        ].forEach(item => {
            let initArray;
            if (entry[item]) {
                document.getElementById(item + 'Slider').style.display = 'block';
                document.getElementById(item + 'Toggle').checked = true;
                initArray = entry[item]
            }
            $('#' + item + 'Slider').customSlider({
                start: initArray ? initArray : [3.5, 6.5],
                step: 0.1,
                range: {
                    min: 0,
                    max: 1000,
                },
                connect: true,
                tooltips: true,
                pips: {
                    mode: 'positions',
                    values: [0, 250, 500, 750, 1000],
                    density: 10
                }
            });
        });
    });
})(jQuery);

Telegram.WebApp.onEvent("mainButtonClicked", function() {
    let filt = {
        id: document.getElementById('id').value,
        kcal: document.getElementById('kcal').value,
        health: Array.from(document.getElementById('health').selectedOptions).map(function(option) {
            return option.value;
        }),
        diet: Array.from(document.getElementById('diet').selectedOptions).map(function(option) {
            return option.value;
        }),
        cuisineType: Array.from(document.getElementById('cuisineType').selectedOptions).map(function(option) {
            return option.value;
        }),
        mealType: Array.from(document.getElementById('mealType').selectedOptions).map(function(option) {
            return option.value;
        }),
        dishType: Array.from(document.getElementById('dishType').selectedOptions).map(function(option) {
            return option.value;
        }),
    };
    ['fat', 'fatsat', 'fattrn', 'mono', 'poly', 'carb', 'fiber', 'sugar', 'protein',
        'cholesterol', 'sodium', 'calcium', 'magnesium', 'potassium', 'iron', 'phos',
        'vita', 'vitc', 'thiaminb1', 'riboflavinB2', 'niacinB3', 'vitB6', 'folate',
        'vitb12', 'vitD', 'vitE', 'vitK'
    ].forEach(item => {
        const element = document.getElementById(item + 'Toggle');
        if (element.checked) {
            let selVal = document.getElementById(item + 'Slider').noUiSlider.get();
            filt[item] = [selVal[0], selVal[1]];
        }
    });
    tg.sendData(JSON.stringify({
        filter: filt
    }));
    tg.close();
});