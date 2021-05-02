let readyParagraph = document.getElementById("readyParagraph")
let inputField = document.getElementById("inputField")
let submitButton = document.getElementById("submitButton")

const printVector = function(predictions, limit) {
    limit = limit || Infinity;

    for (let i=0; i<predictions.size() && i<limit; i++){
        let prediction = predictions.get(i);
        console.log(predictions.get(i));
    }
}

import {FastText, addOnPostRun} from "./fasttext.js";

addOnPostRun(() => {
    let ft = new FastText();
    const url = "model_2m.ftz";
    console.log("Loading model.....")
    ft.loadModel(url).then(model => {
        readyParagraph.innerText = "Model Loaded."
        console.log("Loading model complete.");

        submitButton.disabled = false;

        submitButton.onclick = () => {
            let text = inputField.value;
            console.log("Clicked submit, predicting '" + text)
            let prediction = model.predict(text)
            let result = prediction.get(0)
            let confidence = result[0]
            let classification = (result[1] == "__label__0" ? "negative" : "positive")
            console.log("Classification: " + classification)
            console.log("Confidence: " + confidence)
            document.getElementById("predictionResult").innerText = classification
            document.getElementById("predictionConfidence").innerText = confidence
        }


        // let text = "Hello my baby hello my honey hello my ragtime gal";
        // console.log(text);
        // printVector(model.predict(text));

        // text = "What the fuck did you just fucking say about me, you little bitch?";
        // console.log(text);
        // printVector(model.predict(text));

        // text = "Never gonna give you up! Never gonna let you down!"
        // console.log(text);
        // printVector(model.predict(text));
    });
});

function handleSubmitButton() {
    console.log(inputField)
    let text = document.getElementById("inputField").value;
    console.log(text)
    printVector(model.predict(text));
}

submitButton.onclick = handleSubmitButton