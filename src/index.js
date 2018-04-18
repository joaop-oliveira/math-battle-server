import http from 'http'
import { createServer } from 'http'
import app from './server'
const cors = require('cors');
const socketIo = require('socket.io');
// import schema from './schema'

// const whitelist = ['http://localhost:3001' ];
// const corsOptions = {
//     origin: function (origin, callback) {
//         if (whitelist.indexOf(origin) !== -1) {
//             callback(null, true)
//         } else {
//             callback(new Error('Not allowed by CORS'))
//         }
//     }
// };

app.use(cors());
const server = http.createServer(app);
let currentApp = app;
// const io = socketIo(server);
//
// io.on('connection', socket => {
//     console.log('connected');
//     socket.on('email', (data, callback) => {
//         callback(data);
//         console.log(data);
//         io.emit('spread', data);
//     });
//     // socket.emit('message', {
//     //     name:"joao",
//     //     surname: "paulo"
//     // });
// });

server.listen(process.env.PORT || 3000, () => {
	console.log('Server listening on port 3000')
});

if (module.hot) {
	module.hot.accept(['./server'], () => {
		server.removeListener('request', currentApp)
		server.on('request', app)
		currentApp = app
	})
}
