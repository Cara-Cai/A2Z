document.addEventListener("DOMContentLoaded", function() {
    // Get elements from the DOM
    const inputText = document.getElementById('inputText');
    const submitBtn = document.getElementById('submitBtn');
    const wordsDiv = document.getElementById('words');

    // Add event listener to the button
    submitBtn.addEventListener('click', function() {
        // Get the value from the textarea
        const text = inputText.value;

        // Tokenize the input text using RiTa
        const words = RiTa.tokenize(text);
        console.log(words);

        // Clear the wordsDiv before adding new content
        wordsDiv.innerHTML = '';

        // Display each tokenized word in the wordsDiv
        words.forEach(function(word) {
            const wordSpan = createWordSpan(word);
            wordsDiv.appendChild(wordSpan);
        });
    });

    // Function to create a span for each word
    function createWordSpan(word) {
        const wordSpan = document.createElement('span');
        wordSpan.innerText = word + ' ';
        wordSpan.style.cursor = 'pointer'; // Make the word clickable

        // Add hover effect
        wordSpan.addEventListener('mouseenter', function() {
            wordSpan.style.backgroundColor = 'lightblue';
        });
        wordSpan.addEventListener('mouseleave', function() {
            wordSpan.style.backgroundColor = '';
        });

        // Add event listener for click (which fetches and replaces with a similar word)
        wordSpan.addEventListener('click', function() {
            getSimilarWord(wordSpan.innerText.trim()).then(function(similarWord) {
                if (similarWord) {
                    wordSpan.innerText = similarWord + ' ';
                } else {
                    console.log('No similar word found.');
                }
            }).catch(function(error) {
                console.log('Error fetching similar word:', error);
            });
        });

        return wordSpan;
    }

    //get a word with a similar meaning using Datamuse API
    async function getSimilarWord(word) {
        const apiUrl = `https://api.datamuse.com/words?ml=${word}`;
    
        try {
            // Fetch the data from Datamuse API
            const response = await fetch(apiUrl);
            const data = await response.json();
    
            if (data && data.length > 0) {
                return data[0].word; // Return the first similar word found
            } else {
                return null; // No similar word found
            }
        } catch (error) {
            console.error('API Error:', error);
            return null;
        }
    }
});
