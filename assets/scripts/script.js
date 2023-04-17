const day = document.querySelector("#day");
const month = document.querySelector("#month")
const year = document.querySelector("#year")

const label = document.querySelectorAll("#form label");
const btn = document.querySelector("#form button");

let mensageError = false;

const err = {
    empty: "This field is required",
    invalid: "Must be a valid",
    dataInvalid: "Must be a valid date"
}

let currentDate = new Date();

let yearMax = currentDate.getFullYear();

btn.addEventListener ("click", (e) => {
    e.preventDefault();

    if (mensageError === true) {
        deleteMensageError()
    }
    validateDay(day.value)
    validateMonth(month.value)
    validateYear(year.value)
})

function validateDay(day) {
    if (!day) {
        displayError(err.empty, "day")
    }
    else if (day < 1 || day > 31) {
        displayError(err.invalid, "day")
    }
}

function validateMonth(month) {
    if (!month) {
        displayError(err.empty, "month")
    }
    else if (month < 1 || month > 12) {
        displayError(err.invalid, "month"")
    }
}

function validateYear(year) {
    if (!year) {
        displayError(err.empty, "year")
    }
    else if (year < 1900 || year > yearMax) {
        displayError(err.invalid, "year")
    }
}

function displayError(error, type) {
    const erro = document.createElement("span");
    erro.textContent = `${error}`;
    erro.classList.add("erro-span");

    if (type === "day") {
        label[0].appendChild(erro)
        day.classList.add("erro-input")
    }
    else if (type === "month") {
        label[1].appendChild(erro)
        month.classList.add("erro-input")
    }
    else {
        label[2].appendChild(erro)
        year.classList.add("erro-input")
    }

    mensageError = true;
}

function deleteMensageError() {
    let spanError = document.querySelectorAll("label span");
    spanError.forEach(removeItem)
    day.classList.remove("erro-input")
    month.classList.remove("erro-input")
    year.classList.remove("erro-input")
    
    mensageError = false;
}

function removeItem(item) {
    let x = item;
    x.remove()
}