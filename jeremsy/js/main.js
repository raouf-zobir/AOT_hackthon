fetch("DailySchedule.json")
  .then((response) => response.json())
  .then((data) => {
    scheduleElement.textContent = JSON.stringify(data, null, 2);
  })
  .catch((error) => console.error("Error:", error));

//-------------------------------------------
  fetch("free_slot.json")
  .then((response) => response.json())
  .then((data) => {
    scheduleElement.textContent = JSON.stringify(data, null, 2);
  })
  .catch((error) => console.error("Error:", error));
//-------------------------------------------
  fetch("days.json")
  .then((response) => response.json())
  .then((data) => {
    scheduleElement.textContent = JSON.stringify(data, null, 2);
  })
  .catch((error) => console.error("Error:", error));
