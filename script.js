const textDisplay = document.getElementById('text-display');
const textInput = document.getElementById('text-input');
const startBtn = document.getElementById('start-btn');
const timeDisplay = document.getElementById('time');
const speedDisplay = document.getElementById('speed');
const accuracyDisplay = document.getElementById('accuracy');

let startTime, intervalId;
const sampleText = "I am doing an Software Development Intern at Tech Highs Pvt Ltd.";

startBtn.addEventListener('click', startTypingTest);

function startTypingTest() {
    textDisplay.textContent = sampleText;
    textInput.value = '';
    textInput.disabled = false;
    textInput.focus();
    startTime = new Date().getTime();
    startBtn.disabled = true;
    intervalId = setInterval(updateMetrics, 1000); // Update every second
    textInput.addEventListener('input', checkTyping);
}

function checkTyping() {
    const typedText = textInput.value;
    if (typedText === sampleText) {
        clearInterval(intervalId);
        textInput.disabled = true;
        calculateResults();
        startBtn.disabled = false;
    }
}

function updateMetrics() {
    const currentTime = new Date().getTime();
    const timeTaken = (currentTime - startTime) / 1000; 
    const wordCount = textInput.value.split(' ').filter(word => word.length > 0).length;
    const speed = (wordCount / (timeTaken / 60)).toFixed(2);

    timeDisplay.textContent = timeTaken.toFixed(2);
    speedDisplay.textContent = speed;
    accuracyDisplay.textContent = calculateAccuracy(textInput.value, sampleText);
}

function calculateResults() {
    const timeTaken = (new Date().getTime() - startTime) / 1000; 
    const wordCount = sampleText.split(' ').length;
    const speed = (wordCount / (timeTaken / 60)).toFixed(2);
    const accuracy = calculateAccuracy(textInput.value, sampleText);

    timeDisplay.textContent = timeTaken.toFixed(2);
    speedDisplay.textContent = speed;
    accuracyDisplay.textContent = accuracy;
}

function calculateAccuracy(input, sample) {
    const errors = getErrors(input, sample);
    const accuracy = ((1 - (errors / sample.length)) * 100).toFixed(2);
    return accuracy;
}

function getErrors(input, sample) {
    let errors = 0;
    for (let i = 0; i < sample.length; i++) {
        if (input[i] !== sample[i]) {
            errors++;
        }
    }
    return errors;
}
