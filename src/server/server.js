const Hapi = require("@hapi/hapi");
const Inert = require("@hapi/inert");
const routes = require("./routes/news-routes");
const sequelize = require("./config/database");
const NewsModel = require("./models/news");
const path = require("path");

const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: "localhost",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  await server.register(Inert);

  const resolvedStaticPath = path.join(__dirname, "../public");
  console.log("Hapi.js serving static files from (FINAL CORRECTED PATH):", resolvedStaticPath);

  server.route({
    method: "GET",
    path: "/public/{param*}",
    handler: {
      directory: {
        path: resolvedStaticPath,
        listing: false,
        index: false,
      },
    },
  });

  try {
    await sequelize.sync();
    console.log("Tabel database disinkronkan dengan MySQL.");
  } catch (error) {
    console.error("Gagal sinkronisasi tabel database dengan MySQL:", error);
    process.exit(1);
  }

  server.route(routes);

  server.ext("onPreResponse", (request, h) => {
    const { response } = request;
    if (response.isBoom) {
      console.error("--- Hapi.js Error Caught (onPreResponse) ---");
      console.error("Error Code:", response.output.statusCode);
      console.error("Error Message:", response.output.payload.message);
      console.error("Original Error:", response.orig); 
      console.error("Request Headers:", request.headers);
      console.error("--- End of Error Log ---");
    }
    return h.continue;
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
