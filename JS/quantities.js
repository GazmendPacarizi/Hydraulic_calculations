function addRow() {
    let table = document.getElementById("dataTable").getElementsByTagName('tbody')[0];
    let row = table.insertRow();
    
    for (let i = 0; i < 4; i++) {
        let cell = row.insertCell(i);
        let input = document.createElement("input");
        input.type = "number";
        input.step = "any";
        cell.appendChild(input);
    }
    
    let actionCell = row.insertCell(4);
    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.classList.add("btn", "btn-danger");
    deleteBtn.onclick = function() {
        table.deleteRow(row.rowIndex - 1);
        calculateVolume();
    };
    actionCell.appendChild(deleteBtn);
}

function calculateVolume() {
    let table = document.getElementById("dataTable").getElementsByTagName('tbody')[0];
    let totalVolume = 0;
    
    for (let row of table.rows) {
        let diameter = parseFloat(row.cells[0].firstChild.value) || 0;
        let length = parseFloat(row.cells[1].firstChild.value) || 0;
        let wideness = parseFloat(row.cells[2].firstChild.value) || 0;
        let volume = (length * wideness * (0.25 + diameter) - length * Math.PI*(diameter/2)**2).toFixed(2);
        row.cells[3].textContent = isNaN(volume) ? "0" : volume;
        totalVolume += parseFloat(volume) || 0;
    }
    
    document.getElementById("totalVolume").textContent = totalVolume.toFixed(2) + " " + "m³";
}