// Check off specific todos by clicking

$("ul").on("click", "li", function() {
    $(this).toggleClass("completed");
})


// Delete todos when clicking on "X"
$("ul").on("click", ".delete", function(event) {
    // Do not trigger the li event handler
    event.stopPropagation();
    // Fade out element and remove it
    $(this).parent().fadeOut(500, function() {
        $(this).remove();
    })
})

$("input[type='text']").keypress(function(event) {
    // Check if user pressed Enter
    if(event.which === 13) {
        // Grab the text from input
        var todoText = $(this).val();
        //Clear the input
        $(this).val("");
        //Create a new li and add to ul
        $("ul").append("<li><span class='delete'><i class='fa fa-trash'></i></span>" + todoText + "</li>")
    }
})

$(".inputToggle").on("click", function() {
    $("input[type='text']").fadeToggle();
})