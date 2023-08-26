import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import cheerio from "cheerio";
import { OpenAI } from "openai";
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(`Received ${req.method} request to ${req.url}`);
  if (req.method === "POST") {
    console.log("Received request to /scrape");
    const { url, fields } = req.body;

    try {
      const content = await fetchWebContent(url);
      if (!content) {
        res.status(500).json({ error: "Failed to fetch the content." });
        return;
      }

      console.log("Scraping Content");

      // Clean the content
      const bodyText = cleanContent(content);
      console.log("Cleaned Content:", bodyText);

      // Process the modified text with OpenAI
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are a helpful assistant that searches for specific information in a given text. For each field name in the following list: ${fields.join(
              ", "
            )}, please search through the text content to find the corresponding information. If you cannot find an answer for a field, please add "null" as the result. If one of your answers is null, check the text again to find the desired information. Do NOT return the field names, just the results as a list separated with //. `,
          },
          {
            role: "user",
            content: `${bodyText}`,
          },
        ],
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      // Include the OpenAI response in your result
      res.json({ aiResponse: response });

      console.log(bodyText);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred." });
      }
    }
  }
}

function cleanContent(content: string): string {
  const $ = cheerio.load(content);

  // Remove iframe and script elements
  $("iframe, script, a, img").remove();

  // Convert h1 and h2 to h3
  $("h1, h2").each(function (this: any) {
    $(this).replaceWith(`<h3>${$(this).text()}</h3>`);
  });

  // Convert h3, h4, h5 to bolded text
  $("h3, h4, h5").each(function (this: any) {
    $(this).replaceWith(`<strong>${$(this).text()}</strong>`);
  });

  // Now, get the text after modifications
  let bodyText: string = $("body").text() || "";

  bodyText = bodyText.replace(/\n\s*\n/g, "<br>");
  bodyText = bodyText.replace(/\n/g, "<br>");

  bodyText = bodyText.replace(/<iframe[\s\S]*?<\/iframe>/gi, "");

  return bodyText;
}

async function fetchWebContent(url: string): Promise<string | null> {
  try {
    const headers = {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36",
    };
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error fetching the webpage: ${error}`);
    return null;
  }
}
