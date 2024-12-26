import { Manager, Socket } from "socket.io-client"

let socket: Socket;

export const connectToServer = (token: string) => {
    //http://localhost:3000/socket.io/socket.io.js

    //!Configuracion para LOCALHOST
    // const manager = new Manager('http://localhost:3000/socket.io/socket.io.js', {
    //     extraHeaders: {
    //         authentication: token
    //     }
    // });

    //!Configuracion para DESPLIEGUE EN HOSTING
    const manager = new Manager('https://websocket-server1-482821517109.herokuapp.com/socket.io/socket.io.js', {
        extraHeaders: {
            authentication: token
        }
    });

    // const socket = manager.socket('/', );
    socket?.removeAllListeners();
    socket = manager.socket('/', );

    // console.log({socket});

    addListeners();
}



const addListeners = () => {

    const serverStatusLabel = document.querySelector<HTMLSpanElement>('#server-status')!;
    const clientsUL = document.querySelector<HTMLUListElement>('#clients-ul')!;
    
    const messageForm = document.querySelector<HTMLFormElement>('#message-form')!;
    const messageInput = document.querySelector<HTMLInputElement>('#message-input')!;
    const messegesUL = document.querySelector<HTMLUListElement>('#messages-ul')!;


    socket.on('connect', () => {
        // console.log('Connected to server');
        serverStatusLabel.innerHTML = 'Connected';
    });

    socket.on('disconnect', () => {
        // console.log('Disconnected to server');
        serverStatusLabel.innerHTML = 'Disconnected';
    });

    socket.on('clients-updated', (clients: string[]) => {
        // console.log({clients})
        let clientsHtml = '';
        clients.forEach(clientId => {
            clientsHtml += `
                <li>${clientId}</li>
            `;
        });
        clientsUL.innerHTML = clientsHtml;
    })

    messageForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if (messageInput.value.trim().length <= 0) return;{
            socket.emit('message-from-client', { id: 'YO', message: messageInput.value });
            messageInput.value = '';
            // console.log({id: 'YO', message: messageInput.value});
        }
    })

    socket.on('message-from-server', (payload: {fullName: string, message: string}) =>{
        // console.log(payload);
        const newMessage = `
            <li>
                <strong>${payload.fullName}</strong>
                <span>${payload.message}</span>
            
            </li>

                `;
        const li = document.createElement('li');
        li.innerHTML = newMessage;
        messegesUL.append(li);
    })
}