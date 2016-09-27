// Clear fields
var inputField = $("#autocomplete");

$("#products").html("");
inputField.val("");

// Remove suggestion list when click outside suggestion area
function removeLi(evt) {
    var target = evt.currentTarget;
    var inside = $("main");
    if (target != inside) {
        $("#suggestions").children().remove();
    }
}

// Get data
var getBankData = function (e) {
    $("#suggestions li").remove();

    $.ajax({
        url: "products.json",
        type: "get",
        dataType: "JSON",

        success: function (result) {
            var counter = 1;
            var limit = 10;

            $(result.products).each(function (index, data) {
                // $("#products").append(data.name + "<br>"); // data is object

                // Cache the search term
                $search = inputField.val();

                // Search regular expression
                $search = new RegExp($search.replace(/[^[\w \-']+$/i), "i");

                var dataname = data.name;
                var matching = data.name.match($search);

                if (dataname.indexOf(matching) === 0) {
                    if (counter == limit) {
                        return;
                    } else {
                        $("#suggestions").append("<li class='show list-group-item'><a class='move' href='" + data.url + "'>" + dataname + "</a><span class='type'> | in: " + data.type + "</span></li>");
                        counter++;
                    }
                }

            }); // each ends
        }, // success ends

        error: function (err) {
            console.error(err);
        },

        //return false;
    });
}


$(document).ready(function () {
    inputField.on("keyup", getBankData);
    $(document).on("click", removeLi);
});