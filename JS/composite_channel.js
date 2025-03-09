document.getElementById("composite_trap_calculation").onclick = function() {
    let B4 = parseFloat(document.getElementById("composit_trap_base").value) || 0;
    let B1 = parseFloat(document.getElementById("composit_trap_sideB1").value) || 0;
    let B2 = parseFloat(document.getElementById("composit_trap_sideB2").value) || 0;
    let B3 = parseFloat(document.getElementById("composit_trap_sideB3").value) || 0;
    let H1 = parseFloat(document.getElementById("composit_trap_height1").value) || 0;
    let H2 = parseFloat(document.getElementById("composit_trap_height2").value) || 0;
    let B5 = parseFloat(document.getElementById("composit_trap_sideB5").value) || 0;
    let B6 = parseFloat(document.getElementById("composit_trap_sideB6").value) || 0;
    let B7 = parseFloat(document.getElementById("composit_trap_sideB7").value) || 0;
    let S = parseFloat(document.getElementById("composite_trap_slope").value) || 0.00001;
    let n1 = parseFloat(document.getElementById("composite_trap_friction1").value) || 0;
    let n2 = parseFloat(document.getElementById("composite_trap_friction2").value) || 0;
    let n3 = parseFloat(document.getElementById("composite_trap_friction3").value) || 0;
    let n4 = parseFloat(document.getElementById("composite_trap_friction4").value) || 0;
    let n5 = parseFloat(document.getElementById("composite_trap_friction5").value) || 0;
    let n6 = parseFloat(document.getElementById("composite_trap_friction6").value) || 0;
    let n7 = parseFloat(document.getElementById("composite_trap_friction7").value) || 0;

    let A1 =0.5 * B1 * H2;
    let A2 = B2 * H2;
    let A3 = 0.5 * B3 * H1 + B3 * H2;
    let A4 = B4 * (H1 + H2);
    let A5 = 0.5 * B5 * H1 + B5 * H2;
    let A6 = B6 * H2;
    let A7 = 0.5 * B7 * H2;

    let P1 = Math.sqrt(B1**2 + H2**2);
    let P2 = B2;
    let P3 = Math.sqrt(B3**2 + H1**2);
    let P4 = B4;
    let P5 = Math.sqrt(B5**2 + H1**2);
    let P6 = B6;
    let P7 = Math.sqrt(B7**2 + H2**2);

    let R1 = A1 / P1;
    let R2 = A2 / P2;
    let R3 = A3 / P3;
    let R4 = A4 / P4;
    let R5 = A5 / P5;
    let R6 = A6 / P6;
    let R7 = A7 / P7;

    let A = A1 + A2 + A3 + A4 + A5 + A6 + A7;
    let P = P1 + P2 + P3 + P4 + P5 + P6 + P7;
    let R = R1 + R2 + R3 + R4 + R5 + R6 + R7 || 0;;

    let v1 = (1 / n1) * R1**(2/3) * Math.sqrt(S / 100);
    let v2 = (1 / n2) * R2**(2/3) * Math.sqrt(S / 100);
    let v3 = (1 / n3) * R3**(2/3) * Math.sqrt(S / 100);
    let v4 = (1 / n4) * R4**(2/3) * Math.sqrt(S / 100);
    let v5 = (1 / n5) * R5**(2/3) * Math.sqrt(S / 100);
    let v6 = (1 / n6) * R6**(2/3) * Math.sqrt(S / 100);
    let v7 = (1 / n7) * R7**(2/3) * Math.sqrt(S / 100);
    let v = (v1 * A1 + v2 * A2 + v3 * A3 + v4 * A4 + v5 * A5 + v6 * A6 + v7 * A7) / (A1 + A2 + A3 + A4 + A5 + A6 + A7) || 0;

    let Q = v1 * A1 + v2 * A2 + v3 * A3 + v4 * A4 + v5 * A5 + v6 * A6 + v7 * A7 || 0;


    document.getElementById("composite_trap_Area").innerHTML = "Area is:" + " " + A.toFixed(2) + " " + "m2";
    document.getElementById("composite_trap_Perimeter").innerHTML = "Perimeter is:" + " " + P.toFixed(2) + " " + "m";
    document.getElementById("composite_trap_Radius").innerHTML = "Radius is:" + " " + R.toFixed(2) + " " + "m";
    document.getElementById("composite_trap_velocity").innerHTML = "Velocity is:" + " " + v.toFixed(2) + " " + "m/s";
    document.getElementById("composite_trap_flow").innerHTML = "Flow is:" + " " + Q.toFixed(2) + " " + "m3/s";

}

document.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", function() {
        if (isNaN(parseFloat(this.value)) && this.value !== "") {
            alert("Please enter a valid number.");
            this.value = "";
        }
    });
});
