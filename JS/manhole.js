function calculateAll() {
    const rows = document.querySelectorAll("#manholeTable tbody tr");
    rows.forEach(row => {
        const numManholes = parseFloat(row.querySelector('.num-manholes').value) || 0;
        const diameter = parseFloat(row.querySelector('.diameter').value) || 0;
        const height = parseFloat(row.querySelector('.height').value) || 0;
        const pipeDiameter = parseFloat(row.querySelector('.pipe-diameter').value) || 0;
        const manholeHead = parseFloat(row.querySelector('.manhole-head').value) || 0;

        // Example calculations (adjust as needed)
        const manholeBody = numManholes * diameter * height;
        const concretePipeBed = numManholes * Math.PI * Math.pow(pipeDiameter / 2, 2) * height;
        const manholeConcreteBed = ((diameter + 0.5) * (diameter + 0.5)) * 0.2;
        const manholeGravelBed = ((diameter + 0.5) * (diameter + 0.5)) * 0.2;
        const manholeSteelBarStairs = numManholes * height / 0.3;

        // Set calculated values in the row
        row.querySelector('.manhole-body').textContent = manholeBody.toFixed(2);
        row.querySelector('.concrete-pipe-bed').textContent = concretePipeBed.toFixed(2);
        row.querySelector('.manhole-concrete-bed').textContent = manholeConcreteBed.toFixed(2);
        row.querySelector('.manhole-gravel-bed').textContent = manholeGravelBed.toFixed(2);
        row.querySelector('.manhole-steel-bar-stairs').textContent = manholeSteelBarStairs.toFixed(2);
    });

    updateTotals(); // Update the totals after calculation
    saveData(); // Save the updated data in local storage
}

// Function to add a new row to the table
function addRow() {
    const table = document.querySelector("#manholeTable tbody");
    const newRow = table.insertRow();

    // Create input cells for the row
    newRow.innerHTML = `
        <td><input type="number" class="form-control num-manholes"></td>
        <td><input type="number" class="form-control diameter"></td>
        <td><input type="number" class="form-control height"></td>
        <td><input type="number" class="form-control pipe-diameter"></td>
        <td><input type="number" class="form-control manhole-head"></td>
        <td class="manhole-body">0</td>
        <td class="concrete-pipe-bed">0</td>
        <td class="manhole-concrete-bed">0</td>
        <td class="manhole-gravel-bed">0</td>
        <td class="manhole-steel-bar-stairs">0</td>
        <td><button class="btn btn-delete" onclick="deleteRow(this)">Delete</button></td>
    `;

    saveData(); // Save the new row data
}

// Function to delete a row
function deleteRow(button) {
    button.closest('tr').remove();
    updateTotals();
    saveData();
}

// Function to calculate totals and update the footer
function updateTotals() {
    let totalManholeBody = 0;
    let totalConcretePipeBed = 0;
    let totalManholeConcreteBed = 0;
    let totalManholeGravelBed = 0;
    let totalManholeSteelBarStairs = 0;

    document.querySelectorAll("#manholeTable tbody tr").forEach(row => {
        totalManholeBody += parseFloat(row.querySelector('.manhole-body').textContent) || 0;
        totalConcretePipeBed += parseFloat(row.querySelector('.concrete-pipe-bed').textContent) || 0;
        totalManholeConcreteBed += parseFloat(row.querySelector('.manhole-concrete-bed').textContent) || 0;
        totalManholeGravelBed += parseFloat(row.querySelector('.manhole-gravel-bed').textContent) || 0;
        totalManholeSteelBarStairs += parseFloat(row.querySelector('.manhole-steel-bar-stairs').textContent) || 0;
    });

    // Update totals in the footer
    document.getElementById("totalManholeBody").textContent = totalManholeBody.toFixed(2);
    document.getElementById("totalConcretePipeBed").textContent = totalConcretePipeBed.toFixed(2);
    document.getElementById("totalManholeConcreteBed").textContent = totalManholeConcreteBed.toFixed(2);
    document.getElementById("totalManholeGravelBed").textContent = totalManholeGravelBed.toFixed(2);
    document.getElementById("totalManholeSteelBarStairs").textContent = totalManholeSteelBarStairs.toFixed(2);
}

// Function to save data in local storage
function saveData() {
    const tableData = [];
    document.querySelectorAll("#manholeTable tbody tr").forEach(row => {
        tableData.push({
            numManholes: row.querySelector('.num-manholes').value,
            diameter: row.querySelector('.diameter').value,
            height: row.querySelector('.height').value,
            pipeDiameter: row.querySelector('.pipe-diameter').value,
            manholeHead: row.querySelector('.manhole-head').value
        });
    });
    localStorage.setItem('manholeTableData', JSON.stringify(tableData));
}

// Function to load data from local storage
function loadData() {
    const storedData = JSON.parse(localStorage.getItem('manholeTableData'));
    if (storedData) {
        storedData.forEach(data => {
            addRow();
            const lastRow = document.querySelector("#manholeTable tbody tr:last-child");
            lastRow.querySelector('.num-manholes').value = data.numManholes;
            lastRow.querySelector('.diameter').value = data.diameter;
            lastRow.querySelector('.height').value = data.height;
            lastRow.querySelector('.pipe-diameter').value = data.pipeDiameter;
            lastRow.querySelector('.manhole-head').value = data.manholeHead;
        });
    }
}

// Load saved data when the page loads
window.onload = loadData;