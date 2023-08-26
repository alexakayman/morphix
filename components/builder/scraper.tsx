import React from "react";

const Scraper = () => {
  async function startScraping() {
    const statusText = document.getElementById("statusText");
    const linkInput = document.getElementById("linkInput") as HTMLInputElement;
    const link = linkInput ? linkInput.value : null;
    if (!link) return;

    // Collect fields
    const fieldNames = document
      .getElementById("fieldsContainer")
      ?.querySelectorAll(".field");
    const fields = [];

    let hasBlankField = false;
    for (let i = 0; fieldNames && i < fieldNames.length; i += 2) {
      const fieldName = (fieldNames[i] as HTMLInputElement)?.value;
      const fieldType = (fieldNames[i + 1] as HTMLInputElement)?.value;

      if (!fieldName || !fieldType) {
        hasBlankField = true;
        break;
      }

      fields.push([fieldName, fieldType]);
      console.log(fields);
    }

    if (hasBlankField) {
      // Show an error message for missing fields
      const statusText = document.getElementById("statusText");
      if (statusText) {
        statusText.innerText =
          "Please complete all field names and field types.";
      }
      return;
    }

    try {
      const response = await fetch("/api/scrape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: link, fields }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        if (statusText) {
          statusText.innerText = `Error: ${errorText}`;
        }
      } else {
        const result = await response.json();
        if (statusText) {
          statusText.innerText = `Scraping Completed!`;
        }
        const results = result.aiResponse.choices[0].message.content;
        addResults(results);
      }
    } catch (error) {
      if (statusText) {
        statusText.innerText = `Error connecting to the server: ${error}`;
        console.error(error);
      }
    }
  }
  function scrapeInProgress() {
    // Before making the API request:
    const statusText = document.getElementById("statusText");
    if (statusText) {
      statusText.innerText = "Currently requesting...";
    }
  }

  function addResults(results: any) {
    // Check if results is a string before splitting
    if (typeof results === "string") {
      results = results.split("//");
    }
    console.log(results, results.length);

    // select the table we'll be adding to
    const storedFieldsBody = document.querySelector("tbody");

    if (storedFieldsBody) {
      storedFieldsBody.innerHTML = "";
    }

    // creating a row for each result set
    const tableRow = document.createElement("tr");

    // for every item in that array, add it to the table. we're just praying that the order is correct.
    if (Array.isArray(results)) {
      results.forEach((result) => {
        const tableCell = document.createElement("td");
        tableCell.textContent = result;
        tableRow.appendChild(tableCell);
      });
    } else {
      console.log(
        `Error: expected an array. Instead, got "${results}" which is a ${typeof results}`
      );
    }

    if (storedFieldsBody) {
      storedFieldsBody.appendChild(tableRow);
    }
  }
  return (
    <>
      <section className="mx-auto max-w-5xl px-6 pb-8 md:max-h-[950px] md:max-w-7xl">
        <div className="flex flex-col items-start justify-between md:pb-12 gap-4">
          <div className="content">
            <h3 className="font-book font-styling font-display font-effect-hero text-center md:text-left text-[3rem] md:text-7xl leading-[3.35rem] md:leading-[4rem] tracking-tight font-gradient">
              2) Collect data
            </h3>
            <div className="input_pair">
              <input
                type="text"
                id="linkInput"
                placeholder="Enter the link to scrape"
              />
              <button
                onClick={() => {
                  startScraping();
                  scrapeInProgress();
                }}
              >
                Collect
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-6 pb-8 md:max-w-7xl">
        <div className="flex flex-col items-start justify-between md:pb-12 gap-4">
          <h3 className="font-book font-styling font-display font-effect-hero text-center md:text-left text-[3rem] md:text-7xl leading-[3.35rem] md:leading-[4rem] tracking-tight font-gradient">
            3) Download Results
          </h3>
          <p id="statusText">Waiting for input...</p>
          <p id="resultsContainer"></p>
        </div>
      </section>
    </>
  );
};

export default Scraper;
