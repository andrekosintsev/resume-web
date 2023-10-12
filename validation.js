let messageDiv = document.getElementById("message");

function validateInput(fieldsToValidate) {
    let invalid = false;
    fieldsToValidate.forEach(item => {
        const value = document.getElementById(item).value.trim();
        const field = document.getElementById(item);
        if (value === "") {
            field.classList.add('invalid');
        } else {
            field.classList.remove('invalid');
        }
    });
    fieldsToValidate.forEach(item => {
        const value = document.getElementById(item).value.trim();
        if (value === "") {
            messageDiv.textContent = "Please fill in all mandatory fields.";
            messageDiv.style.color = "red";
            invalid = true;
            return;
        }
    });
    if (!invalid) {
        messageDiv.textContent = "";
    }
    return invalid;
}


// Get the input element
[document.getElementById("date"), document.getElementById("startDate"), document.getElementById("endDate"),
    document.getElementById("releaseDate"),
    document.getElementById("dDate")
]
.forEach(item => {
    if (!item) {
        return;
    }
    item.addEventListener('input', function() {
        // Remove any non-digit characters
        const cleanedInput = this.value.replace(/\D/g, '');

        // Check if the input is not empty
        if (cleanedInput.length > 0) {
            // Extract day, month, and year parts
            let day = cleanedInput.slice(0, 2);
            let month = cleanedInput.slice(2, 4);
            let year = cleanedInput.slice(4, 8);
            // Validate day and month
            if (day > 31) day = '31';
            if (month > 12) month = '12';

            // Format the date as DD.MM.YYYY
            let formattedDate = day;
            if (month) formattedDate += '.' + month;
            if (year) formattedDate += '.' + year;
            this.value = formattedDate;
        }
    });
});