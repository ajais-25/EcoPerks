function datePicked(day, currentMonth, currentYear) {
  const dayPicked = document.querySelector(`.js-day${day}`);
  const dateSelected = document.querySelector(".js-show-date");

  const date = new Date();
  const currentDate = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const slotPicked =
    dayPicked.innerHTML + "-" + (currentMonth + 1) + "-" + currentYear;

  if (
    dayPicked.innerHTML < currentDate ||
    currentMonth < month ||
    currentYear < year
  ) {
    if (dateSelected.value != "Date Selected") {
      dateSelected.value = "Date Selected";
    }

    alert(`Picked Wrong Date!`);
  } else {
    dateSelected.value = slotPicked;
  }
}

function confirm() {
  const dateSelected = document.querySelector(".js-show-date").value;
  const name = document.querySelector(".js-name").value;
  const address = document.querySelector(".js-address").value;
  const pin = document.querySelector(".js-pin").value;
  const contact = document.querySelector(".js-contact").value;

  console.log(name);

  if (
    name === undefined ||
    address === undefined ||
    pin === undefined ||
    contact === undefined ||
    dateSelected === "Date Selected"
  ) {
    alert(`Kindly fill the details correctly first!`);
  } else {
    alert(`Booking Confirmed!`);
  }
}
//module.exports = confirm;
//module.exports = datePicked;
