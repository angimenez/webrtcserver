const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const PeerJS = require('peerjs');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// ID fijo para el servidor WebRTC
const SERVER_PEER_ID = "noruf-security-server";

// Inicializar PeerJS
const peer = new PeerJS({
    id: SERVER_PEER_ID,
    debug: true
});

peer.on('open', (id) => {
    console.log('[INFO] Conectado al servidor WebRTC');
});

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Manejar conexiones WebRTC
wss.on('connection', (ws) => {
    console.log(`[INFO] Conexión WebSocket establecida`);
    
    ws.on('message', (msg) => {
        const data = JSON.parse(msg);
        
        if (data.type === 'offer') {
            // Crear respuesta de oferta
            peer.createAnswer(data.peerId, data.sdp)
                .then((answer) => {
                    ws.send(JSON.stringify({
                        type: 'answer',
                        sdp: answer
                    }));
                })
                .catch((err) => console.error('Error creando respuesta:', err));
        }
    });
    
    ws.on('close', () => {
        console.log('[INFO] Conexión WebSocket cerrada');
    });
});

// Endpoint para obtener información del servidor
app.get('/webrtc', (req, res) => {
    res.json({ peer_id: SERVER_PEER_ID });
});

// Endpoint principal - servir frontend HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`[INFO] Servidor WebRTC escuchando en puerto ${PORT}`);
});
