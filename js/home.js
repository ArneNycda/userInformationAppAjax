function getResults() {
    $.post('/search', {data: $('#search label input').val()}, function(response) {
        $('#pre-results').html(response.users);
    });
}
