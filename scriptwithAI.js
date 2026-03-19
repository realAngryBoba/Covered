const { response } = require("express");

const jobInput = document.getElementByID("jobInput");
const generateBtn = document.getElementById("generateBtn");
const coverOutput = document.getElementById("coverOutput");
const nameInput = document.getElementById("nameInput");


generateBtn.addEventListener("click", async function () {
    const jobDescription = jobInput.value.trim();
    const userName = nameinput.value.trim();
    
    if (jobDescription === "") {
        coverOutput.value = "Please paste in a job description first"
        return;
    }

    coverOutput.value = "Generating your new Cover Letter!!!"

    try {
        const response = await fetch ("
            http://localhost:3000/generate-cover-letter"
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                jobDescription: jobDescription
            })
        )
    });

    const data = await response.json();

    if (!response.ok) {
        coverOutput.value = data.error || "Something went wrong.";
        return;
    }

    coverOutput.value =  data.coverLetter
}   catch(error){
    console.error("Frontend error:", error);
    coverOutput.value = "Could not connect to the server.";
    return;
}