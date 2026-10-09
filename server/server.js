require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const ImageKit = require('imagekit');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// ImageKit configuration
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

// Image Schema
const imageSchema = new mongoose.Schema({
  url: String,
  fileId: String,
  title: String,
  createdAt: { type: Date, default: Date.now }
});
const Image = mongoose.model('Image', imageSchema);

// Video Schema
const videoSchema = new mongoose.Schema({
  url: String,
  title: String,
  createdAt: { type: Date, default: Date.now }
});
const Video = mongoose.model('Video', videoSchema);

// News Schema
const newsSchema = new mongoose.Schema({
  url: String,
  fileId: String,
  title: String,
  createdAt: { type: Date, default: Date.now }
});
const News = mongoose.model('News', newsSchema);

// Membership Schema
const membershipSchema = new mongoose.Schema({
  membershipType: String,
  fullName: String,
  fatherName: String,
  dob: String,
  gender: String,
  mobile: String,
  email: String,
  aadhaar: String,
  city: String,
  pincode: String,
  district: String,
  state: String,
  address: String,
  photoUrl: String,
  aadhaarFrontUrl: String,
  aadhaarBackUrl: String,
  panCardUrl: String,
  createdAt: { type: Date, default: Date.now }
});
const Membership = mongoose.model('Membership', membershipSchema);


// Set up multer for memory storage
const upload = multer({ storage: multer.memoryStorage() });

// --- Routes ---

// Get all images
app.get('/api/images', async (req, res) => {
  try {
    const images = await Image.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch images' });
  }
});

// Upload a new image
app.post('/api/images', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No image provided' });
    
    // Upload to ImageKit
    const uploadResponse = await imagekit.upload({
      file: req.file.buffer.toString('base64'), // Upload as base64
      fileName: req.file.originalname,
      folder: '/shield-foundation'
    });
    
    // Save to Database
    const newImage = new Image({
      url: uploadResponse.url,
      fileId: uploadResponse.fileId,
      title: req.body.title || 'Untitled'
    });
    
    await newImage.save();
    res.status(201).json(newImage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// Delete an image
app.delete('/api/images/:id', async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) return res.status(404).json({ error: 'Image not found' });
    
    // Delete from ImageKit
    await imagekit.deleteFile(image.fileId);
    
    // Delete from Database
    await Image.findByIdAndDelete(req.params.id);
    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete image' });
  }
});

// --- Video Routes ---

// Get all videos
app.get('/api/videos', async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
});

// Add a video
app.post('/api/videos', async (req, res) => {
  try {
    const { url, title } = req.body;
    if (!url) return res.status(400).json({ error: 'URL is required' });
    
    const newVideo = new Video({ url, title: title || 'Untitled Video' });
    await newVideo.save();
    res.status(201).json(newVideo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add video' });
  }
});

// Delete a video
app.delete('/api/videos/:id', async (req, res) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);
    if (!video) return res.status(404).json({ error: 'Video not found' });
    res.json({ message: 'Video deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete video' });
  }
});

// --- News Routes ---

app.get('/api/news', async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

app.post('/api/news', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No image provided' });
    
    const uploadResponse = await imagekit.upload({
      file: req.file.buffer.toString('base64'),
      fileName: req.file.originalname,
      folder: '/shield-foundation/news'
    });
    
    const newNews = new News({
      url: uploadResponse.url,
      fileId: uploadResponse.fileId,
      title: req.body.title || 'Untitled News'
    });
    
    await newNews.save();
    res.status(201).json(newNews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to upload news image' });
  }
});

app.delete('/api/news/:id', async (req, res) => {
  try {
    const newsItem = await News.findById(req.params.id);
    if (!newsItem) return res.status(404).json({ error: 'News not found' });
    
    await imagekit.deleteFile(newsItem.fileId);
    await News.findByIdAndDelete(req.params.id);
    res.json({ message: 'News deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete news' });
  }
});

// --- Membership Routes ---

app.post('/api/memberships', upload.fields([
  { name: 'photo', maxCount: 1 },
  { name: 'aadhaarFront', maxCount: 1 },
  { name: 'aadhaarBack', maxCount: 1 },
  { name: 'panCard', maxCount: 1 }
]), async (req, res) => {
  try {
    const files = req.files;
    
    const uploadToImageKit = async (fileBuffer, originalname) => {
      if (!fileBuffer) return null;
      const response = await imagekit.upload({
        file: fileBuffer.toString('base64'),
        fileName: originalname,
        folder: '/regsiter'
      });
      return response.url;
    };

    let photoUrl = '';
    let aadhaarFrontUrl = '';
    let aadhaarBackUrl = '';
    let panCardUrl = '';

    if (files.photo && files.photo[0]) {
      photoUrl = await uploadToImageKit(files.photo[0].buffer, files.photo[0].originalname);
    }
    if (files.aadhaarFront && files.aadhaarFront[0]) {
      aadhaarFrontUrl = await uploadToImageKit(files.aadhaarFront[0].buffer, files.aadhaarFront[0].originalname);
    }
    if (files.aadhaarBack && files.aadhaarBack[0]) {
      aadhaarBackUrl = await uploadToImageKit(files.aadhaarBack[0].buffer, files.aadhaarBack[0].originalname);
    }
    if (files.panCard && files.panCard[0]) {
      panCardUrl = await uploadToImageKit(files.panCard[0].buffer, files.panCard[0].originalname);
    }

    const newMembership = new Membership({
      ...req.body,
      photoUrl,
      aadhaarFrontUrl,
      aadhaarBackUrl,
      panCardUrl
    });

    await newMembership.save();
    res.status(201).json({ message: 'Membership created successfully', data: newMembership });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to submit membership form' });
  }
});

app.get('/api/memberships', async (req, res) => {
  try {
    const memberships = await Membership.find().sort({ createdAt: -1 });
    res.json(memberships);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch memberships' });
  }
});

app.delete('/api/memberships/:id', async (req, res) => {
  try {
    const membership = await Membership.findById(req.params.id);
    if (!membership) return res.status(404).json({ error: 'Membership not found' });
    
    // Optionally delete files from ImageKit here using their URLs or fileIds if saved.
    // For now we just delete the db record.
    await Membership.findByIdAndDelete(req.params.id);
    res.json({ message: 'Membership deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete membership' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
