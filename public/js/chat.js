const socket = io();

socket.on("message", (msg) => {
  console.log(msg);
});

document.querySelector("#form-message").addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = e.target.elements.message.value;

  socket.emit("msg", msg, (error) => {
    if (error) {
      return console.log(error);
    }

    console.log("The message was delivered!");
  });
});

document.querySelector("#send-location").addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Try another browser.");
  }

  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit(
      "location",
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
      () => {
        console.log("Location shared successfully!");
      }
    );
    
  });
});
