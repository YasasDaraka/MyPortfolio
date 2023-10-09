
getAllItem();


$("#itmSave").click(function () {

    if (checkAllItem()){
        saveItem();
    }else{
        alert("Error");
    }
});

$(document).ready(function(){
    $("#itmCode").prop('disabled', true);
    $("#itmName").prop('disabled', true);
    $("#itmPrice").prop('disabled', true);
    $("#itmQTY").prop('disabled', true);

    $('#itemThead').css({
        'width': '600px',
        'display': 'flex'
    });
    $('#itemThead>th').css({
        'flex': '1',
        'max-width': 'calc(100%/4*1)'
    });
    $('#itemTable').css({
        'max-height': '370px',
        'overflow-y': 'auto',
        'display': 'table-caption'
    });
    $('#itemTable>tr').css({
        'width': '600px',
        'display': 'flex'
    });
    $('#itemTable>tr>td').css({
        'flex': '1',
        'max-width': 'calc(100%/4*1)'
    });
});
function generateItemId() {

    if (itemDB.length == 0) {
        $("#itmCode").val("I00-0001");
    } else if (itemDB.length > 0) {
        var id = itemDB[itemDB.length - 1].id.split("-")[1];
        var tempId = parseInt(id);
        tempId = tempId + 1;
        if (tempId <= 9) {
            $("#itmCode").val("I00-000" + tempId);
        } else if (tempId <= 99) {
            $("#itmCode").val("I00-00" + tempId);
        } else if (tempId <= 999) {
            $("#itmCode").val("I00-0" + tempId);
        } else if (tempId <= 9999) {
            $("#itmCode").val("I00-" + tempId);
        }
    }
}


$('#itmAdd').click(function(){
    $("#itmCode").prop('disabled', false);
    $("#itmName").prop('disabled', false);
    $("#itmPrice").prop('disabled', false);
    $("#itmQTY").prop('disabled', false);

    $(this).find("#itmCode").focus();
    generateItemId();
    setItemClBtn();
});

$("#itmGetAll").click(function () {
    getAllItem();
});


function bindItemTrrEvents() {
    $('#itemTable>tr').click(function () {

        let id = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let unPrice = $(this).children().eq(2).text();
        let Qty = $(this).children().eq(3).text();


        $("#itmCode").val(id);
        $("#itmName").val(name);
        $("#itmQTY").val(Qty);
        $("#itmPrice").val(unPrice);

        $("#itmCode").prop('disabled', false);
        $("#itmName").prop('disabled', false);
        $("#itmQTY").prop('disabled', false);
        $("#itmPrice").prop('disabled', false);
        $("#itmUpdate").prop('disabled', false);

        setItemBtn();

    });
}

$("#itmDelete").click(function () {
    let id = $("#itmCode").val();

    let consent = confirm("Do you want to delete.?");
    if (consent) {
        let response = deleteItem(id);
        if (response) {
            alert("Item Deleted");
            clearItemInputFields();
            getAllItem();
        } else {
            alert("Item Not Removed..!");
        }
    }
    $("#itmCode").prop('disabled', true);
    $("#itmName").prop('disabled', true);
    $("#itmQTY").prop('disabled', true);
    $("#itmPrice").prop('disabled', true);

});

$("#itmUpdate").click(function () {
    let id = $("#itmCode").val();
    updateItem(id);
    clearItemInputFields();
});

$("#itmClear").click(function () {
    clearItemInputFields();
});


function saveItem() {
    let itemID = $("#itmCode").val();

    if (searchItem(itemID.trim()) == undefined) {


        let itemName = $("#itmName").val();
        let itemQty = $("#itmQTY").val();
        let itemPrice = $("#itmPrice").val();


        let newItem = Object.assign({}, item);
        newItem.id = itemID;
        newItem.name = itemName;
        newItem.qty = itemQty;
        newItem.price = itemPrice;


        itemDB.push(newItem);
        clearItemInputFields();
        getAllItem();
        $("#itmCode").prop('disabled', true);
        $("#itmName").prop('disabled', true);
        $("#itmQTY").prop('disabled', true);
        $("#itmPrice").prop('disabled', true);


    } else {
        alert("Item already exits.!");
        clearItemInputFields();
    }
}

function getAllItem() {

    $("#itemTable").empty();

    for (let i = 0; i < itemDB.length; i++) {
        let id = itemDB[i].id;
        let name = itemDB[i].name;
        let qty = itemDB[i].qty;
        let price = itemDB[i].price;

        let row = `<tr>
                     <td>${id}</td>
                     <td>${name}</td>
                     <td>${price}</td>
                     <td>${qty}</td>
                    </tr>`;

        $("#itemTable").append(row);
        $('#itemTable').css({
            'max-height': '370px',
            'overflow-y': 'auto',
            'display': 'table-caption'
        });
        $('#itemTable>tr').css({
            'width': '600px',
            'display': 'flex'
        });
        $('#itemTable>tr>td').css({
            'flex': '1',
            'max-width': 'calc(100%/4*1)'
        });
        bindItemTrrEvents();
    }
}

function deleteItem(id) {
    for (let i = 0; i < itemDB.length; i++) {
        if (itemDB[i].id == id) {
            itemDB.splice(i, 1);
            return true;
        }
    }
    return false;
}

function searchItem(id) {
    return itemDB.find(function (item) {

        return item.id == id;
    });
}

function updateItem(id) {
    if (searchItem(id) == undefined) {
        alert("No such Item..please check the ID");
    } else {
        let consent = confirm("Do you really want to update this Item.?");
        if (consent) {
            let item = searchItem(id);


            let itemName = $("#itmName").val();
            let itemQty = $("#itmQTY").val();
            let itemPrice = $("#itmPrice").val();

            item.name = itemName;
            item.qty = itemQty;
            item.price = itemPrice;

            getAllItem();

            $("#itmCode").prop('disabled', true);
            $("#itmName").prop('disabled', true);
            $("#itmQTY").prop('disabled', true);
            $("#itmPrice").prop('disabled', true);
        }
    }

}