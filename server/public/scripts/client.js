console.log('client.js sourced');

$( document ).ready( onReady );

function onReady() {
    console.log('DOM ready');
    getJokes()
    $('#addJokeButton').on('click', addJoke);
}
function addJoke() {
    console.log('inside addJoke');
    let newJoke = {
        whoseJoke: $('#jokeIn').val(),
        jokeQuestion: $('#questionIn').val(),
        punchLine: $('#punchlineIn').val()
    };
    console.log('New joke is', newJoke);
    $.ajax({
        method: 'POST',
        url: '/jokes',
        data: newJoke,
    }).then((response) => {
        console.log('POST / jokes', response);

    }).catch(error => {
        console.log('POST /jokes failed', error);
        $('body').append(`
        <h2>
            Failed to save Joke! Check your data please I really wanna hear it!
        </h2>
        `);
    });
}

function getJokes() {
    $.ajax({
        method: 'GET',
        url: '/jokes',
    })
    
        .then((response) => {
             console.log('GET /jokes response', response)

        let jokeList = $('#outputDiv');
        console.log('jokes list element', jokeList)

        for (let joke of response){
            console.log('joke is', joke)
            jokeList.append(`
            <li>
                ${joke.jokeQuestion} || ${joke.punchLine}
                <em> -- by ${joke.whoseJoke}</em>
            </li>
            `);
        }
 })};
