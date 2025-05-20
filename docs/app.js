localStorage.getItem("division");
// saving data
function saveLabel(item) {
  let date = new Date().getTime();
  console.log("date: ", date);
  db.collection("labels").add({ barcode: item, date });
}

document.addEventListener("DOMContentLoaded", function () {
  let elems = document.querySelectorAll(".collapsible, .modal");
  let instance1 = M.Collapsible.init(elems, {});
  let instance2 = M.Modal.init(elems, {});
});

document.addEventListener("DOMContentLoaded", function () {
  let element = document.querySelectorAll("select");
  let instance3 = M.FormSelect.init(element, {});

  // localStorage.getItem('division') === null
  localStorage.setItem("division", "2230");
  // : localStorage.getItem('division')
});

window.addEventListener("DOMContentLoaded", () => {
  const storedOrderNumber = localStorage.getItem("orderNumber");
  if (storedOrderNumber) {
    const singleInput = document.querySelector("#orderNumber");
    const multipleInput = document.querySelector("#orderNumberMult");
    if (singleInput) singleInput.value = storedOrderNumber;
    if (multipleInput) multipleInput.value = storedOrderNumber;
  }
});


document.querySelector("select").addEventListener("change", setDivision);

document
  .querySelector("#singleCodeBtn")
  .addEventListener("click", generateSingle);

document
  .querySelector("#clearSingleButton")
  .addEventListener("click", clearSingleData);

document
  .querySelector("#multipleCodeBtn")
  .addEventListener("click", generateMultiple);

document
  .querySelector("#clearMultipleButton")
  .addEventListener("click", clearMultipleData);

document
  .querySelector("#palletCodeBtn")
  .addEventListener("click", generatePallet);

document
  .querySelector("#clearPalletButton")
  .addEventListener("click", clearPalletData);

function setDivision(e) {
  division = e.target.value;
  localStorage.setItem("division", division.toString());
}

// function generateSingle(e) {
//   e.preventDefault();
//   let orderNumber = document.querySelector("#orderNumber").value;
//   orderNumber = ("0000" + orderNumber).slice(-8);
//   let lineNumber = document.querySelector("#lineNumber").value;
//     lineNumber = ("0000" + lineNumber).slice(-4);
//   let itemNumber = document.querySelector("#itemNumber").value;
//     itemNumber = ("0000" + itemNumber).slice(-6);

//   let quantity = document.querySelector("#quantityNumber").value;
//     quantity = ("0000" + quantity).slice(-4);

//   // let itemCode = document.querySelector("#singleCode").value;
//   let itemCode = orderNumber + lineNumber + itemNumber + quantity;
//   itemCode = ("000000" + itemCode).slice(-22);
//   let tr = document.createElement("tr");
//   let td = document.createElement("td");
//   let p = document.createElement("p");
//     p.className = "s12 center";
//     p.textContent = itemCode;
//   let output = document.createElement("img");
//   output.className = "";
//   output.src = `
//             https://barcode.tec-it.com/barcode.ashx?data=${itemCode}&code=Code128&multiplebarcodes=false&translate-esc=false&unit=Fit&dpi=96&imagetype=Gif&rotation=0&color=%23000000&bgcolor=%23ffffff&qunit=Mm&quiet=0' alt='Barcode Generator TEC-IT
//             `;
//   document.getElementById("barcodeTableData").append(tr, output, td, p);

//   saveLabel(itemCode);
// }

function generateSingle(e) {
  e.preventDefault();

  let orderInput = document.querySelector("#orderNumber");
  let orderNumber = orderInput.value.padStart(8, '0');
  localStorage.setItem("orderNumber", orderInput.value); // store raw value
  let lineNumber = document.querySelector("#lineNumber").value.padStart(4, '0');
  let itemNumber = document.querySelector("#itemNumber").value.padStart(6, '0');
  let quantity = document.querySelector("#quantityNumber").value.padStart(4, '0');

  let itemCode = orderNumber + lineNumber + itemNumber + quantity;
  itemCode = itemCode.padStart(22, '0');

  let tr = document.createElement("tr");
  tr.style.height = "3em";

  let td = document.createElement("td");
  td.style.textAlign = "center";
  td.style.paddingBottom = "3em"; // or "10px", "20px", etc.


  let output = document.createElement("img");
  output.src = `https://barcode.tec-it.com/barcode.ashx?data=${itemCode}&code=Code128&text=true&multiplebarcodes=false&translate-esc=false&unit=Fit&dpi=96&imagetype=Gif&rotation=0&color=%23000000&bgcolor=%23ffffff&qunit=Mm&quiet=0`;

  td.appendChild(output);
  tr.appendChild(td);
  document.getElementById("barcodeTableData").appendChild(tr);

  // saveLabel(itemCode);
}

function generateMultiple(e) {
  e.preventDefault();

  let orderInput = document.querySelector("#orderNumberMult");
  let orderNumber = orderInput.value.padStart(8, '0');
  localStorage.setItem("orderNumber", orderInput.value); // store raw value
  let lineNumber = document.querySelector("#lineNumberMult").value.padStart(4, '0');
  let itemNumber = document.querySelector("#itemNumberMult").value.padStart(6, '0');
  let itemQuantity = document.querySelector("#quantityNumberMult").value.padStart(4, '0');

  let baseItemCode = orderNumber + lineNumber + itemNumber + itemQuantity; // e.g. 8+4+6+4 = 22 digits
  let baseCodeNumeric = BigInt(baseItemCode); // Use BigInt to handle large numbers

  let quantity = parseInt(document.querySelector("#quantity").value);

  for (let i = 0; i < quantity; i++) {
  let currentCode = (baseCodeNumeric + BigInt(i)).toString().padStart(22, '0');

  let tr = document.createElement("tr");
  tr.style.height = "3em";

  let td = document.createElement("td");
  td.style.textAlign = "center"; // Optional: center image
  td.style.paddingBottom = "3em"; // or "10px", "20px", etc.


  let output = document.createElement("img");
  output.src = `https://barcode.tec-it.com/barcode.ashx?data=${currentCode}&code=Code128&multiplebarcodes=false&translate-esc=false&unit=Fit&dpi=96&imagetype=Gif&rotation=0&color=%23000000&bgcolor=%23ffffff&qunit=Mm&quiet=0`;

  // saveLabel(currentCode);

  td.appendChild(output);
  tr.appendChild(td);
  document.getElementById("multipleTableData").appendChild(tr);
}

}

// function generateMultiple(e) {
//   e.preventDefault();
//   let orderNumber = document.querySelector("#orderNumberMult").value;
//     orderNumber = ("0000" + orderNumber).slice(-8);
//   let lineNumber = document.querySelector("#lineNumberMult").value;
//     lineNumber = ("0000" + lineNumber).slice(-4);
//   let itemNumber = document.querySelector("#itemNumberMult").value;
//     itemNumber = ("0000" + itemNumber).slice(-6);
//   let itemQuantity = document.querySelector("#quantityNumberMult").value;
//     itemQuantity = ("0000" + itemQuantity).slice(-4);

//   // let itemCode = document.querySelector("#singleCode").value;
//   let itemCode = orderNumber + lineNumber + itemNumber + itemQuantity;

//   let quantity = document.querySelector("#quantity").value;

//   while (quantity > 0) {
//   // itemCode = ("000000" + itemCode).slice(-22);
//     let tr = document.createElement("tr");
//     let td = document.createElement("td");
//     let p = document.createElement("p");
//     p.className = "s12 center";
//     p.textContent = itemCode;
//     tr.style.height = "3em";
//     let output = document.createElement("img");
//     output.src = `
//     https://barcode.tec-it.com/barcode.ashx?data=${itemCode}&code=Code128&multiplebarcodes=false&translate-esc=false&unit=Fit&dpi=96&imagetype=Gif&rotation=0&color=%23000000&bgcolor=%23ffffff&qunit=Mm&quiet=0' alt='Barcode Generator TEC-IT
//   `;
//     saveLabel(itemCode);
//     itemCode++;
//     quantity--;
//     document.getElementById("multipleTableData").append(tr, output, td, p);
//   }
// }

function generatePallet(e) {
  e.preventDefault();
  let pallets = document.getElementById("palletNumber").value;
  let palletArray = pallets.split(",");
  let stop = document.getElementById("stopNumber").value;
  stop = ("00" + stop).slice(-2);
  let route = document.getElementById("routeNumber").value;

  division = localStorage.getItem("division");
  // console.log('in pallet label', division)

  let d = document.querySelector('input[type="date"]');
  console.log(d.value);

  let month = d.value.split("-")[1];
  let year = d.value.split("-")[0];
  let day = d.value.split("-")[2];
  console.log(day + " " + month + " " + year);
  // let month = ("00" + (d.getMonth() + 1)).slice(-2);
  // let year = d.getFullYear();
  // let day = ("00" + d.getDate()).slice(-2);

  for (let i = 0; i < palletArray.length; i++) {
    //itemCode = palletArray[i] + year + month + day + division + route + stop;
    itemCode = palletArray[i] + month + day + division + route + stop;
    
    let tr = document.createElement("tr");

    let td = document.createElement("td");
    let p = document.createElement("p");
    p.className = "s12 center";
    p.textContent = itemCode;
    tr.style.height = "3em";
    let output = document.createElement("img");
    output.src = `
    https://barcode.tec-it.com/barcode.ashx?data=${itemCode}&code=PDF417&multiplebarcodes=false&translate-esc=false&unit=Fit&dpi=96&imagetype=Gif&rotation=0&color=%23000000&bgcolor=%23ffffff&qunit=Mm&quiet=0' alt='Barcode Generator TEC-IT
  `;
    saveLabel(itemCode);
    // console.log(itemCode)
    document.getElementById("displayPalletData").append(tr, output, td, p);
  }
}

function clearSingleData() {
  document.getElementById("displayAreaSingle").remove();
}

function clearMultipleData() {
  document.getElementById("displayAreaMultiple").remove();
}

function clearPalletData() {
  document.getElementById("displayAreaPallet").remove();
  document.location.reload();
}

document.getElementById("datepicker").valueAsDate = new Date();
