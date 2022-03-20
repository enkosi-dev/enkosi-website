// obfusticator: https://obfuscator.io/

function showSection(selected) {
    const labels = ["content", "loading", "error", "placeholder"];
    labels.forEach(label => {
        const selector = `#question-${label}`;
        label === selected
            ? document.querySelector(selector).style.display = "block"
            : document.querySelector(selector).style.display = "none";
    });
}

function getQuestions() {
    let url = document.querySelector("#question-url").value;
    const key = "[INSERT_RAPIDAPI_KEY_BEFORE_OBFUSTICATION]";
    const host = "artiquery.p.rapidapi.com";

    if (url) {
        document.querySelector("#question-input").style.display = "none";
        showSection("loading");
        gtag('event', "question_generation", { 'url': url });
        fetch("https://artiquery.p.rapidapi.com/questions", {
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "x-rapidapi-host": host,
                "x-rapidapi-key": key,
            },
            "body": JSON.stringify({
                "content": url,
                "content-type": "url",
                "questions": 1,
                "options": 4
            })
        })
            .then((response) => response.json())
            .then((data) => {
                const questionData = data[0];
                const question = document.querySelector("#question-title");
                const answer = document.querySelector("#question-answer");
                const options = [
                    document.querySelector("#question-option-1"),
                    document.querySelector("#question-option-2"),
                    document.querySelector("#question-option-3"),
                    document.querySelector("#question-option-4"),
                ];

                question.innerHTML = questionData.question;
                options.forEach((option, i) => {
                    const optionText = questionData.options[i];
                    option.innerHTML = optionText;
                    if (questionData.answer == optionText) {
                        answer.innerHTML = `Answer: #${i + 1}`;
                    }
                });
                showSection("content");
            })
            .catch((err) => {
                document.querySelector("#question-input").style.display = "block";
                showSection("error");
                console.error(err);
            });
    } else {
        document.querySelector("#question-input").style.display = "block";
        showSection("error");
    }
}


var form = document.getElementById("question-input");
function handleForm(event) { event.preventDefault(); }
form.addEventListener('submit', handleForm);

const generateButton = document.getElementById('question-generate');
generateButton.addEventListener('click', getQuestions);
showSection("placeholder");