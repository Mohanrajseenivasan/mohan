const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/components - Get all components
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM components');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching components:', error);
    res.status(500).json({ error: 'Failed to fetch components' });
  }
});

// GET /api/components/:id - Get a specific component
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.execute('SELECT * FROM components WHERE id = ?', [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Component not found' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching component:', error);
    res.status(500).json({ error: 'Failed to fetch component' });
  }
});

// POST /api/components - Create a new component
router.post('/', async (req, res) => {
  try {
    const { name, status, last_maintenance, next_maintenance } = req.body;
    const [result] = await db.execute(
      'INSERT INTO components (name, status, last_maintenance, next_maintenance) VALUES (?, ?, ?, ?)',
      [name, status, last_maintenance, next_maintenance]
    );
    
    res.status(201).json({ id: result.insertId, message: 'Component created successfully' });
  } catch (error) {
    console.error('Error creating component:', error);
    res.status(500).json({ error: 'Failed to create component' });
  }
});

// PUT /api/components/:id - Update a component
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, status, last_maintenance, next_maintenance } = req.body;
    
    const [result] = await db.execute(
      'UPDATE components SET name = ?, status = ?, last_maintenance = ?, next_maintenance = ? WHERE id = ?',
      [name, status, last_maintenance, next_maintenance, id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Component not found' });
    }
    
    res.json({ message: 'Component updated successfully' });
  } catch (error) {
    console.error('Error updating component:', error);
    res.status(500).json({ error: 'Failed to update component' });
  }
});

// DELETE /api/components/:id - Delete a component
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.execute('DELETE FROM components WHERE id = ?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Component not found' });
    }
    
    res.json({ message: 'Component deleted successfully' });
  } catch (error) {
    console.error('Error deleting component:', error);
    res.status(500).json({ error: 'Failed to delete component' });
  }
});

module.exports = router;