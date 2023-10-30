let tg = window.Telegram.WebApp;

tg.expand();
tg.MainButton.text = "Calculate";
tg.MainButton.show();

let rowCount = 0;
const maxRowCount = 5;

document.getElementById('addRow').addEventListener('click', function() {
    if (rowCount < maxRowCount) {
        const productList = document.getElementById('productList');
        const newRow = productList.insertRow(0);

        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);

        cell1.innerHTML = '<div class="form-group"><input type="number" class="form-control" placeholder="10"> </div>';
        cell2.innerHTML = `
            <div>
                <select class="form-control" style="width: fit-content;">
                    <option value="oz">oz</option>
                    <option value="kg">kg</option>
                    <option value="cup">cup</option>
                    <option value="g">g</option>
                </select>
            </div>
            `;
        cell3.innerHTML = '<div class="form-group"><input type="text" class="form-control" placeholder="egg"> </div>';
        rowCount++; // Increment the row count
    } else {
        tg.showPopup({
                title: 'Maximum available row',
                message: 'Maximum row limit of 5 has been reached.',
                buttons: [{
                    id: 'ok',
                    text: 'Okay'
                } ]
            }, function(buttonId) {
            });
    }
});

Telegram.WebApp.onEvent("mainButtonClicked", function() {
const productList = document.getElementById('productList');
        const rows = productList.getElementsByTagName('tr');
        const data = [];
        for (let i = 0; i < rows.length; i++) {
            const cells = rows[i].getElementsByTagName('td');
            const rowData = {
                quantity: cells[0].querySelector('input').value,
                type: cells[1].querySelector('select').value,
                productName: cells[2].querySelector('input').value
            };
            data.push(rowData);
        }
    tg.sendData(JSON.stringify({
        nut: data
    }));
    tg.close();
});