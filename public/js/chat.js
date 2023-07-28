const socket = io();

socket.on("message", (msg) => {
  console.log(msg);
});

document.querySelector("#form-message").addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = e.target.elements.message.value;

  socket.emit("msg", msg);
});

// socket.on("countUpdate", (count) => {
//   console.log(`Count updated to ${count}`);
// });

// document.querySelector("#increment").addEventListener("click", () => {
//   console.log(`clicked`);
//   socket.emit("increment");
// });
