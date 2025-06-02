const Hapi = require('@hapi/hapi');
const newsRoutes = require('./routes/news-routes');

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'], 
      },
    },
  });

  server.route(newsRoutes);

  await server.start();
  console.log(`Server berjalan di ${server.info.uri}`);
};

init();
