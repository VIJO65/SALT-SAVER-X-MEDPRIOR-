const calculate = document.getElementById("calculate");
const reset = document.getElementById("reset");

const fields = [
    document.getElementById("age"),
    document.getElementById("days"),
    document.getElementById("severity"),
    document.getElementById("symptoms"),
    document.getElementById("medicine"),
    document.getElementById("quantity")
];

function validateField(field) {

    let value = field.value.trim();
    let error = "";

    if (value === "") {
        error = "This field is required!";
    }

    else if (field.id === "age" && (Number(value) < 0 || Number(value) > 120)) {
        error = "Enter a valid age between 0 and 120!";
    }

    else if (field.id === "days" && Number(value) < 0) {
        error = "Days cannot be negative!";
    }

    else if (field.id === "quantity" && Number(value) < 1) {
        error = "Quantity must be at least 1!";
    }

    field.setCustomValidity(error);

    return error === "";
}


// LIVE INPUT VALIDATION

fields.forEach(function(field) {

    field.addEventListener("input", function() {
        validateField(field);
    });

    field.addEventListener("change", function() {
        validateField(field);
    });

});


// CALCULATE PRIORITY

calculate.addEventListener("click", function() {

    let valid = true;

    fields.forEach(function(field) {

        validateField(field);

        if (!field.checkValidity()) {
            field.reportValidity();
            valid = false;
        }

    });

    if (!valid) {
        return;
    }

    const age = Number(document.getElementById("age").value);
    const days = Number(document.getElementById("days").value);

    const severity = document.getElementById("severity").value;
    const symptoms = document.getElementById("symptoms").value;
    const medicine = document.getElementById("medicine").value;

    const quantity = Number(document.getElementById("quantity").value);

    let score = 0;

    if (age >= 60) {
        score += 10;
    }

    if (days >= 7) {
        score += 10;
    }

    if (severity === "low") {
        score += 10;
    }

    else if (severity === "medium") {
        score += 20;
    }

    else if (severity === "high") {
        score += 30;
    }

    score += 10;

    if (quantity >= 5) {
        score += 10;
    }

    score = Math.min(score, 100);

    let level;
    let message;

    if (score >= 60) {
        level = "High Demonstration Score";
        message = "This case receives a higher demonstration queue score.";
    }

    else if (score >= 30) {
        level = "Medium Demonstration Score";
        message = "This case receives a medium demonstration queue score.";
    }

    else {
        level = "Low Demonstration Score";
        message = "This case receives a lower demonstration queue score.";
    }

    document.getElementById("score").innerText = score + " / 100";

    document.getElementById("level").innerText = level;

    document.getElementById("message").innerText = message;

    document.getElementById("details").innerHTML = `
        <p><b>Patient Age:</b> ${age}</p>
        <p><b>Days Suffering:</b> ${days}</p>
        <p><b>Pain Severity:</b> ${severity.toUpperCase()}</p>
        <p><b>Symptom:</b> ${symptoms.toUpperCase()}</p>
        <p><b>Medicine:</b> ${medicine.toUpperCase()}</p>
        <p><b>Quantity:</b> ${quantity}</p>
    `;

});


// RESET

reset.addEventListener("click", function() {

    fields.forEach(function(field) {
        field.value = "";
        field.setCustomValidity("");
    });

    document.getElementById("score").innerText = "-- / 100";

    document.getElementById("level").innerText = "Awaiting Prediction";

    document.getElementById("message").innerText =
        "Enter patient information to calculate the demonstration queue score.";

    document.getElementById("details").innerHTML = "";

});


