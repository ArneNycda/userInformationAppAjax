$('#search').on('keyup', 'label input', () => {
    myVar = setTimeout(() => {
        $.post('/search', {data: $('#search label input').val()}, response => {
            $('#pre-results').html(response.users);
        });
    }, 300);
});

myStopFunction = () => {
    clearTimeout(myVar);
};
