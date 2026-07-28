# Servidor WebRTC - Noruf Security System

Servidor externo que gestiona las conexiones punto a punto en tiempo real para el sistema de seguridad Noruf.

## Características

- **ID Fijo**: El servidor siempre usa el mismo `SERVER_PEER_ID` para mantener consistencia
- **WebRTC**: Maneja conexiones punto a punto mediante WebSocket
- **Frontend**: Sirve un HTML/JS básico para visualizar video en tiempo real
- **No Persistente**: No se guardan conexiones ni información en base de datos

## Estructura del Proyecto

```
webrtc-server/
├── server.js              # Servidor NodeJS principal
├── package.json           # Dependencias
└── public/                # Archivos estáticos
    └── index.html         # Frontend para video
```

## Instalación

```bash
npm install
```

## Despliegue en Vercel-App

1. Conectar el repositorio Git a Vercel-App
2. Configurar el entorno de producción
3. Establecer variables de entorno si es necesario
4. Vercel-App desplegará automáticamente las cambios

## Endpoints del Servidor

- `GET /` - Servir el frontend HTML
- `POST /webrtc` - Iniciar nueva conexión WebRTC
- `GET /webrtc?peer_id=<id>` - Obtener información de conexión existente

## Configuración

El servidor usa un ID fijo para mantener consistencia:

```javascript
const SERVER_PEER_ID = "noruf-security-server";
```

## Consideraciones

- **Seguridad**: Usar HTTPS/WSS para conexiones seguras (Vercel-App proporciona certificados SSL)
- **Balanceo de carga**: Vercel-App puede manejar múltiples conexiones simultáneas
- **Monitoreo**: Agregar métricas para ver número de conexiones activas
- **Logs**: Implementar logging básico para depuración

## Uso

Para ejecutar el servidor localmente:

```bash
npm start
```

El servidor se ejecutará en `http://localhost:8080`
