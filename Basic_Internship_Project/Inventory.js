function Inventory(IdProduct, Name, TotalQuantityReccent, TotalPriceReccent, IdCategory, TotalQuantityInventory, TotalPriceInventory) {
    this.IdProduct = IdProduct;
    this.Name = Name;
    this.TotalQuantityReccent = TotalQuantityReccent;
    this.TotalPriceReccent = TotalPriceReccent;
    this.IdCategory = IdCategory;
    this.TotalQuantityInventory = TotalQuantityInventory;
    this.TotalPriceInventory = TotalPriceInventory;
}

var InventoryList = [];

function CheckClassInventory() {
    var classnameinventory = document.querySelector('.div-inventory');
    classnameinventory.classList.toggle("open");
    if (classnameinventory.classList.contains("open")) {
        showInventory()
        classnameinventory.style.display = 'block';
    } else {
        classnameinventory.style.display = 'none';
    }
}
function showInventory() {
    var tableInventory = document.querySelector('.table-inventory');
    tableInventory.innerHTML = `
        <tr>
            <th>No</th>
            <th>IdProduct</th>
            <th>NameProduct</th>
            <th>Category</th>
            <th>QuantityReccent</th> 
            <th>PriceReccent</th>
            <th>QuantityInventory</th>
            <th>PriceInventory</th>
        </tr>`;
        
        for (let i = 0; i < ProductList.length; i++) {
            
            let productChoose = arrProductChoose.find(product => product.Id === ProductList[i].Id);
            tableInventory.innerHTML += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${ProductList[i].Id}</td>
                    <td>${ProductList[i].ProductName}</td>
                    <td>${ProductList[i].Category}</td>
                    <td>${0}</td>
                    <td>${0}</td>
                    <td>${0}</td>
                    <td>${0}</td>

                </tr>`;
        }
    }
