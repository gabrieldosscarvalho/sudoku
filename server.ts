import express from "express";
import { Request, Response, Router } from "express";
import path from "path";

const server = express();

const route = Router();

server.use(express.json());

server.use("/dist", express.static(path.join(__dirname)));
server.use("/public", express.static(path.join(__dirname, "../public")));

route.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

server.use(route);

server.listen(3333, () => "server running on port 3333");

console.log("\nhttp://localhost:3333/\n");
