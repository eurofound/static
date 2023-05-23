let currentPage = 1;
const rowsPerPage = 10;
let filteredData = [];

// Function to load the PapaParse library dynamically
function loadPapaParse(callback) {
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js';
  script.onload = callback;
  document.head.appendChild(script);
}

async function fetchCSVData(country) {
  await new Promise((resolve) => {
    loadPapaParse(resolve);
  });

  const response = await fetch('https://static.eurofound.europa.eu/covid19db/data/covid19db.csv');
  const csvData = await response.text();
  const parsedData = Papa.parse(csvData, { header: true, skipEmptyLines: true }).data;

  filteredData = parsedData.filter(row => row.Country === country);
  displayData();
}

function displayData() {
  const policyWatchTableBody = document.getElementById("policyWatchTableBody");
  policyWatchTableBody.innerHTML = "";

  const start = (currentPage - 1) * rowsPerPage;
  const end = Math.min(start + rowsPerPage, filteredData.length);

  for (let i = start; i < end; i++) {
    const row = filteredData[i];
    const tr = document.createElement("tr");

    const titleCell = document.createElement("td");
    titleCell.textContent = row.Title;
    tr.appendChild(titleCell);

    const dateCell = document.createElement("td");
    dateCell.textContent = row["Start date"];
    tr.appendChild(dateCell);

    const categoryCell = document.createElement("td");
    categoryCell.textContent = row.Subcategory;
    tr.appendChild(categoryCell);

    const urlCell = document.createElement("td");
    const link = document.createElement("a");
    link.href = "https://static.eurofound.europa.eu/covid19db/";
    link.className = "btn btn-primary";
    link.textContent = "View";
    urlCell.appendChild(link);
    tr.appendChild(urlCell);

    policyWatchTableBody.appendChild(tr);
  }
  
  updatePaginationButtons();
}

function updatePaginationButtons() {
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage * rowsPerPage >= filteredData.length;
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    displayData();
  }
}

function nextPage() {
  if (currentPage * rowsPerPage < filteredData.length) {
    currentPage++;
    displayData();
  }
}

function searchFunction() {
  const input = document.getElementById("searchInput");
const searchValue = input.value.toLowerCase();
if (searchValue) {
filteredData = filteredData.filter(row => {
  return row.Title.toLowerCase().includes(searchValue) || row.Identifier.toLowerCase().includes(searchValue);
});
} else {
fetchCSVData(); // Re-fetch data if the search value is empty
}

currentPage = 1; // Reset current page
displayData(); // Update table with the filtered data
}

// Fetch and display data on page load
fetchCSVData();