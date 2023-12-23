function Receipt(Id, UserName, TotalQuantity, TotalPrice) {
    let timeCreate = new Date()
    this.Id = Id;
    this.UserName = UserName;
    this.TotalQuantity =TotalQuantity;
    this.TotalPrice = TotalPrice;
    this.CreateAt = timeCreate.toLocaleDateString('en-US', { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }).replace(", ", " ")
}

function totalQuantity(IdProductInput) {
    var result = 0;
    for (let i = 0; i < arrProductChoose.length; i++) {
        if (arrProductChoose[i].Id === IdProductInput) {
            result += arrProductChoose[i].Quantity
        }
    }
    return result;
}

function totalPrice(IdReceiptInput) {
    var result = 0;
    for (let i = 0; i < arrProductChoose.length; i++) {
        if (arrProductChoose[i].IdReceipt === IdReceiptInput) {
            result += arrProductChoose[i].Quantity * arrProductChoose[i].PriceInput
            ;
        }
    }
    return result;
}


function CheckClassReceipt() {
    var classnamereceipt = document.querySelector('.div-receipt');
    classnamereceipt.classList.toggle("open");
    if (classnamereceipt.classList.contains("open")) {
        classnamereceipt.style.display = 'block';
    } else {
        classnamereceipt.style.display = 'none';
    }
}

function CheckClassProductId() {
    var classnameproductId = document.querySelector('.productinput');
    classnameproductId.classList.toggle("open");
    var errorM = document.querySelector('.errorM');

    var receiptID = document.querySelector('.receiptid').value;
    var existingReceipt = ReceiptList.find(existingReceipt => existingReceipt.Id === receiptID);

    if (existingReceipt) {
        errorM.style.color = 'red'
        errorM.textContent ='ID already exists'
    } else {
        errorM.style.color = ''
        errorM.textContent =''
        if (classnameproductId.classList.contains("open")) {
            NameProductList();
            classnameproductId.style.display = 'block';
        } else {
            classnameproductId.style.display = 'none';
        }
    }
}




function CheckClassInput(){
    var productinput = document.querySelector('.productinput');
    productinput.classList.toggle("open")
    if(productinput.classList.contains("open")){
        productinput.style.display = 'block';
    } else {
        showsReceipt()
        productinput.style.display = 'none';
    }
}


var ReceiptList = [];
var arrProductChoose = [];

function NameProductList() {
    var nameproductlist = document.querySelector('select[name="nameproduct"]');
    nameproductlist.innerHTML="";
    for (var i = 0; i < ProductList.length; i++){
        var option = document.createElement('option')
        option.setAttribute('value', ProductList[i].Id);
        option.innerText = ProductList[i].ProductName;
        nameproductlist.append(option)
    }
}

function tableProductInput() {
    var tableinput = document.querySelector('.table-choose');
    var productInput = document.querySelector('select[name="nameproduct"]').value;
    var quantity = document.querySelector('.quantity-input').value;
    var erro = document.querySelector('.erro');

    var existingProduct = arrProductChoose.find(product => product.Id === productInput);
    if(quantity > 0){
        if (existingProduct) {
            existingProduct.Quantity += parseInt(quantity, 10);
        } else {
            var selectedProduct = ProductList.find(product => product.Id === productInput);
            if (selectedProduct) {
                arrProductChoose.push({
                    Id: selectedProduct.Id,
                    ProductName: selectedProduct.ProductName,
                    Category: selectedProduct.Category,
                    PriceInput: selectedProduct.PriceInput,
                    PriceOutput: selectedProduct.PriceOutput,
                    Quantity: parseInt(quantity, 10)
                });
            }
        }
        tableinput.innerHTML = `
        <tr>
        <th>IdProduct</th>
        <th>NameProduct</th>
        <th>Category</th>
        <th>PriceInput</th>
        <th>PriceOutput</th>
        <th>Quantity</th>
        </tr>`;
        
        for (var i = 0; i < arrProductChoose.length; i++) {
            tableinput.innerHTML += `
            <tr>
            <td>${arrProductChoose[i].Id}</td>
            <td>${arrProductChoose[i].ProductName}</td>
            <td>${arrProductChoose[i].Category}</td>
            <td>${arrProductChoose[i].PriceInput}</td>
            <td>${arrProductChoose[i].PriceOutput}</td>
            <td>${arrProductChoose[i].Quantity}</td>
            </tr>`;
        }
        
        erro.style.color = "blue";
        erro.textContent = 'success';
    }else{
        erro.style.color = "red";
        erro.textContent = 'Please enter quantity > 0';
    }

    document.querySelector('.quantity-input').value = ''
}




function showsReceipt() {
    var tableReceipt = document.querySelector('.table-receipt');
    var userName = document.querySelector('.username').value;
    tableReceipt.innerHTML = '';
    
    var totalQuantityVal = 0;
    var totalPriceVal = 0;
    
    for (let i = 0; i < arrProductChoose.length; i++) {
        totalQuantityVal += arrProductChoose[i].Quantity;
        totalPriceVal += arrProductChoose[i].Quantity * arrProductChoose[i].PriceInput;
    }
    
    var receiptID = document.querySelector('.receiptid').value;
    var existingReceipt = ReceiptList.find(existingReceipt => existingReceipt.Id === receiptID);
    var receipt = new Receipt(receiptID, userName, totalQuantityVal, totalPriceVal);

   
    if (existingReceipt) {
        existingReceipt.TotalQuantity = totalQuantityVal;
        existingReceipt.TotalPrice = totalPriceVal;
    } else {
        ReceiptList.push(receipt);
    }

    arrProductChoose = [];

    var tableinput = document.querySelector('.table-choose');
    tableinput.innerHTML = `
        <tr>
            <th>IdProduct</th>
            <th>NameProduct</th>
            <th>Category</th>
            <th>PriceInput</th>
            <th>PriceOutput</th>
            <th>Quantity</th>
        </tr>`;

    tableReceipt.innerHTML = `
            <tr>
            <th>No</th>
            <th>IdReceipt</th>
            <th>UserName</th>
            <th>TotalQuantity</th>
            <th>TotalPrice</th>
            <th>CreatedAt</th>
            </tr>`;
    for (let i = 0; i < ReceiptList.length; i++) {
        tableReceipt.innerHTML += `
        <tr>
            <td>${i + 1}</td>
            <td>${ReceiptList[i].Id}</td>
            <td>${ReceiptList[i].UserName}</td>
            <td>${ReceiptList[i].TotalQuantity}</td>
            <td>${ReceiptList[i].TotalPrice}</td>
            <td>${ReceiptList[i].CreateAt}</td>
        </tr>`;
    }

    document.querySelector('.receiptid').value = '';
    document.querySelector('.username').value = '';
}


