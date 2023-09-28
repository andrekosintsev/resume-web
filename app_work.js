let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.textColor = '#FFFFFF';
tg.MainButton.color = '#2CAB37';
tg.MainButton.setText("Save");

tg.SettingsButton =[{"type":"destructive", "text": "Remove Job"}];

tg.MainButton.show();

function getQueryParam(name) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get(name);
}

const encodedJsonData = getQueryParam("json_data");

let workExperienceForm = document.getElementById('work_experience_form');
let button = document.getElementById("myButton");
var maxCharacters = 1000;
let summaryText = new SimpleMDE({
            element: document.getElementById("summary"),
            spellChecker: false, // Enable spell checker if desired
            toolbar: [
                "bold",           // Bold text
                "italic",         // Italic text
                "heading",        // Headings (h1, h2, h3, etc.)
                "|",              // Separator
                "unordered-list", // Unordered list (bullets)
                "ordered-list",   // Ordered list (numbers)
                "|",              // Separator
                "preview"        // Toggle preview mode
            ]
        });
let highlightsText = new SimpleMDE({
            element: document.getElementById("highlights"),
            spellChecker: false, // Enable spell checker if desired
            toolbar: [
                "bold",           // Bold text
                "italic",         // Italic text
                "heading",        // Headings (h1, h2, h3, etc.)
                "|",              // Separator
                "unordered-list", // Unordered list (bullets)
                "ordered-list",   // Ordered list (numbers)
                "|",              // Separator
                "preview"        // Toggle preview mode
            ]
        });

[summaryText,highlightsText].forEach(item => {
            item.codemirror.on("change", function () {
                        var currentText = summaryText.value();
                        var currentLength = currentText.length;

                        if (currentLength > maxCharacters) {
                            currentText = currentText.substring(0, maxCharacters);
                            summaryText.value(currentText);
                        }
                    });
        });

if (encodedJsonData) {
    const jsonData = decodeURIComponent(encodedJsonData);
    const jsonObject = JSON.parse(jsonData);
    populateFormForEditing(jsonObject);
} else {
    populateFormForEditing({"industry":"Technology"});
}

function populateFormForEditing(entry) {
    document.getElementById('id').value = entry.id || "";
    document.getElementById('name').value = entry.name || "";
    document.getElementById('address').value = entry.address || "";
    document.getElementById('website').value = entry.website || "";
    document.getElementById('industry').value = entry.industry || "";
    document.getElementById('position').value = entry.position || "";
    document.getElementById('startDate').value = entry.startDate|| "";
    document.getElementById('endDate').value = entry.endDate || "";
    document.getElementById('summary').value = entry.summary || "";
    document.getElementById('highlights').value = entry.highlights || "";
    document.getElementById('keywords').value = entry.keywords || "";
}


Telegram.WebApp.onEvent("mainButtonClicked", function() {
    if (validateInput(['name', 'industry', 'position', 'startDate', 'endDate'])) {
            return;
    }
    tg.sendData(JSON.stringify({
        works: [{
                           id: document.getElementById('id').value,
                           name: document.getElementById('name').value,
                           address: document.getElementById('address').value,
                           website: document.getElementById('website').value,
                           industry: document.getElementById('industry').value,
                           position: document.getElementById('position').value,
                           startDate: document.getElementById('startDate').value,
                           endDate: document.getElementById('endDate').value,
                           summary: document.getElementById('summary').value,
                           highlights: document.getElementById('highlights').value,
                           keywords: document.getElementById('keywords').value
                       }]
    }));
    tg.close();
});