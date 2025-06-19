let globalUserEmail = null;
function fetchUsername() {
  return fetch("/username")
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
        globalUserEmail = data;
      } else {
        console.warn(
          "Element with ID 'loggedInEmailDisplay' not found to display email."
        );
      }

      loadTasks();
      loadTrips();
      loadBookedHotels();
      return data;
    })
    .catch((error) => {
      console.error("Error fetching username:", error);
    });
}
function loadTasks() {
  if (!globalUserEmail) {
    console.warn("No user email available, cannot load tasks");
    return;
  }
  fetch(
    `http://localhost:8080/todo/get?userEmail=${encodeURIComponent(
      globalUserEmail
    )}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((tasks) => {
      console.log("Tasks loaded from backend:", tasks);
      const tasklist = document.getElementById("tasklist");
      if (tasklist) {
        tasklist.innerHTML = "";
      }
      tasks.forEach((task) => displayTask(task));
    })
    .catch((error) => {
      console.error("Error loading tasks:", error);
    });
}

function loadTrips() {
  if (!globalUserEmail) {
    console.warn("No user email available, cannot load trips");
    return;
  }
  fetch(
    `http://localhost:8080/bookings/user/${encodeURIComponent(globalUserEmail)}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((trips) => {
      console.log("Trips loaded from backend:", trips);
      displayTrips(trips);
    })
    .catch((error) => {
      console.error("Error loading trips:", error);
    });
}

function loadBookedHotels() {
  const hotelsContainer = document.getElementById("booked-hotel");
  if (!hotelsContainer) {
    console.error("Hotels container element with ID 'booked-hotel' not found");
    return;
  }
  if (!globalUserEmail) {
    console.warn("No user email available, cannot load booked hotels");
    return;
  }
  fetch(
    `http://localhost:8080/api/hotelbooking/${encodeURIComponent(
      globalUserEmail
    )}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.statusText);
      }
      return response.json();
    })
    .then((hotels) => {
      console.log("Booked hotels loaded from backend:", hotels);
      displayBookedHotels(hotels);
    })
    .catch((error) => {
      console.error("Error loading booked hotels:", error);
    });
}

function displayBookedHotels(hotels) {
  const hotelsContainer = document.getElementById("booked-hotel"); // Correct target
  if (!hotelsContainer) {
    console.error("Hotels container not found");
    return;
  }
  hotelsContainer.innerHTML = "";

  if (!Array.isArray(hotels) || hotels.length === 0) {
    const noHotelsMessage = document.createElement("p");
    noHotelsMessage.textContent = "No booked hotels found.";
    noHotelsMessage.style.fontStyle = "italic";
    noHotelsMessage.style.color = "#666";
    hotelsContainer.appendChild(noHotelsMessage);
    return;
  }

  const hotelsList = document.createElement("ol");
  hotelsList.style.listStyleType = "decimal";
  hotelsList.style.paddingLeft = "20px";

  hotels.forEach((hotel) => {
    const hotelItem = document.createElement("li");
    hotelItem.style.marginBottom = "12px";
    hotelItem.style.padding = "10px";
    hotelItem.style.backgroundColor = "#f8f9fa";
    hotelItem.style.borderRadius = "6px";
    hotelItem.style.border = "1px solid #dee2e6";

    let checkInStr = "";
    let checkOutStr = "";
    let durationStr = "";

    if (hotel.checkInDate && hotel.checkOutDate) {
      const checkInDate = new Date(hotel.checkInDate);
      const checkOutDate = new Date(hotel.checkOutDate);
      const duration = Math.ceil(
        (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
      );

      checkInStr = checkInDate.toLocaleDateString();
      checkOutStr = checkOutDate.toLocaleDateString();
      durationStr = `${duration} night${duration !== 1 ? "s" : ""}`;
    }

    hotelItem.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 10px;">
        <div style="flex-grow: 1;">
          <strong>Hotel Booking #${hotel.id}</strong> - ${hotel.fullName}
          ${durationStr ? ` (${durationStr})` : ""}
          <br>
          <small style="color: #666;">
            ${
              checkInStr && checkOutStr
                ? `${checkInStr} to ${checkOutStr}`
                : "Dates not available"
            }
            | Room: ${hotel.roomType}
            | Guests: ${hotel.guests}
            | Phone: ${hotel.phone}
          </small>
          ${
            hotel.specialRequests &&
            hotel.specialRequests.trim() &&
            hotel.specialRequests.trim() !== "no"
              ? `<br><small style="color: #007bff;">Special Requests: ${hotel.specialRequests}</small>`
              : ""
          }
        </div>
        <span style="background-color: #28a745; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">BOOKED</span>
      </div>
    `;

    hotelsList.appendChild(hotelItem);
  });

  hotelsContainer.appendChild(hotelsList);
}

function displayTrips(trips) {
  const tripsContainer = document.querySelector("#track-trips ol");
  if (!tripsContainer) {
    console.error("Trips container not found");
    return;
  }

  tripsContainer.innerHTML = "";

  if (trips.length === 0) {
    const noTripsMessage = document.createElement("li");
    noTripsMessage.textContent = "No upcoming trips found.";
    noTripsMessage.style.fontStyle = "italic";
    noTripsMessage.style.color = "#666";
    tripsContainer.appendChild(noTripsMessage);
    return;
  }

  trips.forEach((trip) => {
    const tripItem = document.createElement("li");
    tripItem.style.marginBottom = "8px";
    tripItem.style.padding = "8px";
    tripItem.style.backgroundColor = "#f8f9fa";
    tripItem.style.borderRadius = "4px";
    tripItem.style.border = "1px solid #dee2e6";

    const travelDate = new Date(trip.travelDate);
    const returnDate = new Date(trip.returnDate);
    const duration = Math.ceil(
      (returnDate - travelDate) / (1000 * 60 * 60 * 24)
    );

    const travelDateStr = travelDate.toLocaleDateString();
    const returnDateStr = returnDate.toLocaleDateString();
    tripItem.innerHTML = `
      <div style="display: flex; justify-content: between; align-items: center; gap: 10px;">
        <div style="flex-grow: 1;">
          <strong>${trip.destination || "Unknown"}</strong> - ${
      isNaN(duration) ? "?" : duration
    } days
          <br>
          <small style="color: #666;">
            ${travelDateStr || "No start date"} to ${
      returnDateStr || "No end date"
    }
            ${trip.name ? `| Traveler: ${trip.name}` : ""}
          </small>
        </div>
      </div>
    `;

    tripsContainer.appendChild(tripItem);
  });
}

document.addEventListener("DOMContentLoaded", fetchUsername);

// Calendar functions
function addRow() {
  let tab = document.getElementById("Calendar-table");
  let tableLength = tab.rows.length;
  let currentRow = tab.insertRow(tableLength);

  let sNo = document.createElement("input");
  sNo.setAttribute("type", "text");
  sNo.setAttribute("value", tableLength);
  sNo.setAttribute("disabled", "true");
  sNo.setAttribute("class", "text-left");
  sNo.setAttribute("id", tableLength);

  let Name = document.createElement("input");
  Name.setAttribute("type", "text");

  let EventDate = document.createElement("input");
  EventDate.setAttribute("type", "date");

  let Remarks = document.createElement("input");
  Remarks.setAttribute("type", "text");

  let remBtn = document.createElement("input");
  remBtn.setAttribute("type", "button");
  remBtn.setAttribute("value", " - ");
  remBtn.setAttribute("onClick", "removeRow(this)");

  let currentCell = currentRow.insertCell(0);
  currentCell.appendChild(sNo);

  currentCell = currentRow.insertCell(1);
  currentCell.appendChild(Name);

  currentCell = currentRow.insertCell(2);
  currentCell.appendChild(EventDate);

  currentCell = currentRow.insertCell(3);
  currentCell.appendChild(Remarks);

  currentCell = currentRow.insertCell(4);
  currentCell.appendChild(remBtn);
}

function removeRow(button) {
  let td = button.parentNode;
  let tr = td.parentNode;
  tr.parentNode.removeChild(tr);
}

// --- To-Do List Variables ---
let addtaskbtn = document.getElementById("addtaskbtn");
let taskinput = document.getElementById("taskinput");
let taskadded = document.getElementById("taskadded");
let tasklist = document.getElementById("tasklist");

// Wait for DOM to be ready before adding event listeners
document.addEventListener("DOMContentLoaded", function () {
  addtaskbtn = document.getElementById("addtaskbtn");
  taskinput = document.getElementById("taskinput");
  taskadded = document.getElementById("taskadded");
  tasklist = document.getElementById("tasklist");

  if (addtaskbtn) {
    addtaskbtn.onclick = () => {
      taskinput.style.visibility = "visible";
      taskadded.style.visibility = "visible";
      addtaskbtn.style.visibility = "hidden";
    };
  }

  if (taskinput) {
    taskinput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        addtodolist();
      }
    });
  }

  // Add trip form event listeners
  const addTripBtn = document.getElementById("addTripBtn");
  const tripForm = document.getElementById("tripForm");
  const cancelTripBtn = document.getElementById("cancelTripBtn");

  if (addTripBtn) {
    addTripBtn.onclick = () => {
      tripForm.style.display = "block";
      addTripBtn.style.display = "none";
    };
  }

  if (cancelTripBtn) {
    cancelTripBtn.onclick = () => {
      tripForm.style.display = "none";
      addTripBtn.style.display = "block";
      // Clear form
      document.getElementById("tripName").value = "";
      document.getElementById("tripDestination").value = "";
      document.getElementById("tripTravelDate").value = "";
      document.getElementById("tripReturnDate").value = "";
    };
  }

  // Add trip form submit
  const tripFormElement = document.getElementById("tripFormElement");
  if (tripFormElement) {
    tripFormElement.addEventListener("submit", function (e) {
      e.preventDefault();
      addTrip();
    });
  }
});

// --- Function to display a single task on the frontend ---
function displayTask(taskObj) {
  const tasklist = document.getElementById("tasklist");
  if (!tasklist) {
    console.error("Task list element not found");
    return;
  }

  const container = document.createElement("div");
  container.style.display = "flex";
  container.style.alignItems = "center";
  container.style.margin = "4px 0";
  container.style.gap = "8px";
  container.setAttribute("data-task-id", taskObj.taskId);

  const radio = document.createElement("input");
  radio.type = "radio";
  radio.name = "taskGroup";

  radio.addEventListener("change", function () {
    if (this.checked) {
      const taskId = taskObj.taskId;

      fetch(`http://localhost:8080/todo/delete?id=${taskId}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              "Failed to delete task from server: " + response.statusText
            );
          }
          container.remove();
          console.log(
            `Task with ID ${taskId} deleted from backend and frontend.`
          );
        })
        .catch((error) => {
          console.error("Error deleting task:", error);
          this.checked = false;
          alert("Failed to delete task. Please try again.");
        });
    }
  });

  const label = document.createElement("label");
  label.innerText = taskObj.taskContent;

  container.appendChild(radio);
  container.appendChild(label);
  tasklist.appendChild(container);
}

// --- Main function to add a To-Do List item ---
function addtodolist() {
  const taskcontent = taskinput.value.trim();
  if (!taskcontent) return;

  if (!globalUserEmail) {
    alert("User email not loaded yet. Please try again in a moment.");
    return;
  }

  const userEmail = globalUserEmail;
  const params = new URLSearchParams();
  params.append("userEmail", userEmail);
  params.append("taskContent", taskcontent);

  fetch("http://localhost:8080/todo/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.statusText);
      }
      return response.json();
    })
    .then((createdTask) => {
      displayTask(createdTask);
      console.log("Task added to database. Created task:", createdTask);
    })
    .catch((error) => {
      console.error("Error adding task:", error);
      alert("Failed to add task. Please try again.");
    });

  taskinput.value = "";
  addtaskbtn.style.visibility = "visible";
  taskinput.style.visibility = "hidden";
  taskadded.style.visibility = "hidden";
}

// --- Function to add a trip ---
function addTrip() {
  const name = document.getElementById("tripName").value.trim();
  const destination = document.getElementById("tripDestination").value.trim();
  const travelDate = document.getElementById("tripTravelDate").value;
  const returnDate = document.getElementById("tripReturnDate").value;

  if (!name || !destination || !travelDate || !returnDate) {
    alert("Please fill in all fields.");
    return;
  }

  if (new Date(travelDate) >= new Date(returnDate)) {
    alert("Return date must be after travel date.");
    return;
  }

  if (!globalUserEmail) {
    alert("User email not loaded yet. Please try again in a moment.");
    return;
  }

  const params = new URLSearchParams();
  params.append("email", globalUserEmail);
  params.append("name", name);
  params.append("destination", destination);
  params.append("travelDate", travelDate);
  params.append("returnDate", returnDate);

  fetch("http://localhost:8080/bookings/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.statusText);
      }
      return response.json();
    })
    .then((createdTrip) => {
      console.log("Trip added to database:", createdTrip);
      // Reload trips to show the new one
      loadTrips();

      // Hide form and show add button
      document.getElementById("tripForm").style.display = "none";
      document.getElementById("addTripBtn").style.display = "block";

      // Clear form
      document.getElementById("tripName").value = "";
      document.getElementById("tripDestination").value = "";
      document.getElementById("tripTravelDate").value = "";
      document.getElementById("tripReturnDate").value = "";
    })
    .catch((error) => {
      console.error("Error adding trip:", error);
      alert("Failed to add trip. Please try again.");
    });
}

// --- Wishlist Variables and Functions ---
let addwishbtn = document.getElementById("addwishbtn");
let wishinput = document.getElementById("wishinput");
let wishadded = document.getElementById("wishadded");
let wishinputdiv = document.getElementById("wishinputdiv");
let addtowishlist = document.getElementById("add-to-wish-list");

document.addEventListener("DOMContentLoaded", function () {
  addwishbtn = document.getElementById("addwishbtn");
  wishinput = document.getElementById("wishinput");

  if (addwishbtn) {
    addwishbtn.onclick = () => {
      wishinput.style = "visibility:visible;";
      wishadded.style = "visibility:visible;";
      addwishbtn.style = "visibility:hidden;";
    };
  }

  if (wishinput) {
    wishinput.addEventListener("keypress", function (k) {
      if (k.key === "Enter") {
        addwishlist();
      }
    });
  }
});

function addwishlist() {
  const wishinput = document.getElementById("wishinput");
  const addwishbtn = document.getElementById("addwishbtn");
  const wishadded = document.getElementById("wishadded");
  const addtowishlist = document.getElementById("add-to-wish-list");

  let wish = wishinput.value.trim();
  if (!wish) {
    console.log("Wish input is empty, not adding.");
    return;
  }

  let z = document.createElement("div");
  z.style.display = "flex";
  z.style.alignItems = "center";
  z.style.gap = "8px";
  z.style.margin = "4px 0";

  let x = document.createElement("INPUT");
  x.setAttribute("type", "radio");

  let label = document.createElement("label");
  label.innerText = wish;

  let remBtn = document.createElement("input");
  remBtn.setAttribute("type", "button");
  remBtn.setAttribute("value", " - ");
  remBtn.setAttribute("onClick", "remove(this)");

  z.append(x);
  z.append(label);
  z.append(remBtn);

  addtowishlist.append(z);

  wishinput.value = "";
  addwishbtn.style = "visibility:visible;";
  wishinput.style = "visibility:hidden;";
  wishadded.style = "visibility:hidden;";

  console.log("Wish added:", wish);
}

function remove(button) {
  button.parentNode.remove();
  console.log("Wishlist item removed.");
}
