var url = 'http://aws.random.cat/meow';

$('#btn').click(function() {
    $.getJSON(url)
     .done(function(data) {
        $('#photo').attr('src', data.file);
     })
     .fail(function(error) {
         console.log(error);
     })
});
