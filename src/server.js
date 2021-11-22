const Hapi = require("@hapi/hapi");
const routes = require("./routes");

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: "localhost",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });
  await server.start();
  server.route(routes);
  console.log(`server berjalan di ${server.info.uri}`);
};

init();
