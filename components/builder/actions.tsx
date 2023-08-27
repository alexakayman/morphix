import React from "react";
import { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import Link from "next/link";

const Fields = () => {
  const addField = () => {
    const container = document.getElementById("fieldsContainer");

    const fieldWrapper = document.createElement("div");
    fieldWrapper.className = "flex flex-row field-wrapper"; // Add the class for flex layout

    const fieldNameInput = document.createElement("input");
    fieldNameInput.type = "text";
    fieldNameInput.placeholder = "Field Label";
    fieldNameInput.className = "field text-slate-11 field-name";
    fieldNameInput.required = true; // Field Name is required

    const fieldTypeInput = document.createElement("select"); // Create select element

    // Accepted data types
    const dataTypes = ["String", "Integer", "Float", "Datetime"];

    // Add options for each data type
    dataTypes.forEach((dataType) => {
      const option = document.createElement("option");
      option.value = dataType.toLowerCase();
      option.textContent = dataType;
      fieldTypeInput.appendChild(option);
    });

    // Add event listener
    fieldTypeInput.addEventListener("change", () => {
      let extraInput = fieldWrapper.querySelector(
        ".extra-input"
      ) as HTMLInputElement;
      if (
        fieldTypeInput.value === "select" ||
        fieldTypeInput.value === "other"
      ) {
        if (!extraInput) {
          extraInput = document.createElement("input") as HTMLInputElement;
          extraInput.className = "field text-slate-11 extra-input";
          fieldWrapper.insertBefore(extraInput, deleteButton);
        }
        extraInput.placeholder =
          fieldTypeInput.value === "select"
            ? "Enter options"
            : "Enter data type";
      } else {
        if (extraInput) {
          fieldWrapper.removeChild(extraInput);
        }
      }
    });

    // Add styling class
    fieldTypeInput.className = "field text-slate-11 field-type";
    fieldTypeInput.required = true; // Field Type is required

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "action-button";
    deleteButton.onclick = () => container?.removeChild(fieldWrapper);

    // Append input fields to the wrapper div
    fieldWrapper.appendChild(fieldNameInput);
    fieldWrapper.appendChild(fieldTypeInput);
    fieldWrapper.appendChild(deleteButton);

    if (container) {
      container.appendChild(fieldWrapper);
    }
  };

  const addDefaultFields = () => {
    const defaultFields = [
      ["Program Name", "String"],
      ["Program Type", "Select"],
      ["Location or Host University", "String"],
      ["Eligible Grades", "String"],
      ["Cost", "Integer"],
      ["Deadline", "Datetime"],
      ["Program Dates", "String"],
    ];

    defaultFields.forEach(([fieldName, fieldType]) => {
      const container = document.getElementById("fieldsContainer");

      const fieldWrapper = document.createElement("div");
      fieldWrapper.className = "flex flex-row"; // Add the class for flex layout and minimum width for different devices

      const fieldNameInput = document.createElement("input");
      fieldNameInput.type = "text";
      fieldNameInput.placeholder = "Field Label";
      fieldNameInput.className = "field field-name flex-grow-2"; // Add the class 'field-name' and 'flex-grow-2' to make it take up double the space
      fieldNameInput.required = true; // Field Name is required
      fieldNameInput.value = fieldName;

      const fieldTypeInput = document.createElement("select"); // Create select element
      fieldTypeInput.className = "field field-type flex-grow-2"; // Add the class 'field-type' and 'flex-grow-2' to make it take up double the space
      fieldTypeInput.required = true; // Field Type is required
      fieldTypeInput.value = fieldType;

      // Accepted data types
      const dataTypes = ["String", "Integer", "Float", "Datetime", "Other"];

      // Add options for each data type
      dataTypes.forEach((dataType) => {
        const option = document.createElement("option");
        option.value = dataType;
        option.text = dataType;
        fieldTypeInput.appendChild(option);
      });

      // Add event listener
      fieldTypeInput.addEventListener("change", () => {
        if (
          fieldTypeInput.value === "select" ||
          fieldTypeInput.value === "other"
        ) {
          const extraInput = document.createElement("input");
          extraInput.type = "text";
          extraInput.placeholder = "Enter options";
          extraInput.className = "field text-slate-11";
          fieldWrapper.appendChild(extraInput);
        } else {
          const extraInput = fieldWrapper.querySelector(
            ".field.text-slate-11:last-child"
          );
          if (extraInput) {
            fieldWrapper.removeChild(extraInput);
          }
        }
      });

      // Create delete button
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.className = "action-button";
      deleteButton.onclick = () => container?.removeChild(fieldWrapper);

      // Append input fields and delete button to the wrapper div
      fieldWrapper.appendChild(fieldNameInput);
      fieldWrapper.appendChild(fieldTypeInput);
      fieldWrapper.appendChild(deleteButton);

      // Append the wrapper div to the container
      if (container) {
        container.appendChild(fieldWrapper);
      }
    });
  };

  const saveFields = () => {
    const fieldContainer = document.getElementById("fieldsContainer");
    if (fieldContainer) {
      const fieldNameInputs = fieldContainer.querySelectorAll(".field-name");
      const fieldTypeInputs = fieldContainer.querySelectorAll(".field-type");

      const fields = [];
      let hasBlankField = false;

      const fieldInputs = fieldContainer.querySelectorAll(".field");

      for (let i = 0; i < fieldInputs.length; i += 2) {
        const fieldName = (fieldInputs[i] as HTMLInputElement).value;
        const fieldType = fieldInputs[i + 1]
          ? (fieldInputs[i + 1] as HTMLInputElement).value
          : undefined;

        if (fieldType === undefined) {
          continue;
        }
        let extraInputValue = "";

        if (fieldType === "select" || fieldType === "other") {
          const extraInput = fieldInputs[i + 2] as HTMLInputElement;
          if (extraInput) {
            extraInputValue = extraInput.value;
          }
        }

        if (
          !fieldName ||
          !fieldType ||
          (extraInputValue === "" &&
            (fieldType === "select" || fieldType === "other"))
        ) {
          hasBlankField = true;
          break;
        }

        fields.push([fieldName, fieldType, extraInputValue]);
      }

      const fieldStatus = document.getElementById("field-status");

      if (hasBlankField) {
        if (fieldStatus) {
          fieldStatus.innerText =
            "Please complete all field names and field types.";
        }
        return;
      }

      if (fieldStatus) {
        fieldStatus.innerText = "";
      }

      const storedFieldsTable = document.getElementById("storedFieldsTable");
      const storedFieldsHeader = storedFieldsTable?.querySelector("thead tr");
      const storedFieldsBody = storedFieldsTable?.querySelector("tbody");

      if (storedFieldsHeader) {
        storedFieldsHeader.innerHTML = "";
      }
      if (storedFieldsBody) {
        storedFieldsBody.innerHTML = "";
      }

      if (storedFieldsBody && storedFieldsHeader) {
        fields.forEach((field) => {
          const tableHeading = document.createElement("th");
          tableHeading.innerHTML = `${field[0]}`;
          storedFieldsHeader.appendChild(tableHeading);
        });
      }

      // empty sample data
      const tableRow = document.createElement("tr");

      fields.forEach((field) => {
        const tableCell = document.createElement("td");
        tableCell.textContent = field[1]; // Use field type instead of "..."
        tableRow.appendChild(tableCell);
      });

      if (storedFieldsBody) {
        storedFieldsBody.appendChild(tableRow);
      }
    }
  };

  const [links, setLinks] = useState([""]);

  function handleLinkChange(index: number, newLink: string) {
    const newLinks = [...links];
    newLinks[index] = newLink;
    setLinks(newLinks);
  }

  function handleAddLink() {
    setLinks([...links, ""]);
  }

  function handleDeleteLink(index: number) {
    const newLinks = [...links];
    newLinks.splice(index, 1);
    setLinks(newLinks);
  }

  async function startScraping(link: string) {
    const statusText = document.getElementById("statusText");
    const linkInput = document.getElementById("linkInput") as HTMLInputElement;

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

  // keep track of uses

  const [count, setCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const countElement = document.getElementById("count-uses");
    if (countElement) {
      const amount = 5 - count;
      countElement.textContent = amount.toString();
    }
  }, [count]);

  async function handleCollectClick(event: React.MouseEvent) {
    event.preventDefault();
    if (count >= 5) {
      setShowPopup(true);
      console.log("Blocking");
    } else {
      setCount(count + 1);
      console.log(count);
      scrapeInProgress();
      await Promise.all(links.map(startScraping));
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

    // creating a row for each result set
    const tableRow = document.createElement("tr");

    // for every item in that array, add it to the table.
    if (Array.isArray(results)) {
      results.forEach((result) => {
        const tableCell = document.createElement("td");
        tableCell.textContent = result;
        tableRow.appendChild(tableCell);
      });

      if (storedFieldsBody) {
        storedFieldsBody.appendChild(tableRow);
      }
    } else {
      console.log(
        `Error: expected an array. Instead, got "${results}" which is a ${typeof results}`
      );
    }
  }

  function handleDownloadClick() {
    var html = document.querySelector("table")?.outerHTML;
    if (html) {
      exportTableToCSV(html, "table.csv");
    }
  }

  function exportTableToCSV(html: string, filename: string) {
    const csv: string[] = [];
    const rows = document.querySelectorAll("table tr");

    for (let i = 0; i < rows.length; i++) {
      const row: string[] = [];
      const cols = rows[i].querySelectorAll("td, th");

      for (let j = 0; j < cols.length; j++)
        row.push((cols[j] as HTMLElement).innerText);

      csv.push(row.join(","));
    }

    // Create CSV file and download it
    const csvFile = new Blob([csv.join("\n")], { type: "text/csv" });
    const downloadLink = document.createElement("a");
    downloadLink.download = filename;
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = "none";

    document.body.appendChild(downloadLink);
    downloadLink.click();
  }

  return (
    <>
      {/* Payment popup */}
      <Popup
        open={showPopup}
        modal
        closeOnDocumentClick={false}
        className="fixed top-0 left-0 w-full h-full text-center flex flex-col justify-center items-center"
      >
        <div className="flex flex-col items-center justify-center h-full gap-4">
          <p className="font-book font-styling font-display font-effect-hero text-center text-[2rem] md:text-6xl leading-[2.35rem] md:leading-[3rem] tracking-tight font-gradient p-2">
            Thanks for trying Morphix!
          </p>
          <div>
            <p className="text-center max-w-md sans mb-8 mt-4 leading-7 md:text-left text-base md:text-[1.125rem] md:leading-[1.5] text-slate-11 font-normal">
              Currently limiting use to 5 generations per user since the project
              is running on my personal openAI creds 🫣
            </p>
          </div>

          <div>
            <p className="text-center max-w-md sans mb-8 mt-4 leading-7 text-base md:text-[1.125rem] md:leading-[1.5] text-slate-11 font-normal">
              If you think Morphix could be useful on a daily basis / should be
              developed further than a weekend project, let me know on Twitter!
            </p>
          </div>

          <div className="flex flex-row gap-2">
            <Link
              className="text-base h-12 pl-5 pr-2 gap-0 font-semibold bg-white text-black hover:bg-white/90 focus-visible:ring-4 focus-visible:ring-white/30 focus-visible:outline-none focus-visible:bg-white/90 disabled:hover:bg-white inline-flex items-center border justify-center select-none rounded-full disabled:cursor-not-allowed disabled:opacity-70 transition ease-in-out duration-200"
              href="https://twitter.com/alexakayman?ref=morphix"
            >
              @alexakayman on Twitter
              <span className="text-[#70757E]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M10.75 8.75L14.25 12L10.75 15.25"
                  ></path>
                </svg>
              </span>
            </Link>
            <Link
              className="text-base h-12 pl-5 pr-2 gap-0 font-semibold bg-slate-1 border-slate-1 text-slate-11 hover:bg-slate-5 hover:text-slate-12 focus-visible:ring-4 focus-visible:ring-slate-7 focus-visible:outline-none focus-visible:bg-slate-6 disabled:hover:bg-slate-1 inline-flex items-center border justify-center select-none rounded-full disabled:cursor-not-allowed disabled:opacity-70 transition ease-in-out duration-200"
              href="https://github.com/alexakayman/morphix?ref=morphix"
              target="_blank"
              rel="noopener"
            >
              Star on GitHub
              <span className="text-[#70757E]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M10.75 8.75L14.25 12L10.75 15.25"
                  ></path>
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </Popup>

      {/* Add Fields */}
      <section className="mx-auto max-w-5xl px-6 pb-8 md:max-w-7xl" id="start">
        <div className="flex flex-col items-start justify-between md:pb-12 gap-4 w-full">
          <h3 className="font-book font-styling font-display font-effect-hero text-center md:text-left text-[3rem] md:text-7xl leading-[3.35rem] md:leading-[4rem] tracking-tight font-gradient">
            1) Add Fields
          </h3>
          <p className="sans mb-8 mt-4 leading-7 md:text-left text-base md:text-[1.125rem] md:leading-[1.5] text-slate-11 font-normal">
            The more detail you provide in the field name, the better.
          </p>
          <div
            id="fieldsContainer"
            className="flex flex-col w-full md:w-20"
          ></div>
          <div className="flex flex-row w-full">
            <button onClick={addField}>Add</button>
            <button onClick={saveFields}>Save</button>
          </div>
          <p id="field-status"></p>
        </div>
      </section>

      {/* Collect Data */}
      <section className="mx-auto max-w-5xl px-6 pb-8 md:max-h-[950px] md:max-w-7xl">
        <div className="flex flex-col items-start justify-between md:pb-12 gap-4">
          <div className="content">
            <h3 className="font-book font-styling font-display font-effect-hero text-center md:text-left text-[3rem] md:text-7xl leading-[3.35rem] md:leading-[4rem] tracking-tight font-gradient">
              2) Collect data
            </h3>
            <p className="sans mb-8 mt-4 leading-7 md:text-left text-base md:text-[1.125rem] md:leading-[1.5] text-slate-11 font-normal">
              Add as many links as you would like! 5 total batch generations per
              user - use them wisely! You have <span id="count-uses">5</span>{" "}
              more free uses.
            </p>
            <div className="flex flex-col gap-2 mt-5">
              {links.map((link, index) => (
                <div key={index} className="flex flex-row w-full">
                  <input
                    type="text"
                    value={link}
                    onChange={(e) => handleLinkChange(index, e.target.value)}
                    placeholder="Enter the link to scrape"
                    className="field"
                  />
                  <div className="flex flex-row">
                    <button className="action-button" onClick={handleAddLink}>
                      Add
                    </button>
                    <button
                      className="action-button"
                      onClick={() => handleDeleteLink(index)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={handleCollectClick} className="mt-3">
              Collect
            </button>
          </div>
        </div>
      </section>

      {/* Download Results */}
      <section className="mx-auto max-w-5xl px-6 pb-8 md:max-w-7xl">
        <div className="flex flex-col items-start justify-between md:pb-12 gap-4">
          <h3 className="font-book font-styling font-display font-effect-hero text-center md:text-left text-[3rem] md:text-7xl leading-[3.35rem] md:leading-[4rem] tracking-tight font-gradient">
            3) Download Results
          </h3>
          <p
            id="statusText"
            className="text-center max-w-md sans mb-8 mt-4 leading-7 md:text-left text-base md:text-[1.125rem] md:leading-[1.5] text-slate-11 font-normal"
          >
            Waiting for input...
          </p>
          <p id="resultsContainer"></p>
          <table id="storedFieldsTable">
            <thead>
              <tr></tr>
            </thead>
            <tbody id="storedFieldsBody"></tbody>
          </table>
          <button id="download" onClick={handleDownloadClick}>
            Download
          </button>
        </div>
      </section>
    </>
  );
};

export default Fields;
