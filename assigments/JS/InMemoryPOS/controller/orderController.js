$(document).ready(function() {
    $("#order-add-item").prop("disabled", true);
    $("#btnSubmitOrder").prop("disabled", true);
    generateOrderId();
    $('#order-thead').css({
        'width': '100%',
        'display': 'flex'
    });
    $('#order-thead>th').css({
        'flex': '1',
        'max-width': 'calc(100%/5*1)'
    });
});
$("#btn-order,.order-nav").click(function (){
    setCusIds();
    setItemIds()
});

function generateOrderId() {

    if (orderDB.length == 0) {
        $("#order-id").val("OID-0001");
    } else if (orderDB.length > 0) {
        var id = orderDB[orderDB.length - 1].id.split("-")[1];
        var tempId = parseInt(id);
        tempId = tempId + 1;
        if (tempId <= 9) {
            $("#order-id").val("OID-000" + tempId);
        } else if (tempId <= 99) {
            $("#order-id").val("OID-00" + tempId);
        } else if (tempId <= 999) {
            $("#order-id").val("OID-0" + tempId);
        } else if (tempId <= 9999) {
            $("#order-id").val("OID-" + tempId);
        }
    }
}
function searchOrder(id) {
    return orderDB.find(function (order) {

        return order.id == id;
    });
}
function setCusIds() {
    $("#cId").empty();
    customerDB.forEach(function (e) {
        let id = e.id;
        let select = `<option selected>${id}</option>`;
        $("#cId").append(select);
    });
}
$("#cId").change(function () {
    $(this).val($(this).val());
    var customer = searchCustomer($(this).val());
    $("#cName").val(customer.name);
    $("#cAddress").val(customer.address);
    $("#cSalary").val(customer.salary);

    setAndTriggerValue($("#cName"), customer.name);
    setAndTriggerValue($("#cAddress"), customer.address);
    setAndTriggerValue($("#cSalary"), customer.salary);
});
function setItemIds() {
    $("#icode").empty();
    itemDB.forEach(function (e) {
        let id = e.id;
        let select = `<option selected>${id}</option>`;
        $("#icode").append(select);
    });
}
$("#icode").change(function () {
    $(this).val($(this).val());
    var item = searchItem($(this).val());
    $("#itemName").val(item.name);
    $("#price").val(item.price);
    $("#qtyOnHand").val(item.qty);

    setAndTriggerValue($("#itemName"), item.name);
    setAndTriggerValue($("#price"), item.price);
    setAndTriggerValue($("#qtyOnHand"), item.qty);
});

function placeOrder() {
    let newCustomer = Object.assign({}, customer);
    newCustomer.cusId=$("#cId").val();
    newCustomer.cusName=$("#cName").val();
    newCustomer.cusAddress=$("#cAddress").val();
    newCustomer.cusSalary=$("#cSalary").val();

    let itemSamp = new Array();
    $('#order-table>tr').each(function () {
        let id = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let price = $(this).children().eq(2).text();
        let qty = $(this).children().eq(3).text();
        let total = $(this).children().eq(3).text();

        let samp = {
            id: id,
            name: name,
            price: price,
            qty: qty,
            total: total,
        }
        itemSamp.push(samp);
    });
    let full ={
        customer: newCustomer,
        items: itemSamp
    }
    orderDB.push(full);
}

$("#order-add-item").click(function () {
    let id = $("#icode").val();
    let name = $("#itemName").val();
    let price = $("#price").val();
    let qty = $("#orderQty").val();
    let total = parseFloat(price) * parseFloat(qty);
    let allTotal = 0;
    let itemExists = false;

    $('#order-table>tr').each(function (e) {
       let check =$(this).children().eq(0).text();
        if (id === check){
           let liQty = $(this).children().eq(3).text();
           let upQty = parseInt(liQty)+parseInt(qty);
            $(this).children().eq(1).text(name);
            $(this).children().eq(2).text(price);
            $(this).children().eq(3).text(upQty);
            $(this).children().eq(4).text(upQty * parseFloat(price));
            itemExists = true;
            return false;
        }
    });

    if (!itemExists){
        let row = `<tr>
                     <td>${id}</td>
                     <td>${name}</td>
                     <td>${price}</td>
                     <td>${qty}</td>
                     <td>${total}</td>
                    </tr>`;

        $("#order-table").append(row);
        $('#order-table').css({
            'max-height': '100%',
            'overflow-y': 'auto',
            'display': 'table-caption'
        });
        $('#order-table>tr').css({
            'width': '100%',
            'display': 'flex'
        });
        $('#order-table>tr>td').css({
            'flex': '1',
            'max-width': 'calc(100%/5*1)'
        });

    }
    $('#order-table>tr').each(function (e) {
            let full = $(this).children().eq(4).text();
            allTotal += parseFloat(full);
    });
    $("#total").text(allTotal);
});