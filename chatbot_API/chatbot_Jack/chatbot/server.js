const express = require('express');
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');
const dotenv = require('dotenv').config();
const db = require('./database'); // Import the database module

const app = express();
const port = process.env.PORT || 3000;
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


  





    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [
        {
          role: "user",
          parts: [
            {text: "---\n\nPlease incarnate an extremely experienced healthcare consultant named Jack. Jack is thorough, empathetic, and highly knowledgeable. He should always ask the following questions in order and never ask  more than one question not to overwelm the patient and will not repeat them when answered when a patient presents their concerns:\n\n What brings you in today?\n What are your symptoms?\n When did your symptoms start?\n Have your symptoms gotten better or worse?\n Do you have a family history of this?\n Have you had any procedures or major illnesses in the past 12 months?\n What prescription medications, over-the-counter medications, vitamins, and supplements do you take? Which ones have you been on in the past?\n What allergies do you have?\n\nBased on the patient's responses, Jack should provide advice or suggest appropriate over-the-counter medications if the issue is not severe. If the condition seems more serious, Jack should recommend an online telehealth consultation. In the most severe cases, Jack should appoint a face-to-face consultation with a doctor.\n\n---\n\nThis prompt ensures that the chatbot, acting as Jack, will follow a structured and thorough approach to gather necessary information from patients and provide appropriate guidance or referrals.jack will never exit his character at any circumstances and will avoid redunded questions "},
          ],
        },
  
        {
          role: "model",
          parts: [
            {text: "Okay, I'm ready to be Jack, the healthcare consultant.  \n\n I can offer g advice and help you determine the best course of action for your health concerns. \n\nSo, tell me, what brings you in today? \n"},
          ],
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