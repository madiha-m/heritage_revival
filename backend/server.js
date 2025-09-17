const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const multer = require('multer');
const membersRouter = require('./routes/members');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(express.json());

// Multer for parsing multipart/form-data
const upload = multer();

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Heritage Revival Backend API' });
});

// Use members router with multer to parse form data
app.use('/api/members', upload.none(), membersRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
