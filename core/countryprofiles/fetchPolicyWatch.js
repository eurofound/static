// fetchPolicyWatch.js

// Load PapaParse synchronously
document.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js"></script>');

let itemsPerPage = 10; // Define itemsPerPage globally

async function fetchCSVData(country) {
    try {
        const response = await fetch('https://static.eurofound.europa.eu/covid19db/data/policywatch-website.csv');
        const csvData = await response.text();

        Papa.parse(csvData, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            complete: (results) => parseComplete(results, country) // Use a separate function for the complete callback
        });
    } catch (error) {
        console.error("Error fetching CSV data:", error);
    }
}

function parseComplete(results, country) {
    if (results.data && results.data.length > 0) {
        filteredData = results.data.filter(data => !country || data.calc_country === country);
        filteredData.sort((a, b) => new Date(b.calc_lastUpdate) - new Date(a.calc_lastUpdate)); // Sort by date, newest to oldest
        currentPage = 1; // Reset currentPage when fetching new data
        updateTable(currentPage);
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
}

function scrollToTableTop() {
    const tableBody = document.getElementById('policyWatchTableBody');
    tableBody.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

let currentPage = 1;
let filteredData = []; // Define filteredData globally

function updateTable(currentPage) {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const dataToShow = filteredData.slice(startIndex, endIndex);

    const tableBody = document.getElementById('policyWatchTableBody'); // Define tableBody here
    const prevBtn = document.getElementById('prevBtn'); // Define prevBtn here
    const nextBtn = document.getElementById('nextBtn'); // Define nextBtn here

    if (dataToShow.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="4">
                    There are no results. Click <a href="https://static.eurofound.europa.eu/covid19db/">here</a> to access EU PolicyWatch.
                </td>
            </tr>
        `;
        prevBtn.disabled = true;
        nextBtn.disabled = true;
    } else {
        tableBody.innerHTML = '';
        for (const data of dataToShow) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${data.title}</td>
                <td>${formatDate(data.calc_lastUpdate)}</td>
                <td>${data.calc_subMinorCategory}</td>
                <td><a href="${data.calc_githubURL}" class="btn btn-secondary">View</a></td>
            `;
            tableBody.appendChild(row);
        }

        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = endIndex >= filteredData.length;

        if (currentPage > 1) {
            scrollToTableTop();
        }
    }
}


function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        updateTable(currentPage);
    }
}

function nextPage() {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        updateTable(currentPage);
    }
}
