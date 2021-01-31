// saving data
function saveLabel(item) {
  let date = new Date().getTime()
  console.log("date: ", date);
  db.collection('labels').add({ barcode: item, date});
}


document.addEventListener('DOMContentLoaded', function () {

  let elems = document.querySelectorAll('.collapsible')
  let instances = M.Collapsible.init(elems, {})
})

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems, {});
});

document.querySelector('#singleCodeBtn').addEventListener('click', generateSingle)

document.querySelector('#clearSingleButton').addEventListener('click', clearSingleData)

document.querySelector('#multipleCodeBtn').addEventListener('click', generateMultiple)

document.querySelector('#clearMultipleButton').addEventListener('click', clearMultipleData)

document.querySelector('#palletCodeBtn').addEventListener('click', generatePallet)

document.querySelector('#clearPalletButton').addEventListener('click', clearPalletData)

function generateSingle(e) {
  let itemCode = document.querySelector('#singleCode').value
  itemCode = ('000000' + itemCode).slice(-16)
  let tr = document.createElement('tr')
  let td = document.createElement('td')
  let output = document.createElement('img')
  output.className = ''
  output.src = `
            https://barcode.tec-it.com/barcode.ashx?data=${itemCode}&code=PDF417&multiplebarcodes=false&translate-esc=false&unit=Fit&dpi=96&imagetype=Gif&rotation=0&color=%23000000&bgcolor=%23ffffff&qunit=Mm&quiet=0' alt='Barcode Generator TEC-IT
            `
  document.getElementById('barcodeTableData').append(tr, output, td)

  e.preventDefault()
  saveLabel(itemCode);
}

function generateMultiple(e) {
  let itemCode = document.querySelector('#multipleCode').value
  let quantity = document.querySelector('#quantity').value

  while (quantity > 0) {
    itemCode = ('000000' + itemCode).slice(-16)
    let tr = document.createElement('tr')
    let td = document.createElement('td')
    let p = document.createElement('p')
    p.className = 's12 center'
    p.textContent = itemCode
    tr.style.height = '3em'
    let output = document.createElement('img')
    output.src = `
    https://barcode.tec-it.com/barcode.ashx?data=${itemCode}&code=PDF417&multiplebarcodes=false&translate-esc=false&unit=Fit&dpi=96&imagetype=Gif&rotation=0&color=%23000000&bgcolor=%23ffffff&qunit=Mm&quiet=0' alt='Barcode Generator TEC-IT
  `
    saveLabel(itemCode)
    itemCode++
    quantity--
    document.getElementById('multipleTableData').append(tr, output, td, p)
  }

  e.preventDefault()
}

function generatePallet(e) {
  let pallets = document.getElementById('palletNumber').value
  let palletArray = pallets.split(',')
  let stop = document.getElementById('stopNumber').value
  stop = ('00' + stop).slice(-2)
  let route = document.getElementById('routeNumber').value
  const division = 2230

  let d = new Date()
  let month = ('00' + (d.getMonth() + 1)).slice(-2)
  let year = d.getFullYear()
  let day = ('00' + d.getDate()).slice(-2)


  for (let i = 0; i < palletArray.length; i++) {
    itemCode = palletArray[i] + year + month + day + division + route + stop
    let tr = document.createElement('tr')
    let td = document.createElement('td')
    let p = document.createElement('p')
    p.className = 's12 center'
    p.textContent = itemCode
    tr.style.height = '3em'
    let output = document.createElement('img')
    output.src = `
    https://barcode.tec-it.com/barcode.ashx?data=${itemCode}&code=PDF417&multiplebarcodes=false&translate-esc=false&unit=Fit&dpi=96&imagetype=Gif&rotation=0&color=%23000000&bgcolor=%23ffffff&qunit=Mm&quiet=0' alt='Barcode Generator TEC-IT
  `
    saveLabel(itemCode)
    document.getElementById('displayPalletData').append(tr, output, td, p)
  }

  e.preventDefault()
}

function clearSingleData() {
  document.getElementById('displayAreaSingle').remove()
}

function clearMultipleData() {
  document.getElementById('displayAreaMultiple').remove()
}

function clearPalletData() {
  document.getElementById('displayAreaPallet').remove()
  document.location.reload()
}