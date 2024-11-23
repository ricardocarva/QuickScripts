// Define scripts dynamically
const SCRIPTS = {
    base64_encode: {
      name: "Base64 Encode",
      function: (input) => btoa(input)
    },
    base64_decode: {
      name: "Base64 Decode",
      function: (input) => {
        try {
          return atob(input);
        } catch (e) {
          return "Invalid Base64 input";
        }
      }
    },
    camel_case: {
      name: "Camel Case",
      function: (input) => {
        const words = input.split(" ");
        return words[0].toLowerCase() + words.slice(1).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join("");
      }
    },
    capitalize: {
      name: "Capitalize",
      function: (input) => input.charAt(0).toUpperCase() + input.slice(1).toLowerCase()
    },
    capture_each_line: {
        name: "Capture Each Line",
        function: (input) => captureEachLine(input).join("\n")
      },
      count_characters: {
        name: "Count Characters",
        function: (input) => `Total Characters: ${countCharacters(input)}`
      },
      count_lines: {
        name: "Count Lines",
        function: (input) => `Total Lines: ${countLines(input)}`
      },
      count_words: {
        name: "Count Words",
        function: (input) => `Total Words: ${countWords(input)}`
      },
      generate_numbered_list: {
        name: "Generate Numbered List",
        function: (input) => generateNumberedList(input)
      },
      join_by: {
        name: "Join By",
        function: (input, params) => joinBy(input, params.delimiter || ", "),
        parameters: [
          { name: "delimiter", label: "Delimiter", type: "text", default: ", " }
        ]
      },
      json_minify: {
        name: "JSON Minify",
        function: (input) => jsonMinify(input),
        parameters: []
      },
      json_pretty_print: {
        name: "JSON Pretty Print",
        function: (input) => jsonPrettyPrint(input),
        parameters: []
      },
      kebab_case: {
        name: "kebab-case",
        function: (input) => kebabCase(input),
        parameters: []
      },
      keep_matching_lines: {
        name: "Keep / Filter in Lines Matching",
        function: (input, params) => keepMatchingLines(input, params.pattern || ""),
        parameters: [
          { name: "pattern", label: "Pattern", type: "text", default: "" }
        ]
      },
      keep_duplicate_lines: {
        name: "Keep Only Duplicate Lines",
        function: (input) => keepDuplicateLines(input),
        parameters: []
      },
      limit_lines: {
        name: "Limit Lines",
        function: (input, params) => limitLines(input, params.limit || 5),
        parameters: [
          { name: "limit", label: "Line Limit", type: "number", default: 5 }
        ]
      },
      lower_case: {
        name: "Lower Case",
        function: (input) => toLowerCase(input),
        parameters: []
      },
      prepend_text_to_all_lines: {
        name: "Prepend Text to All Lines",
        function: (input, params) => prependTextToAllLines(input, params.text || ""),
        parameters: [
          { name: "text", label: "Text to Prepend", type: "text", default: "> " }
        ]
      },
      remove_all_new_lines: {
        name: "Remove All New Lines",
        function: (input) => removeAllNewLines(input),
        parameters: []
      }
    //     Adding a New Script
    // To add a new script, simply add a new key-value pair to the SCRIPTS object. For example:

    //, reverse_text = {
    //     name: "Reverse Text",
    //     function: (input) => input.split("").reverse().join("")
    //   }

    // To-DO

    // WRITE unit tests for the ones above
    // Make sure they work

    // Include these:
    // Remove Duplicate Lines
    // Remove Empty Lines
    // Remove / Filter out Lines Matching
    // Remove Regex In All Lines
    // Remove Wrapping (unwrap)
    // Replace Regex in All Lines
    // Reverse camelCase
    // Reverse Characters
    // Reverse Lines
    // Shuffle Lines
    // snake_case
    // Sort Lines Alphabetically
    // Sort Lines Numerically
    // Split By
    // Sum All Numbers
    // Trim Each Line
    // Upper Case
    // Wrap Each Line With
  }; 

  function captureEachLine(input) {
    return input.split("\n").map(line => line.trim());
  }
  
  function countCharacters(input) {
    return input.length;
  }
  
  function countLines(input) {
    return input.split("\n").length;
  }
  
  function generateNumberedList(input) {
    return input
      .split("\n")
      .map((line, index) => `${index + 1}. ${line.trim()}`)
      .join("\n");
  }
  

// Dynamically populate dropdown and render parameter fields
const scriptDropdown = document.getElementById("script_type");
const dynamicParamsContainer = document.getElementById("dynamic-parameters");

// Populate the dropdown
Object.keys(SCRIPTS).forEach((key) => {
  const option = document.createElement("option");
  option.value = key;
  option.textContent = SCRIPTS[key].name;
  scriptDropdown.appendChild(option);
});

// Render dynamic parameter inputs based on selected script
function renderParameters(scriptKey) {
    dynamicParamsContainer.innerHTML = ""; // Clear existing fields
    const script = SCRIPTS[scriptKey];
    if (script && script.parameters && script.parameters.length > 0) {
      script.parameters.forEach((param) => {
        const label = document.createElement("label");
        label.textContent = param.label;
        label.htmlFor = param.name;
  
        const input = document.createElement("input");
        input.type = param.type;
        input.name = param.name;
        input.id = param.name;
        input.value = param.default || "";
  
        dynamicParamsContainer.appendChild(label);
        dynamicParamsContainer.appendChild(input);
      });
    }
  }
  

// Update parameters on dropdown change
scriptDropdown.addEventListener("change", (e) => {
  renderParameters(e.target.value);
});

// Initial render
renderParameters(scriptDropdown.value);

document.getElementById("run-script").addEventListener("click", () => {
    const selectedScript = scriptDropdown.value;
    const inputText = document.getElementById("input_text").value;
    const outputElement = document.getElementById("output");
  
    const script = SCRIPTS[selectedScript];
    if (script) {
      const params = {};
      if (script.parameters && script.parameters.length > 0) {
        script.parameters.forEach((param) => {
          params[param.name] = document.getElementById(param.name)?.value || param.default;
        });
      }
  
      try {
        const result = script.function(inputText, params);
        outputElement.textContent = result;
      } catch (error) {
        outputElement.textContent = `Error: ${error.message}`;
      }
    } else {
      outputElement.textContent = "Invalid script selected.";
    }
  });
  