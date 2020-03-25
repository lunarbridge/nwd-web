const constants = require('./constants');
const service = require('./service');

segServer = {};

const filterIds = (props) => {
  return Object.keys(props)
    .filter(prop => parseInt(prop) == prop);
}

const onlineRooms = (io) => {
  const onlineProjects = filterIds(io.sockets.adapter.rooms);

  onlineProjects.forEach(async(projectId) => {
    const data = await service.fetchProcessStatus(projectId);

    io.to(projectId).emit('updateProcess', data);
  })
}

segServer.init = (io) => {
  io.on('connection', (socket) => {
    socket.on('join', (data) => {
      const { projectId } = JSON.parse(data);

      socket.join(projectId);
    });

    socket.on('fetchData', async() => {
      const projectId = filterIds(socket.rooms)[0];
      const data = await service.fetchProcessStatus(projectId);

      io.to(`${socket.id}`).emit('fetchData', data);
    });

    socket.on('fetchSoftware', async() => {
      const data = await service.fetchSoftware();

      io.to(`${socket.id}`).emit('fetchSoftware', data);
    });
    
    socket.on('disconnect', () => {
      socket.leave();    
    });
  });

  setInterval(onlineRooms, 5000, io);
}

module.exports = segServer;