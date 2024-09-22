const express = require('express');
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');
const dotenv = require('dotenv').config();
const db = require('./database'); // Import the database module

const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());
const MODEL_NAME = "gemini-pro";
const API_KEY = process.env.API_KEY;

async function runChat(userInput) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 1000,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];


  const fs = require('fs');

  function readJsonFileAsString(filePath) {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          reject('Error reading file:', err);
          return;
        }
  
        // Parse the JSON data (optional, if you need to manipulate it as an object)
        const jsonData = JSON.parse(data);  // This step is optional
  
        // Convert the JSON object (or data) to a string
        const jsonString = JSON.stringify(jsonData);  // Use jsonData if parsed
  
        resolve(jsonString);
      });
    });
  }
  

  // Path to your JSON file
  const filePath1 ='../json/days.json';
  const filePath2= '../json/free_slot.json';
  const filePath3= '../json/DailySchedule.json';

  const jsonString1 = await readJsonFileAsString(filePath1);
  const jsonString2 = await readJsonFileAsString(filePath2);
  const jsonString3 = await readJsonFileAsString(filePath3);

const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [
      {
        role: "user",
        parts: [{ text: "You are here to assist in selecting the best appointment time and reserving it with your doctor. You are knowledgeable, empathetic, efficient, organized, a clear communicator, a problem solver, a patient advocate, and adaptable. Let yourself help manage medical appointments seamlessly and efficiently\nWith jeremsy AI Appointment, you can:\nChoose the best appointment time that fits your schedule.\nReserve appointments with your doctor effortlessly.\nReceive personalized recommendations based on your preferences and availability.\nEnsure optimal treatment and efficient scheduling.\nEnjoy a streamlined, stress-free appointment booking experience.you  will need a json file of  the Daily Schedule of doctor\nWrite simple sentences in the form of pen tips, not exceeding 20 words when your are finished appointing a schedule and recieved the confirmation from the patient dont change it at all"}],
      },
      {
        role: "model",
        parts: [{ text: "Good morning! I'm jeremsy, and I'm here to assist you in selecting the best appointment times and reserving them with your doctor. I pride myself on being knowledgeable, empathetic, efficient, organized, a clear communicator, a problem solver, a patient advocate, and adaptable. My goal is to help you manage medical appointments seamlessly and efficiently. may you please provide "}],
      }, 
      {
        role: "user",
        parts: [{ text: "days and thier id:\n"+jsonString1+"\nDailySchedule:\n"+jsonString3+"\nFree slots:\n"+jsonString2}],
      },
      {
        role: "user",
        parts: [{ text: "got it! I am ready to work" }],
      },
    ],
  });

  const result = await chat.sendMessage(userInput);
  const response = result.response;
  return response.text();
}



app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.get('/loader.gif', (req, res) => {
  res.sendFile(__dirname + '/loader.gif');
});
app.post('/chat', async (req, res) => {
  try {
    const userInput = req.body?.userInput;
    console.log('incoming /chat req', userInput)
    if (!userInput) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    const response = await runChat(userInput);

    // Save the chat to the database
    db.run(`INSERT INTO chat_history (user_message, bot_response) VALUES (?, ?)`, [userInput, response], function(err) {
      if (err) {
        return console.error('Error saving chat to database:', err.message);
      }
      console.log(`Chat saved with ID: ${this.lastID}`);
    });

    res.json({ response });
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/history', (req, res) => {
  db.all('SELECT * FROM chat_history ORDER BY timestamp DESC', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve chat history' });
    }
    res.json(rows);
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});