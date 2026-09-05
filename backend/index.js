require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { db } = require('./firebase');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'DISCC Backend is running' });
});

// --- Blogs ---

// Get all blogs
app.get('/api/blogs', async (req, res) => {
  try {
    const snapshot = await db.collection('blogs').orderBy('publishedAt', 'desc').get();
    const blogs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single blog
app.get('/api/blogs/:id', async (req, res) => {
  try {
    const doc = await db.collection('blogs').doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create blog
app.post('/api/blogs', async (req, res) => {
  try {
    // In production, add authentication middleware here
    const newBlog = {
      ...req.body,
      createdAt: new Date(),
      publishedAt: req.body.publishedAt ? new Date(req.body.publishedAt) : new Date(),
    };
    const docRef = await db.collection('blogs').add(newBlog);
    res.status(201).json({ id: docRef.id, ...newBlog });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete blog
app.delete('/api/blogs/:id', async (req, res) => {
  try {
    await db.collection('blogs').doc(req.params.id).delete();
    res.json({ success: true, message: 'Blog deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- Gallery ---

app.get('/api/gallery', async (req, res) => {
  try {
    const snapshot = await db.collection('gallery').orderBy('createdAt', 'desc').get();
    const images = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/gallery', async (req, res) => {
  try {
    const newImage = {
      ...req.body,
      createdAt: new Date()
    };
    const docRef = await db.collection('gallery').add(newImage);
    res.status(201).json({ id: docRef.id, ...newImage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/gallery/:id', async (req, res) => {
  try {
    await db.collection('gallery').doc(req.params.id).delete();
    res.json({ success: true, message: 'Image deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- Contact Entries ---

app.get('/api/contact', async (req, res) => {
  try {
    const snapshot = await db.collection('contact_entries').orderBy('createdAt', 'desc').get();
    const entries = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    const newEntry = {
      ...req.body,
      isRead: false,
      createdAt: new Date()
    };
    const docRef = await db.collection('contact_entries').add(newEntry);
    res.status(201).json({ id: docRef.id, ...newEntry });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- Dynamic Pages ---
app.get('/api/pages', async (req, res) => {
  try {
    const snapshot = await db.collection('pages').get();
    const pages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(pages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/pages', async (req, res) => {
  try {
    const newPage = { ...req.body, createdAt: new Date() };
    const docRef = await db.collection('pages').add(newPage);
    res.status(201).json({ id: docRef.id, ...newPage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/pages/:id', async (req, res) => {
  try {
    await db.collection('pages').doc(req.params.id).delete();
    res.json({ success: true, message: 'Page deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- Teams ---
app.get('/api/teams', async (req, res) => {
  try {
    const snapshot = await db.collection('teams').get();
    res.json(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/teams', async (req, res) => {
  try {
    const docRef = await db.collection('teams').add({ ...req.body, createdAt: new Date() });
    res.status(201).json({ id: docRef.id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/teams/:id', async (req, res) => {
  try {
    await db.collection('teams').doc(req.params.id).delete();
    res.json({ success: true, message: 'Team member deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- Testimonials ---
app.get('/api/testimonials', async (req, res) => {
  try {
    const snapshot = await db.collection('testimonials').get();
    res.json(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/testimonials', async (req, res) => {
  try {
    const docRef = await db.collection('testimonials').add({ ...req.body, createdAt: new Date() });
    res.status(201).json({ id: docRef.id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- Careers ---
app.get('/api/careers', async (req, res) => {
  try {
    const snapshot = await db.collection('careers').get();
    res.json(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/careers', async (req, res) => {
  try {
    const docRef = await db.collection('careers').add({ ...req.body, createdAt: new Date() });
    res.status(201).json({ id: docRef.id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- FAQs ---
app.get('/api/faqs', async (req, res) => {
  try {
    const snapshot = await db.collection('faqs').get();
    res.json(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/faqs', async (req, res) => {
  try {
    const docRef = await db.collection('faqs').add({ ...req.body, createdAt: new Date() });
    res.status(201).json({ id: docRef.id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- Settings ---
app.get('/api/settings', async (req, res) => {
  try {
    const snapshot = await db.collection('settings').limit(1).get();
    if (snapshot.empty) return res.json({});
    res.json({ id: snapshot.docs[0].id, ...snapshot.docs[0].data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
