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
  const { status, type } = req.query;

  try {
    const filters = [];

    if (status) {
      filters.push({
        property: "Status",
        status: {
          equals: status,
        },
      });
    }

    if (type) {
      filters.push({
        property: "Type",
        select: {
          equals: type,
        },
      });
    }

    const response = await notion.dataSources.query({
      data_source_id: process.env.DATA_SOURCE_ID,
      filter: filters.length > 0 ? { and: filters } : undefined,
    });

    const tasks = response.results.map(parsePage);
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

app.patch("/tasks/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: "Status is required" });
  }

  try {
    await notion.pages.update({
      page_id: id,
      properties: {
        Status: {
          status: {
            name: status,
          },
        },
      },
    });

    res.json({ success: true });
  } catch (error) {
    console.error("ERROR updating status:", error);
    res.status(500).json({ error: "Failed to update status" });
  }
});

const PORT = 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor en http://localhost:${PORT}/tasks`);
});
