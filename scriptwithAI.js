const jobInput = document.getElementById("jobInput");
const generateBtn = document.getElementById("generateBtn");
const coverOutput = document.getElementById("coverOutput");
const nameInput = document.getElementById("nameInput");
const copyBtn = document.getElementById("copyBtn");

generateBtn.addEventListener("click", async function () {
  const jobDescription = jobInput.value.trim();
  const userName = nameInput.value.trim();

  if (jobDescription === "") {
    coverOutput.value = "Paste a job description first.";
    return;
  }

  coverOutput.value = "Generating cover letter...";

  try {
    const response = await fetch("http://localhost:3000/generate-cover-letter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        jobDescription: jobDescription,
        name: userName
      })
    });

    const data = await response.json();

    if (!response.ok) {
      coverOutput.value = data.error || "Something went wrong.";
      return;
    }

    coverOutput.value = data.coverLetter;
  } catch (error) {
    console.error("Frontend error:", error);
    coverOutput.value = "Could not connect to the server.";
  }
});

copyBtn.addEventListener("click", function () {
  const textToCopy = coverOutput.value.trim();

  if (textToCopy === "") {
    alert("There is no cover letter to copy yet.");
    return;
  }

  navigator.clipboard.writeText(textToCopy)
    .then(function () {
      alert("Cover letter copied!");
    })
    .catch(function (error) {
      console.error("Copy failed:", error);
      alert("Copy failed. Try copying manually.");
    });
});