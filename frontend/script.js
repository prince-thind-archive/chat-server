const socket = io();

const state={
    name:null,
}

const form = document.querySelector('#form');
const ouptut = document.querySelector('#output');
const messageForm = document.querySelector('#message-form');

form.addEventListener('submit', main);

function main(e) {
    e.preventDefault();
    state.name = e.target.name.value;
    form.classList.toggle('hidden')
    messageForm.classList.toggle('hidden')
}

messageForm.addEventListener('submit',sendMessage);

function sendMessage(e){
    e.preventDefault();

    socket.emit('message',{
        name:state.name,
        message:e.target.message.value
    })
}

socket.on('update-messages',convo=>{
    ouptut.innerHTML=convo;
})