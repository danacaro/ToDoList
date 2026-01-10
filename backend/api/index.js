require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Client } = require("@notionhq/client/build/src");

const app = express();
app.use(cors());
app.use(express.json());

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
  notionVersion: "2025-09-03",
});

function parsePage(page) {
  const props = page.properties;

  return {
    id: page.id,
    name: props.Name?.title?.[0]?.plain_text ?? null,
    status: props.Status?.status?.name ?? null,
    priority: props.Priority?.select?.name ?? null,
    due: props.Due?.date?.start ?? null,
    type: props.Type?.select?.name ?? null,
  };
}

app.get("/tasks", async (req, res) => {
  const { status } = req.query
  try {
    const response = await notion.dataSources.query({
      data_source_id: process.env.DATA_SOURCE_ID,
      filter: {
        property: "Status",
        status: {
          equals: status,
        }
      }
    })

    const tasks = response.results.map(parsePage);
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}/tasks`);
});
