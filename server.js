import express from "express";
import cors from "cors";
import doten from "doten";
import OpenAI from "openai";

dotenv.config();

process.env.GROQ_API_KEY

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

body: JSON.stringify({
    jobDescription: jobDescription,
    name: userName 
})

const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "http://api.groq.com/openai/v1"
})

app.post("/generate-cover-letter", async function (req, res) {
    try {
        const jobDescription = req.body.jobDescription;
        const name = req.body.name || "Canidate";

        if (!jobDescription || jobDescription.trim() === "") {
            return res.status(400).json({
                error: "job description is required."
            });
        }
        //prompt for the AI
        const prompt = `
        You are an expert cover letter writer.  I want you to write a cover letter based on the 
        job description below.  Make it specific, personable and don't have it sound like a suck up or pick me.
        Keep it professional, it should express genuine interest. Don't tell lies for the sake of seeming
        like a better canidate.  Keep it short 

        Candidate name: ${name}

        job description:
        ${jobDescription}
        `;

        //call groq AI nigger
        const response = await client.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: [
                {
                    role: "system",
                    content: "You write professional cover letters."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.7
        });
        
        //extract result
        const coverLetter = response.choices[0].message.content;

        // send back to frontend
        res.json({ coverLetter: coverLetter});

    } catch (error) {
        console.error("Server error:", error);

        res.status(500).json({
            error: "soemthing went wrong generating the cover letter."
        });
    }
});

// start server
app.listen(port, function() {
    console.log(`Server running at http://localhost:${port}`);
});