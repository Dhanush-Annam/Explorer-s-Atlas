let rightmovementbutton = document.querySelector("#right");
let leftmovementbutton = document.querySelector("#left");

let count = 1;
let slide1 = document.querySelector("#slide1");
let slide2 = document.querySelector("#slide2");
let slide3 = document.querySelector("#slide3");
let slide4 = document.querySelector("#slide4");

rightmovementbutton.onclick = () => {
  if (count == 1) {
    count = 2;
    slide2.checked = true;
  } else if (count == 2) {
    count = 3;
    slide3.checked = true;
  } else if (count == 3) {
    count = 4;
    slide4.checked = true;
  }
};

leftmovementbutton.onclick = () => {
  if (count == 2) {
    count = 1;
    slide1.checked = true;
  } else if (count == 3) {
    count = 2;
    slide2.checked = true;
  } else if (count == 4) {
    count = 3;
    slide3.checked = true;
  }
};

const bookNowButtons = document.querySelectorAll(".buttonvishwanth");
bookNowButtons.forEach((button) => {
  button.addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "/bookingpage";
  });
});
