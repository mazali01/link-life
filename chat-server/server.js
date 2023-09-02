const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require("./routes/authRoutes");
const chatsRoutes = require("./routes/chatsRoutes");

const app = express();
dotenv.config();

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/chats', chatsRoutes);

const PORT = process.env.PORT;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
