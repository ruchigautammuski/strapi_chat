'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    
    let { Server } = require("socket.io");
    var io = new Server(strapi.server.httpServer, {
      cors: { // cors setup
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true,
      },
    });
    io.on("connection", (socket) => {
      //Listening for a connection from the frontend
      console.log("A user connected : ", socket.id);
      socket.on("send_message", (data) => { // Listening for a sendMessage connection
        socket.emit("receive_message", data);
      });
    });
  },
};
