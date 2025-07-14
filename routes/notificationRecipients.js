const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/notifications/recipients - Get all notification recipients
router.get('/recipients', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM notification_recipients');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching notification recipients:', error);
    res.status(500).json({ error: 'Failed to fetch notification recipients' });
  }
});

// GET /api/notifications/recipients/:id - Get a specific notification recipient
router.get('/recipients/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.execute('SELECT * FROM notification_recipients WHERE id = ?', [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Notification recipient not found' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching notification recipient:', error);
    res.status(500).json({ error: 'Failed to fetch notification recipient' });
  }
});

// POST /api/notifications/recipients - Add a new notification recipient
router.post('/recipients', async (req, res) => {
  try {
    const { name, email, telegram_chat_id, notification_type } = req.body;
    const [result] = await db.execute(
      'INSERT INTO notification_recipients (name, email, telegram_chat_id, notification_type, created_at) VALUES (?, ?, ?, ?, NOW())',
      [name, email, telegram_chat_id, notification_type]
    );
    
    res.status(201).json({ id: result.insertId, message: 'Notification recipient added successfully' });
  } catch (error) {
    console.error('Error adding notification recipient:', error);
    res.status(500).json({ error: 'Failed to add notification recipient' });
  }
});

// PUT /api/notifications/recipients/:id - Update a notification recipient
router.put('/recipients/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, telegram_chat_id, notification_type } = req.body;
    
    const [result] = await db.execute(
      'UPDATE notification_recipients SET name = ?, email = ?, telegram_chat_id = ?, notification_type = ? WHERE id = ?',
      [name, email, telegram_chat_id, notification_type, id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Notification recipient not found' });
    }
    
    res.json({ message: 'Notification recipient updated successfully' });
  } catch (error) {
    console.error('Error updating notification recipient:', error);
    res.status(500).json({ error: 'Failed to update notification recipient' });
  }
});

// DELETE /api/notifications/recipients/:id - Delete a notification recipient
router.delete('/recipients/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.execute('DELETE FROM notification_recipients WHERE id = ?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Notification recipient not found' });
    }
    
    res.json({ message: 'Notification recipient deleted successfully' });
  } catch (error) {
    console.error('Error deleting notification recipient:', error);
    res.status(500).json({ error: 'Failed to delete notification recipient' });
  }
});

module.exports = router;