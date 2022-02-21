import express from "express";
import prisma from "./src/adapters/prisma";

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({ data: "Worldly Hello's" });
});

app.get("/example", async (req, res) => {
  try {
    const newPrismaUser = await prisma.user.create({
      data: {
        name: "Eleven",
      },
    });

    const newPrismaTeam = await prisma.team.create({
      data: {
        name: "Hawkins",
        users: {
          connect: { id: newPrismaUser.id },
        },
      },
    });

    return res.status(201).json({ data: newPrismaTeam });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e });
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("Server started on " + port);
});
