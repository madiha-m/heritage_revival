const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const multer = require('multer');

dotenv.config();

const membersRouter = require('./routes/members');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(express.json());

// Multer for parsing multipart/form-data with file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({
  storage,
  limits: {
    fieldSize: 1024 * 1024 * 10, // 10MB for field values
    fileSize: 1024 * 1024 * 5, // 5MB for files
  }
});

// Serve static files from uploads directory
app.use('/uploads', express.static('uploads'));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Heritage Revival Backend API' });
});

// Use members router with multer to handle single file upload
app.use('/api/members', upload.single('profileImageFile'), membersRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
