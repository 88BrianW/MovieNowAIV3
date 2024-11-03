const express = require('express');
const path = require('path');

const app = express();
const ollama = require('ollama').default;


// Serve static files from the 'build' folder
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

// API route
app.post('/api/messages', async (req, res) => {
    try {
        console.log('Received Request Body:', req.body);
        if (req.body != undefined){
            const response = await ollama.chat({
                model: 'llama3.2',
                messages: [{ role: 'user', content: req.body.message }],
            })
            res.json(response.message.content);
        }
        else{
            res.status(500).json({ error: 'Bad message' });
        }
        
    } catch (error) {
        console.error('Error calling Ollama 3.2 API:', error); // Log the error for debugging
        res.status(500).json({ error: 'Something went wrong!' }); // Send an error response
    }
});

// Catch-all route for React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
