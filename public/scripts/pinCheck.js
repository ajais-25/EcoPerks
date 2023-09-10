const message = document.querySelector(".js-message");

function checkPin() {
  const pincode = document.querySelector(".js-pincode").value;

  if (pincode > 700000 && pincode <= 700100) {
    if (message.classList.contains("not-available")) {
      message.classList.remove("not-available");
    }

    message.innerHTML = `Hurray! We are available here.`;
    message.classList.add("available");
  } else {
    if (message.classList.contains("available")) {
      message.classList.remove("available");
    }

    message.innerHTML = `Not Available`;
    message.classList.add("not-available");
  }
}
