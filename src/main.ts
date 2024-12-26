import { connectToServer } from './socket-client';
import './style.css'
// import typescriptLogo from './typescript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    
    <h2>Websocket - Client</h2>
    <input id="jwtToken" placeholder="Json Web Token">

    <button id="connect-button">Connect</button>


    <br>

    <span id="server-status">Offline</span>

    <ul id="clients-ul"></ul>

    <form id="message-form">
      <input type="text" placeholder="Message" id="message-input" name="message">
    </form>

    <h3>Messages</h3>
    <ul id="messages-ul"></ul>

  </div>
`

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
// connectToServer();


const jwtToken = document.querySelector<HTMLInputElement>('#jwtToken')!;

const btnConnect = document.querySelector<HTMLButtonElement>('#connect-button')!;

btnConnect.addEventListener('click', () => {

  if (jwtToken.value.trim().length <= 0) {
    alert('Please enter a JWT');
    return;
  }
    connectToServer(jwtToken.value);
})