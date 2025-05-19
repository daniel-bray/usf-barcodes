const labelList = document.querySelector('#label-table')
const errorText = document.querySelector('#error')

document.querySelector('#searchBarcode').addEventListener('click', searchItem);

function createTable(label){
    let tr = document.createElement('tr')
    let date_td = document.createElement('td')
    let label_td = document.createElement('td')

    let timestamp = label.data().date;
    console.log("timestamp: ", timestamp)
    let date = new Date(timestamp);
    console.log(date);

    date_td.textContent = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    label_td.textContent = label.data().barcode;

    labelList.append(tr, date_td, label_td)
}

function searchItem(e){ 
    e.preventDefault();
    const labelCode = document.querySelector('#barcode').value.toString();
    console.log(typeof labelCode);
    const labelsRef = db.collection('labels');
    labelsRef.where('barcode', '==', labelCode).get().then((data) => {
        if(data.docs.length === 0){
           errorText.textContent = "Barcode not found."
        } else {
            data.docs.map(label => {
                createTable(label);
            })
        }
    })

}
