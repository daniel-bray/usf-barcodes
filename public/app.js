localStorage.getItem('division')
// saving data
function saveLabel(item) {
  let date = new Date().getTime()
  console.log('date: ', date)
  db.collection('labels').add({ barcode: item, date })
}

document.addEventListener('DOMContentLoaded', function () {
  let elems = document.querySelectorAll('.collapsible, .modal')
  let instance1 = M.Collapsible.init(elems, {})
  let instance2 = M.Modal.init(elems, {})
})

document.addEventListener('DOMContentLoaded', function () {
  let element = document.querySelectorAll('select')
  let instance3 = M.FormSelect.init(element, {})

  // localStorage.getItem('division') === null
  localStorage.setItem('division', '2230')
  // : localStorage.getItem('division')
})

document.querySelector('select').addEventListener('change', setDivision)

document
  .querySelector('#singleCodeBtn')
  .addEventListener('click', generateSingle)

document
  .querySelector('#clearSingleButton')
  .addEventListener('click', clearSingleData)

document
  .querySelector('#multipleCodeBtn')
  .addEventListener('click', generateMultiple)

document
  .querySelector('#clearMultipleButton')
  .addEventListener('click', clearMultipleData)

document
  .querySelector('#palletCodeBtn')
  .addEventListener('click', generatePallet)

document
  .querySelector('#clearPalletButton')
  .addEventListener('click', clearPalletData)

function setDivision(e) {
  division = e.target.value
  localStorage.setItem('division', division.toString())
}

function generateSingle(e) {
  e.preventDefault()
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

  saveLabel(itemCode)
}

function generateMultiple(e) {
  e.preventDefault()
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
}

function generatePallet(e) {
  e.preventDefault()
  let pallets = document.getElementById('palletNumber').value
  let palletArray = pallets.split(',')
  let stop = document.getElementById('stopNumber').value
  stop = ('00' + stop).slice(-2)
  let route = document.getElementById('routeNumber').value

  division = localStorage.getItem('division')
  // console.log('in pallet label', division)

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
    // console.log(itemCode)
    document.getElementById('displayPalletData').append(tr, output, td, p)
  }
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
