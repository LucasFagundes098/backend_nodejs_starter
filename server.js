import { fastify } from "fastify";
// import { DatabaseMemory } from "./database-memory.js";
import { DatabasePostgres } from "./database-postgres.js";

const server = fastify();

// const database = new DatabaseMemory();
const database = new DatabasePostgres();

// ! POST https://localhost:3333/videos
server.post("/videos", async (request, reply) => {
  const { title, description, duration } = request.body;

  await database.create({
    title,
    description,
    duration,
  });

  return reply.status(201).send();
});

// ! GET https://localhost:3333/videos
server.get("/videos", async (request, reply) => {
  const videos = await database.list();
  console.log(videos);
  return videos;
});

// ! PUT https://localhost:3333/videos/1
server.put("/videos/:id", async (request, reply) => {
  const videoId = request.params.id;
  const { title, description, duration } = request.body;

  await database.update(videoId, {
    title,
    description,
    duration,
  });

  return reply.status(204).send();
});

// ! DELETE https://localhost:3333/videos/1
server.get("/videos/:id", async (request, reply) => {
  const videoId = request.params.id;

  await atabase.delete(videoId);

  return reply.status(204).send();
});

server.listen({
  port: process.env.PORT ?? 3333,
});
