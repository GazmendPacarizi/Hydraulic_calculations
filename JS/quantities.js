document.addEventListener("DOMContentLoaded", loadFromLocalStorage);

        function addRow() {
            let table = document.querySelector("#dataTable tbody");
            let row = table.insertRow();
            
            for (let i = 0; i < 5; i++) {
                let cell = row.insertCell(i);
                let input = document.createElement("input");
                input.type = "number";
                input.step = "any";
                input.classList.add("form-control");
                cell.appendChild(input);
            }

            for (let i = 5; i < 10; i++) row.insertCell(i).textContent = "0";

            let actionCell = row.insertCell(10);
            let deleteBtn = document.createElement("button");
            deleteBtn.innerText = "Delete";
            deleteBtn.classList.add("btn", "btn-danger");
            deleteBtn.onclick = function() {
                row.remove();
                saveToLocalStorage();
            };
            actionCell.appendChild(deleteBtn);
            
            saveToLocalStorage();
        }

        function calculateVolume() {
            let table = document.querySelector("#dataTable tbody");
            let totalExcavation = 0, totalExcavationNoUpper = 0, totalSand = 0, totalFormwork = 0, totalBaseSurface = 0;

            for (let row of table.rows) {
                let length = parseFloat(row.cells[0].firstChild.value) || 0;
                let width = parseFloat(row.cells[1].firstChild.value) || 0;
                let height = parseFloat(row.cells[2].firstChild.value) || 0;
                let pipeDiameter = parseFloat(row.cells[3].firstChild.value) || 0;
                let upperLayers = parseFloat(row.cells[4].firstChild.value) || 0;

                let totalExc = (length * width * height).toFixed(2);
                let excNoUpper = (length * width * (height - upperLayers)).toFixed(2);
                let sand = ((length * width * (0.25 + pipeDiameter)) - (length * Math.PI * (pipeDiameter / 2) ** 2)).toFixed(2);
                let formwork = (2 * (length * height)).toFixed(2);
                let baseSurface = (length * width).toFixed(2);

                row.cells[5].textContent = totalExc;
                row.cells[6].textContent = excNoUpper;
                row.cells[7].textContent = sand;
                row.cells[8].textContent = formwork;
                row.cells[9].textContent = baseSurface;

                totalExcavation += parseFloat(totalExc) || 0;
                totalExcavationNoUpper += parseFloat(excNoUpper) || 0;
                totalSand += parseFloat(sand) || 0;
                totalFormwork += parseFloat(formwork) || 0;
                totalBaseSurface += parseFloat(baseSurface) || 0;
            }

            document.getElementById("totalExcavation").textContent = totalExcavation.toFixed(2) + " m³";
            document.getElementById("totalExcavationNoUpper").textContent = totalExcavationNoUpper.toFixed(2) + " m³";
            document.getElementById("totalSand").textContent = totalSand.toFixed(2) + " m³";
            document.getElementById("totalFormwork").textContent = totalFormwork.toFixed(2) + " m²";
            document.getElementById("totalBaseSurface").textContent = totalBaseSurface.toFixed(2) + " m²";

            saveToLocalStorage();
        }

        function saveToLocalStorage() {
            let data = [];
            document.querySelectorAll("#dataTable tbody tr").forEach(row => {
                let rowData = [];
                for (let i = 0; i < 5; i++) {
                    rowData.push(row.cells[i].firstChild.value || "");
                }
                data.push(rowData);
            });
            localStorage.setItem("hydroTableData", JSON.stringify(data));
        }

        function loadFromLocalStorage() {
            let data = JSON.parse(localStorage.getItem("hydroTableData")) || [];
            data.forEach(values => {
                addRow();
                let lastRow = document.querySelector("#dataTable tbody tr:last-child");
                values.forEach((value, index) => {
                    lastRow.cells[index].firstChild.value = value;
                });
            });
        }

        function exportToExcel() {
            let table = document.getElementById("dataTable");
            let wb = XLSX.utils.table_to_book(table, {sheet:"Sheet1"});
            XLSX.writeFile(wb, "Hydro_Calculations.xlsx");
        };