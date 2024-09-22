@echo off
cd chatbot_API/chatbot_Jack/chatbot
start cmd /k "node server.js"
cd ../../chatbot_Jeremsy/chatbot
start cmd /k "node server.js"
cd ../../API_mimi
start cmd /k "node server.js"