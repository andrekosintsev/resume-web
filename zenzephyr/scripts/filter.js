const basic = document.getElementById('basic');
const allergies = document.getElementById('allergies');
const diets = document.getElementById('diets');
const calories = document.getElementById('calories');
const nutrients = document.getElementById('nutrients');

const basicOptions = document.getElementById('basicOptions');
const allergiesOptions = document.getElementById('allergiesOptions');


function hideAnother(nameActive) {
    [basic,allergies,calories,nutrients].forEach(item => {
        if(nameActive === item) {
            document.getElementById(item.id +'Options').style.display = 'block';
            item.classList.add("btn-primary");
            item.classList.remove("btn-white");
        } else {
            document.getElementById(item.id +'Options').style.display = 'none';
            item.classList.add("btn-white");
            item.classList.remove("btn-primary");
        }
    });
}

[basic,allergies,calories,nutrients].forEach(item => {
    item.addEventListener('click', function () {
        hideAnother(item);
    });
});


document.addEventListener("DOMContentLoaded", function() {
    hideAnother(basic);
});

['fat','fatsat', 'fattrn','mono','poly','carb','fiber','sugar','protein','cholesterol','sodium', 'calcium','magnesium','potassium','iron','phos', 'vita', 'vitc'].forEach(item => {
           const element = document.getElementById(item+'Toggle');

           element.addEventListener('change', function () {
             if (element.checked) {
                 document.getElementById(item+'Slider').style.display = 'block';
             } else {
                 document.getElementById(item+'Slider').style.display = 'none';
             }
             });
});

(function ($) {
['fat','fatsat', 'fattrn','mono','poly','carb','fiber','sugar','protein','cholesterol','sodium', 'calcium','magnesium','potassium','iron','phos', 'vita', 'vitc'].forEach(item => {
           $(document).ready(function() {
               // Slider example 3
               $('#'+item+'Slider').customSlider({
                 start: [35, 65],
                 step: 1,
                 range: {
                   min: 0,
                   max: 100,
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
});
})(jQuery);

