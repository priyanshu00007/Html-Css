document.getElementById('searchButton').addEventListener('click', function() {
    const word = document.getElementById('searchInput').value.trim();
    if (word) {
        fetchDefinition(word);
    }
});

function fetchDefinition(word) {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Word not found');
            }
            return response.json();
        })
        .then(data => {
            const meaning = data[0].meanings[0].definitions[0].definition;
            displayDefinition(word, meaning);
        })
        .catch(error => {
            console.error('Error fetching definition:', error);
            displayDefinition(word, 'Definition not found.');
        });
}

function displayDefinition(word, definition) {
    document.getElementById('word').textContent = word;
    document.getElementById('definitionText').textContent = definition;
}
