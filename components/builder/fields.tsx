import React from "react";

const Fields = () => {
  const addField = () => {
    const container = document.getElementById("fieldsContainer");

    const fieldWrapper = document.createElement("div");
    fieldWrapper.className = "flex flex-row field-wrapper"; // Add the class for flex layout

    const fieldNameInput = document.createElement("input");
    fieldNameInput.type = "text";
    fieldNameInput.placeholder = "Field Label";
    fieldNameInput.className = "field text-slate-11";
    fieldNameInput.required = true; // Field Name is required

    const fieldTypeInput = document.createElement("select"); // Create select element

    // Accepted data types
    const dataTypes = [
      "String",
      "Integer",
      "Float",
      "Datetime",
      "Other",
      "Select",
    ];

    // Add options for each data type
    dataTypes.forEach((dataType) => {
      const option = document.createElement("option");
      option.value = dataType.toLowerCase();
      option.textContent = dataType;
      fieldTypeInput.appendChild(option);
    });

    // Add event listener
    fieldTypeInput.addEventListener("change", () => {
      let extraInput = fieldWrapper.querySelector(".extra-input");
      if (
        fieldTypeInput.value === "select" ||
        fieldTypeInput.value === "other"
      ) {
        if (!extraInput) {
          extraInput = document.createElement("input");
          extraInput.type = "text";
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
    fieldTypeInput.className = "field text-slate-11";
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
      ["Program Type (Precollege, Workshop, or Networking)", "String"],
      ["Location", "String"],
      ["Eligible Grades", "String"],
      ["Cost", "Integer"],
      ["Deadline (MM/DD/YYYY)", "Datetime"],
      ["Program Dates or Duration", "String"],
      ["Host/University", "String"],
    ];

    defaultFields.forEach(([fieldName, fieldType]) => {
      const container = document.getElementById("fieldsContainer");

      const fieldWrapper = document.createElement("div");
      fieldWrapper.className = "flex flex-row"; // Add the class for flex layout

      const fieldNameInput = document.createElement("input");
      fieldNameInput.type = "text";
      fieldNameInput.placeholder = "Field Label";
      fieldNameInput.className = "field w-28";
      fieldNameInput.required = true; // Field Name is required
      fieldNameInput.value = fieldName;

      const fieldTypeInput = document.createElement("select"); // Create select element

      // Accepted data types
      const dataTypes = ["String", "Integer", "Float", "Datetime", "Other"];

      // Add options for each data type
      dataTypes.forEach((dataType) => {
        const option = document.createElement("option");
        option.value = dataType;
        option.text = dataType;
        fieldTypeInput.appendChild(option);
      });

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

      // Add styling class
      fieldTypeInput.className = "field";
      fieldTypeInput.required = true; // Field Type is required
      fieldTypeInput.value = fieldType;

      // Append input fields to the wrapper div
      fieldWrapper.appendChild(fieldNameInput);
      fieldWrapper.appendChild(fieldTypeInput);

      // Append the wrapper div to the container
      if (container) {
        container.appendChild(fieldWrapper);
      }
    });
  };

  const saveFields = () => {
    const fieldContainer = document.getElementById("fieldsContainer");
    if (fieldContainer) {
      const fieldNames = fieldContainer.querySelectorAll(".field");
      const fields = [];
      let hasBlankField = false;

      for (let i = 0; i < fieldNames.length; i += 2) {
        const fieldName = (fieldNames[i] as HTMLInputElement).value;
        const fieldType = (fieldNames[i + 1] as HTMLInputElement).value;

        if (!fieldName || !fieldType) {
          hasBlankField = true;
          break;
        }

        fields.push([fieldName, fieldType]);
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

      fields.forEach(() => {
        const tableCell = document.createElement("td");
        tableCell.textContent = "...";
        tableRow.appendChild(tableCell);
      });

      if (storedFieldsBody) {
        storedFieldsBody.appendChild(tableRow);
      }
    }
  };

  return (
    <section className="mx-auto max-w-5xl px-6 pb-8 md:max-w-7xl" id="start">
      <div className="flex flex-col items-start justify-between md:pb-12 gap-4">
        <h3 className="font-book font-styling font-display font-effect-hero text-center md:text-left text-[3rem] md:text-7xl leading-[3.35rem] md:leading-[4rem] tracking-tight font-gradient">
          1) Add Fields
        </h3>
        <p>The more detail you provide in the field name, the better.</p>
        <div id="fieldsContainer" className="flex flex-col"></div>
        <div className="flex flex-row">
          <button onClick={addField}>Add</button>
          <button onClick={addDefaultFields}>Add Default</button>
          <button onClick={saveFields}>Save</button>
        </div>
        <p id="field-status"></p>
      </div>
      <div className="flex flex-col items-start justify-between md:pb-12 gap-12">
        <div className="content">
          <h4 className="font-book font-styling font-display font-effect-hero text-center md:text-left text-[2rem] md:text-6xl leading-[2.35rem] md:leading-[3rem] tracking-tight font-gradient">
            Stored Fields
          </h4>
          <table id="storedFieldsTable">
            <thead>
              <tr></tr>
            </thead>
            <tbody id="storedFieldsBody"></tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Fields;
