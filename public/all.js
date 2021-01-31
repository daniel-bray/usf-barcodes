const labelList = document.querySelector('#label-table')


function createTable(label){
    let tr = document.createElement('tr')
    let date_td = document.createElement('td')
    let label_td = document.createElement('td')

    let timestamp = label.data().date;
    let date = new Date(timestamp);

    date_td.textContent = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    label_td.textContent = label.data().barcode;

    labelList.append(tr, date_td, label_td)
}



db.collection('labels').get().then((data) => {
    data.docs.map(label => {
        createTable(label)
    })
})