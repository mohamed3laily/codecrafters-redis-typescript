import * as net from "net";

console.log("Logs from your program will appear here!");

const server: net.Server = net.createServer((connection: net.Socket) => {
  connection.setKeepAlive(true);

  connection.on("data", (data: Buffer) => {
    console.log("Received data:", data.toString());
    connection.write("+PONG\r\n");
  });

  connection.on("error", (err) => {
    console.error("Connection error:", err);
  });
});

server.listen(6379, "127.0.0.1");
