// Socket instence
const socket = io();

// Taking user Name and load page
let name;

do {
  name = prompt("Enter your name to connect");
} while (!name.trim());

if (name != null) {
  window.addEventListener("load", () => {
    document.body.style.display = "block";
  });
}

// Gatting Dom Elements
const form = document.getElementById("messageForm");
const messageInput = document.getElementById("messageInput");
const messageBox = document.querySelector(".message_box");
const container = document.querySelector(".chat_body_container");

const welcome_msg = document.querySelector(".welcome_area");
const welcomeName = document.querySelector("#welcomeName");

var incommingAudio = new Audio("../audio/tung.mp3");
var sentAudio = new Audio("../audio/sent.mp3");
incommingAudio.volume = 0.2;
incommingAudio.currentTime = 0.1;
// sentAudio.volume = 0.01;
// sentAudio.currentTime = 0.1;

// Welcome message for the user
welcomeName.innerHTML = name;
welcome_msg.style.display = "block";

let time;

//submit message form
form.addEventListener("submit", (e) => {
  e.preventDefault();

  //Time
  const createTime = new Date();
  console.log(createTime);
  time = createTime.getHours() + ":" + createTime.getMinutes();

  if (messageInput.value != "") {
    sendMessage(messageInput.value);
  }

  messageInput.value = "";
});

// sending Meaasge
function sendMessage(message) {
  let msgObject = {
    user: name,
    msg: message,
    time: time,
  };

  // Append
  appendMessage(msgObject, "right_message_box");
  scrollToBottom();

  //Send to Server
  socket.emit("message", msgObject);
}

// Append message to the DOM
function appendMessage(message, type) {
  let actualUser;
  if (type === "right_message_box") {
    actualUser = "You";
  } else {
    actualUser = message.user;
  }

  const mainDiv = document.createElement("div");
  const className = type;
  mainDiv.classList.add(className, "message");

  const markup = `
    <h2 class="userName">${actualUser}</h2>
    <p class="userMsg">${message.msg}</P>
    <h3 class="msgTime">${message.time}</h3>
    `;

  mainDiv.innerHTML = markup;

  messageBox.appendChild(mainDiv);

  // Audio
  if (type === "left_message_box") {
    incommingAudio.play();
  } else {
    // sentAudio.play();
  }
}

// Recieve Message and appened to the DOM
socket.on("message", (msg) => {
  appendMessage(msg, "left_message_box");
  scrollToBottom();
});

// Scroll Bottom
const scrollToBottom = () => {
  messageBox.scrollTop = messageBox.scrollHeight;
};