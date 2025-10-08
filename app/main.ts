import * as net from "net";
import { parseRESP } from "./utils/resp";
import { handleCommand } from "./commands";

console.log("Logs from your program will appear here!");

const server: net.Server = net.createServer((connection: net.Socket) => {
  connection.setKeepAlive(true);

  connection.on("data", (data) => {
    const input = data.toString();
    console.log("Received:", JSON.stringify(input));

    const parts = parseRESP(input);
    const response = handleCommand(parts);

    connection.write(response);
  });

  connection.on("error", (err) => {
    console.error("Connection error:", err);
  });
});

server.listen(6379, "127.0.0.1");
