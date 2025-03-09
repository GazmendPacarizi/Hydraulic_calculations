 document.getElementById("trap_calculation").onclick = function () {
    let B2 = parseFloat(document.getElementById("trap_base").value) || 0;
    

    let B1 = parseFloat(document.getElementById("trap_sideB1").value) || 0;
    

    let B3 = parseFloat(document.getElementById("trap_sideB3").value) || 0;
    

    let H = parseFloat(document.getElementById("trap_height").value) || 0;
    

    let S = parseFloat(document.getElementById("trap_slope").value) || 0.000001;
    

    let n1 = parseFloat(document.getElementById("trap_friction1").value) || 0;
    

    let n2 = parseFloat(document.getElementById("trap_friction2").value) || 0;
    

    let n3 = parseFloat(document.getElementById("trap_friction3").value) || 0;
    
    //kur perdorim || 0; edhe nese ndonjeren vlere e leme te paplotesuar, behet llogaritja, nese nuk e shenojme kete, atehere e qet NaN
    


    let A = (B2 * H) + 0.5 * B1 * H + 0.5 * B3 * H || 0;
    //let Xr = X.toFixed(2); // vetem dy presje dhjetore 
    //console.log(X);

    let P = B2 + Math.sqrt(B1**2 + H**2) + Math.sqrt(B3**2 + H**2) || 0;
    //console.log(P);

    let R = A / P || 0;
    //console.log(R);

    let A1 = (0.5 * B1 * H);
    

    let A2 = (B2 * H);
    

    let A3 = (0.5 * B3 * H);
    

    let P1 = Math.sqrt(B1**2 + H**2);
   

    let P2 = B2;
    //P2 = Number(P2);

    let P3 = Math.sqrt(B3**2 + H**2);
    //P3 = Number(P3);

    let R1 = A1 / P1;
    //R1 = Number(R1);
    let R2 = A2 / P2;
    //R2 = Number(R2);
    let R3 = A3 / P3;
    //R3 = Number(R3);


    let v1 = (1 / n1) * R1**(2/3) * Math.sqrt(S / 100);
    //v1 = Number(v1);

    let v2 = (1 / n2) * R2**(2 / 3) * Math.sqrt(S / 100);
    //v2 = Number(v2);

    let v3 = (1 / n3) * R3**(2 / 3) * Math.sqrt(S / 100);
    //v3 = Number(v3);

    let v = (v1 * A1 + v2 * A2 + v3 * A3) / (A1 + A2 + A3) || 0;

    
    let Q = v1 * A1 + v2 * A2 + v3 * A3 || 0;
    
    document.getElementById("trap_Area").innerHTML = "Area is: " + " " + A.toFixed(2) + " " + "m2";
    document.getElementById("trap_Perimeter").innerHTML = "Perimeter is: " + " " + P.toFixed(2) + " " + "m";
    document.getElementById("trap_Radius").innerHTML = "Radius is: " + " " + R.toFixed(2) + " " + "m";
    document.getElementById("trap_velocity").innerHTML = "Velocity is: " + " " + v.toFixed(2) + " " + "m/s";
    document.getElementById("trap_flow").innerHTML = "Flow is: " + " " + Q.toFixed(2) + " " + "m3/s";
}

document.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", function() {
        if (isNaN(parseFloat(this.value)) && this.value !== "") {
            alert("Please enter a valid number.");
            this.value = "";
        }
    });
});

