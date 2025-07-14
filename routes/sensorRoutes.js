const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/sensors/data - Get sensor data (optionally filtered by component_id)
router.get('/data', async (req, res) => {
  try {
    const { component_id } = req.query;
    let query = 'SELECT * FROM sensor_data ORDER BY timestamp DESC';
    let params = [];
    
    if (component_id) {
      query = 'SELECT * FROM sensor_data WHERE component_id = ? ORDER BY timestamp DESC';
      params = [component_id];
    }
    
    const [rows] = await db.execute(query, params);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching sensor data:', error);
    res.status(500).json({ error: 'Failed to fetch sensor data' });
  }
});

// POST /api/sensors/data - Add new sensor data
router.post('/data', async (req, res) => {
  try {
    const { component_id, vibration, temperature, noise } = req.body;
    const [result] = await db.execute(
      'INSERT INTO sensor_data (component_id, vibration, temperature, noise, timestamp) VALUES (?, ?, ?, ?, NOW())',
      [component_id, vibration, temperature, noise]
    );
    
    res.status(201).json({ id: result.insertId, message: 'Sensor data added successfully' });
  } catch (error) {
    console.error('Error adding sensor data:', error);
    res.status(500).json({ error: 'Failed to add sensor data' });
  }
});

// GET /api/sensors/alerts - Get alerts (optionally filtered by component_id)
router.get('/alerts', async (req, res) => {
  try {
    const { component_id } = req.query;
    let query = 'SELECT * FROM alerts ORDER BY timestamp DESC';
    let params = [];
    
    if (component_id) {
      query = 'SELECT * FROM alerts WHERE component_id = ? ORDER BY timestamp DESC';
      params = [component_id];
    }
    
    const [rows] = await db.execute(query, params);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching alerts:', error);
    res.status(500).json({ error: 'Failed to fetch alerts' });
  }
});

// POST /api/sensors/alerts - Create a new alert
router.post('/alerts', async (req, res) => {
  try {
    const { component_id, message, level } = req.body;
    const [result] = await db.execute(
      'INSERT INTO alerts (component_id, message, level, timestamp) VALUES (?, ?, ?, NOW())',
      [component_id, message, level]
    );
    
    res.status(201).json({ id: result.insertId, message: 'Alert created successfully' });
  } catch (error) {
    console.error('Error creating alert:', error);
    res.status(500).json({ error: 'Failed to create alert' });
  }
});

module.exports = router;