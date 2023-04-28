(function (global, parameter) {
  function createColumn(text) {
    var column = document.createElement("div");
    column.className = "col";
    column.textContent = text;
    return column;
  }

  function createThreeColumnDiv(param) {
    var container = document.createElement("div");
    container.className = "container";

    var row = document.createElement("div");
    row.className = "row";

    var col1 = createColumn("Column 1: " + param);
    var col2 = createColumn("Column 2: " + param);
    var col3 = createColumn("Column 3: " + param);

    row.appendChild(col1);
    row.appendChild(col2);
    row.appendChild(col3);
    container.appendChild(row);

    return container;
  }

  global.initThreeColumnDiv = function (param) {
    var threeColumnDiv = createThreeColumnDiv(param);
    document.body.appendChild(threeColumnDiv);
  };
})(window, "your_parameter_value");
