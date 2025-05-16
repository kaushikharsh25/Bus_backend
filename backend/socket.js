const socketIo = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');

let io = null;

// Initialize socket server
function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    console.log('[Socket.io] Initialized');

    io.on('connection', (socket) => {
        console.log(`[Socket.io] Client connected: ${socket.id}`);

        // Handle join event
        socket.on('join', async (data) => {
            const { userId, userType } = data;
            console.log(`[Socket.io] ${userType} joined: ${userId}`);

            try {
                if (userType === 'user') {
                    await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
                } else if (userType === 'captain') {
                    await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
                }
            } catch (err) {
                console.error('[Socket.io] Join error:', err.message);
            }
        });

        // Handle captain location updates
        socket.on('update-location-captain', async (data) => {
            const { userId, location } = data;

            if (!location || typeof location.ltd !== 'number' || typeof location.lng !== 'number') {
                return socket.emit('error', { message: 'Invalid location data' });
            }

            try {
                await captainModel.findByIdAndUpdate(userId, {
                    location: {
                        ltd: location.ltd,
                        lng: location.lng
                    }
                });
                console.log(`[Socket.io] Updated location for captain ${userId}`);
            } catch (err) {
                console.error('[Socket.io] Location update error:', err.message);
            }
        });

        socket.on('disconnect', () => {
            console.log(`[Socket.io] Client disconnected: ${socket.id}`);
        });
    });
}

// Send message to a specific socket ID
const sendMessageToSocketId = (socketId, messageObject) => {
    if (!io) {
        return console.error('[Socket.io] Not initialized!');
    }

    if (!socketId) {
        return console.error('[Socket.io] No socket ID provided!');
    }

    console.log(`[Socket.io] Sending "${messageObject.event}" to ${socketId}`);
    io.to(socketId).emit(messageObject.event, messageObject.data);
};

module.exports = {
    initializeSocket,
    sendMessageToSocketId
};
