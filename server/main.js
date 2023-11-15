import express from 'express'
import cors from 'cors'
import mysql from 'mysql2'

const app = express()


app.use(cors({
    origin:'*'
}))

app.use(express.json())

const pool = mysql.createPool({
    host: 'localhost',
  user: 'root',
  database: 'escuela1',
  password: '',
  port: 3306
}).promise()

app.get('/alumnos', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM alumnos');
      res.send(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener los alumnos' });
    }
  });

  app.get('/alumnos/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const [alumno] = await pool.query('SELECT * FROM alumnos WHERE Id_alumno = ?', [id]);
  
      if (alumno.length === 0) {
        res.status(404).json({ error: 'Alumno no encontrado' });
      } else {
        res.json(alumno[0]);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener el alumno' });
    }
  });

  app.post('/alumnos', async (req, res) => {
    try {
      const { Apellido_alumno, Email_alumno, Fnac_alumno, Mobile_alumno, Dni_alumno } = req.body;
  
      const [result] = await pool.query(
        'INSERT INTO alumnos (Apellido_alumno, Email_alumno, Fnac_alumno, Mobile_alumno, Dni_alumno) VALUES (?, ?, ?, ?, ?)',
        [Apellido_alumno, Email_alumno, Fnac_alumno, Mobile_alumno, Dni_alumno]
      );
  
      res.json({ id: result.insertId, message: 'Alumno creado exitosamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear el alumno' });
    }
  });

  app.put('/alumnos/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const { Apellido_alumno, Email_alumno, Fnac_alumno, Mobile_alumno, Dni_alumno } = req.body;
  
      const [result] = await pool.query(
        'UPDATE alumnos SET Apellido_alumno = ?, Email_alumno = ?, Fnac_alumno = ?, Mobile_alumno = ?, Dni_alumno = ? WHERE Id_alumno = ?',
        [Apellido_alumno, Email_alumno, Fnac_alumno, Mobile_alumno, Dni_alumno, id]
      );
  
      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Alumno no encontrado' });
      } else {
        res.json({ message: 'Alumno actualizado exitosamente' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar el alumno' });
    }
  });

  app.delete('/alumnos/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const [result] = await pool.query('DELETE FROM alumnos WHERE Id_alumno = ?', [id]);
  
      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Alumno no encontrado' });
      } else {
        res.json({ message: 'Alumno eliminado exitosamente' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar el alumno' });
    }
  });
  




app.listen(3000, ()=>{
    console.log('Server listening on port 3000')
})