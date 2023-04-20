const day = document.querySelector("#day");
const month = document.querySelector("#month")
const year = document.querySelector("#year")

const label = document.querySelectorAll("#form label");
const btn = document.querySelector("#form button");

const yearsOut = document.querySelector("#ageYear")

const monthsOut = document.querySelector("#ageMonth")

const daysOut = document.querySelector("#ageDay")

let mensageError = false;

const err = {
    empty: "This field is required",
    invalid: "Must be a valid",
    dataInvalid: "Must be a valid date"
}

let date = undefined;

let currentDate = new Date();

let yearMax = currentDate.getFullYear();

btn.addEventListener ("click", (e) => {
    e.preventDefault();

    if (mensageError === true) {
        deleteMensageError()
    }
    validateDay((parseInt(day.value)))
    validateMonth((parseInt(month.value)))
    validateYear((parseInt(year.value)))
    validateDate((parseInt(day.value)), (parseInt(month.value)), (parseInt(year.value)))

    if (mensageError === false) {

        compareDate(date)
    }

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
        displayError(err.invalid, "month")
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

    if (error === err.invalid
        
        ) {
        erro.textContent = `${error} ${type}`;
    }
    else {
        erro.textContent = `${error}`;
    }
    
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

function validateDate(day, month, year) {
    let dayMax = dayPerMonth(month, year);
    if (day > dayMax) {
        displayError(err.dataInvalid)
        return
    }
    createDate(day, month, year)
}

function createDate(day, month, year) {
    date = new Date(`${year}-${month}-${day}`)
}

function compareDate(date) {

    let ageYear = currentDate.getYear() - date.getYear();
    yearsOut.textContent = `${ageYear}`;

    if (date.getMonth() <= currentDate.getMonth()) {
        let ageMonth = currentDate.getMonth() - date.getMonth();
        monthsOut.textContent = `${ageMonth}`;
    }
    else {
        let ageMonth = currentDate.getMonth() - date.getMonth() + 12;
        monthsOut.textContent = `${ageMonth}`;
    }

    if (date.getDate() <= currentDate.getDate()) {
        let ageDay = currentDate.getDate() - date.getDate();
        daysOut.textContent = `${ageDay}`;
    }
    else {
        let dayMax = dayPerMonth(date.getMonth(), date.getYear())
        let ageDay = currentDate.getDate() - date.getDate() + dayMax;
        daysOut.textContent = `${ageDay}`;
    }
}

let dayPerMonth = (month, year) => {
    switch(month) {
        case 1: case 3: case 5: case 7: 
        case 8: case 10: case 12:
            return 31;
        case 4: case 6:
        case 9: case 11:
            return 30;
        case 2:
        if ( (year % 400 === 0) || (year % 4 === 0 && year % 100 != 0) )
            return 29;
        else
            return 28;
       }
}