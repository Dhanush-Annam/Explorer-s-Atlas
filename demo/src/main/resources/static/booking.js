let globalUserEmail = null;
let travelTip = null;
function fetchUsername() {
  fetch("/username")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.statusText);
      }
      return response.text();
    })
    .then((data) => {
      console.log("Retrieved Email (from /username endpoint):", data);

      const emailDisplayElement = document.getElementById(
        "loggedInEmailDisplay"
      );
      if (emailDisplayElement) {
      } else {
        console.warn(
          "Element with ID 'loggedInEmailDisplay' not found to display email."
        );
      }

      const emailInput = document.getElementById("email");
      if (emailInput) {
        if (
          data &&
          data !== "No email found in session. Please register or log in."
        ) {
          emailInput.value = data;
          globalUserEmail = data;
          emailInput.readOnly = true;
          emailInput.style.backgroundColor = "#f0f0f0";
        } else {
          emailInput.value = "";
          emailInput.readOnly = false;
          emailInput.style.backgroundColor = "";
          globalUserEmail = null;
        }
      } else {
        console.warn(
          "Email input element with ID 'email' not found in the form."
        );
      }
    })
    .catch((error) => {
      console.error("Error fetching email:", error);
      const emailInput = document.getElementById("email");
      if (emailInput) {
        emailInput.value = "";
        emailInput.readOnly = false;
        emailInput.style.backgroundColor = "";
      }
      const errorDisplayElement = document.getElementById("errorDisplay");
      if (errorDisplayElement) {
        errorDisplayElement.textContent =
          "Error loading email: " + error.message;
      }
    });
}

function fetchTravelTip() {
  fetch("/api/tips")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then((data) => {
      travelTip = data;
    })
    .catch((error) => {
      console.error("Error fetching travel tip:", error);
      travelTip = "";
    });
}

function handleBookingFormSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const name = form.elements["name"].value;
  const email = form.elements["email"].value;
  const destination = form.elements["destination"].value;
  const travelDate = form.elements["travel-date"].value;
  const returnDate = form.elements["return-date"].value;

  if (!name || !email || !destination || !travelDate || !returnDate) {
    alert("Please fill in all required fields.");
    return;
  }
  const formData = new URLSearchParams();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("destination", destination);
  formData.append("travelDate", travelDate);
  formData.append("returnDate", returnDate);

  fetch("http://localhost:8080/bookings/add",{
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData.toString(),
  })
    .then((response) => {
      if (!response.ok) {
        return response.text().then((text) => {
          throw new Error(text || "Unknown server error");
        });
      }
      return response.text();
    })
    .then((data) => {
      console.log("Booking successful:", data);
      alert("Booking successful! " + travelTip);
      form.reset();
      const emailInput = document.getElementById("email");
      if (emailInput) {
        emailInput.readOnly = false;
        emailInput.style.backgroundColor = "";
      }
    })
    .then(() => {
      window.location.href = "/dashbourd";
    });
}

document.addEventListener("DOMContentLoaded", () => {
  fetchUsername();
  fetchTravelTip();
  const bookingForm = document.querySelector("form");
  if (bookingForm) {
    bookingForm.addEventListener("submit", handleBookingFormSubmit);
  } else {
    console.error("Booking form not found on the page.");
  }
});
