const Item_CODE_REGEX = /^(I00-)[0-9]{4}$/;
const Item_NAME_REGEX = /^[A-Za-z ]{5,}$/;
const Item_QTY_REGEX = /^[0-9]{2,}([.][0-9]{2})?$/;
const UNIT_PRICE_REGEX = /^[1-9]\d*$/;

let item_vArray = new Array();
item_vArray.push({field: $("#itmCode"), regEx: Item_CODE_REGEX ,error: $("#itmCodeError")});
item_vArray.push({field: $("#itmName"), regEx: Item_NAME_REGEX ,error: $("#itmNameError")});
item_vArray.push({field: $("#itmPrice"), regEx: Item_QTY_REGEX ,error: $("#itmPriceError")});
item_vArray.push({field: $("#itmQTY"), regEx: UNIT_PRICE_REGEX ,error: $("#itmQTYError")});

function clearItemInputFields() {
    $("#itmCode,#itmName,#itmPrice,#itmQTY").val("");
    $("#itmCode,#itmName,#itmPrice,#itmQTY").css("border", "1px solid #ced4da");
    $("#itmCode").focus();
    setItemBtn();
}

setItemBtn();
function setItemClBtn(){
    if ($("#itmCode,#itmName,#itmPrice,#itmQTY").val()==""){
        $("#itmClear").prop("disabled", true);
    }else{
        $("#itmClear").prop("disabled", false);
    }
}
$("#itmCode,#itmName,#itmPrice,#itmQTY").on("keydown keyup", function (e) {

    setItemClBtn();
    let indexNo = item_vArray.indexOf(item_vArray.find((c) => c.field.attr("id") == e.target.id));

    if (e.key == "Tab") {
        e.preventDefault();
    }

    checkItemValidations(item_vArray[indexNo]);

    setItemBtn();

    if (e.key == "Enter") {

        if (e.target.id != item_vArray[item_vArray.length - 1].field.attr("id")) {
            if (checkItemValidations(item_vArray[indexNo])) {
                item_vArray[indexNo + 1].field.focus();
            }
        } else {
            if (checkItemValidations(item_vArray[indexNo])) {
                saveItem();
            }
        }
    }
});


function checkItemValidations(object) {
    if (object.regEx.test(object.field.val())) {
        setItemBorder(true, object)
        return true;
    }
    setItemBorder(false, object)
    return false;
}

function setItemBorder(bol, ob) {
    if (!bol) {
        if (ob.field.val().length >= 1) {
            ob.field.css("border", "2px solid red");
            let check = ob.field.attr('id');
            switch (check) {
                case "itmCode" : ob.error.text("Item-Id is a required field: I00-000"); break
                case "itmName" : ob.error.text("Item-Name is a required field: Minimum 5,Max 20,Spaces Allowed"); break
                case "itmQty" : ob.error.text("Item-Qty is a required field: Only Numbers"); break
                case "itmPrice" : ob.error.text("Item-Price is a required field: Pattern 100.00 or 100"); break
            }
        } else {
            ob.field.css("border", "1px solid #ced4da");
            ob.error.text("");
        }
    } else {
        if (ob.field.val().length >= 1) {
            ob.field.css("border", "2px solid green");
            ob.error.text("");
        } else {
            ob.field.css("border", "1px solid #ced4da");
            ob.error.text("");
        }
    }

}

function checkAllItem() {
    for (let i = 0; i < item_vArray.length; i++) {
        if (!checkItemValidations(item_vArray[i])) return false;
    }
    return true;
}

function setItemBtn() {
    setItemClBtn();
    $("#itmSave").prop("disabled", true);
    $("#itmUpdate").prop("disabled", true);
    let id = $("#itmCode").val();

    if (searchItem(id) == undefined) {
        $("#itmDelete").prop("disabled", true);
        $("#itmUpdate").prop("disabled", true);
        if (checkAllItem()) {
            $("#itmSave").prop("disabled", false);
        } else {
            $("#itmSave").prop("disabled", true);
        }
    }else{
        $("#itmDelete").prop("disabled", false);
        if (checkAllItem()) {
            $("#itmUpdate").prop("disabled", false);
        } else {
            $("#itmUpdate").prop("disabled", true);
        }
    }

}