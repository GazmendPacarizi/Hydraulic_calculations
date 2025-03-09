 document.getElementById("rec_calculation").onclick = function () {
    let C = parseFloat(document.getElementById("rec_base").value);
    C = Number(C);

    let D = parseFloat(document.getElementById("rec_height").value);
    D = Number(D);

    let E = parseFloat(document.getElementById("rec_slope").value);
    E = Number(E);

    let G = parseFloat(document.getElementById("rec_friction").value);
    G = Number(G);


    let Y = C * D || 0;
    //let Xr = X.toFixed(2); // vetem dy presje dhjetore 
    //console.log(X);

    let N = C + 2 * D || 0; //PERIMETRI
    //console.log(P);

    let O = ((C * D) / (C + 2 * D)) || 0; //RADIUSI
    //console.log(R);
    
    
    let v1 = ((1 / G)) * (O **(2 / 3)) * Math.sqrt(E / 100) || 0;
    //console.log(v);
    
    let Q1 = v1 * Y || 0;
    
    document.getElementById("rec_Area").innerHTML = "Area is: " + " " + Y.toFixed(2) + " " + "m2";
    document.getElementById("rec_Perimeter").innerHTML = "Perimeter is: " + " " + N.toFixed(2) + " " + "m";
    document.getElementById("rec_Radius").innerHTML = "Radius is: " + " " + O.toFixed(2) + " " + "m";
    document.getElementById("rec_velocity").innerHTML = "Velocity is: " + " " + v1.toFixed(2) + " " + "m/s";
    document.getElementById("rec_flow").innerHTML = "Flow is: " + " " + Q1.toFixed(2) + " " + "m3/s";
}

document.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", function() {
        if (isNaN(parseFloat(this.value)) && this.value !== "") {
            alert("Please enter a valid number.");
            this.value = "";
        }
    });
});
