const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/maintenance - Get maintenance records (optionally filtered by component_id)
router.get('/', async (req, res) => {
  try {
    const { component_id } = req.query;
    let query = 'SELECT * FROM maintenance_records ORDER BY performed_at DESC';
    let params = [];
    
    if (component_id) {
      query = 'SELECT * FROM maintenance_records WHERE component_id = ? ORDER BY performed_at DESC';
      params = [component_id];
    }
    
    const [rows] = await db.execute(query, params);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching maintenance records:', error);
    res.status(500).json({ error: 'Failed to fetch maintenance records' });
  }
});

// GET /api/maintenance/:id - Get a specific maintenance record
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.execute('SELECT * FROM maintenance_records WHERE id = ?', [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Maintenance record not found' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching maintenance record:', error);
    res.status(500).json({ error: 'Failed to fetch maintenance record' });
  }
});

// POST /api/maintenance - Create a new maintenance record
router.post('/', async (req, res) => {
  try {
    const { component_id, description, performed_by, next_maintenance } = req.body;
    const [result] = await db.execute(
      'INSERT INTO maintenance_records (component_id, description, performed_by, performed_at, next_maintenance) VALUES (?, ?, ?, NOW(), ?)',
      [component_id, description, performed_by, next_maintenance]
    );
    
    res.status(201).json({ id: result.insertId, message: 'Maintenance record created successfully' });
  } catch (error) {
    console.error('Error creating maintenance record:', error);
    res.status(500).json({ error: 'Failed to create maintenance record' });
  }
});

// PUT /api/maintenance/:id - Update a maintenance record
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description, performed_by, next_maintenance } = req.body;
    
    const [result] = await db.execute(
      'UPDATE maintenance_records SET description = ?, performed_by = ?, next_maintenance = ? WHERE id = ?',
      [description, performed_by, next_maintenance, id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Maintenance record not found' });
    }
    
    res.json({ message: 'Maintenance record updated successfully' });
  } catch (error) {
    console.error('Error updating maintenance record:', error);
    res.status(500).json({ error: 'Failed to update maintenance record' });
  }
});

// DELETE /api/maintenance/:id - Delete a maintenance record
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.execute('DELETE FROM maintenance_records WHERE id = ?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Maintenance record not found' });
    }
    
    res.json({ message: 'Maintenance record deleted successfully' });
  } catch (error) {
    console.error('Error deleting maintenance record:', error);
    res.status(500).json({ error: 'Failed to delete maintenance record' });
  }
});

module.exports = router;