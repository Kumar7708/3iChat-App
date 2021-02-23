const socket = io();
let name;
const textArea = document.querySelector('#textarea');
const messageArea = document.querySelector('.message_area');
const button = document.querySelector('.button');

do {
  name = prompt("Please enter your name: ");
} while (!name);
textArea.addEventListener('keyup', (e) => {
  if (e.key === 'Enter' && e.target.value) {
    sendMessage(e.target.value);
  }
});

button.addEventListener('click', () => {
  if(textArea.value){
    sendMessage(textArea.value);
  }
});


function sendMessage(message) {
  let msg = {
    user: name,
    message: message.trim()
  }
  appendMessage(msg, 'outgoing');
  textArea.value = '';
  scrollToBottom();

  socket.emit('message', msg);


}

function appendMessage(msg, type) {
  let pos = 'left';
  let mainDiv = document.createElement('div');
  let className = type;
  mainDiv.classList.add(className, 'message');
  if(type == 'outgoing'){
    pos='right';
  }

  let markup = `
  <h4 style='${pos}:0'>${msg.user}</h4>
  <p>${msg.message}</p>
  `;
  mainDiv.innerHTML = markup;
  messageArea.appendChild(mainDiv);
}


socket.on('message', (msg)=>{
  appendMessage(msg, 'incoming');
  scrollToBottom();

});


function scrollToBottom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}
