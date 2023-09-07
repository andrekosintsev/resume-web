let messageDiv = document.getElementById("message");

function validateInput(fieldsToValidate) {
    let invalid = false;
    fieldsToValidate.forEach(item => {
        const value = document.getElementById(item).value.trim();
        const field = document.getElementById(item);
        if (value === "") {
            field.classList.add("required-field");
        } else {
            field.classList.remove("required-field");
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