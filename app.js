const express = require('express');
const app = express();
const port = 5050;

app.use(express.json());


const tasks = [];


app.get('/api/todo', (req, res) => {
  res.json(tasks);
});

app.post('/api/todo/create', (req, res) => {
  const { Descripcion, Estado } = req.body;

  if (!Descripcion || !Estado) {
    return res.status(400).json({ error: 'Descripción y Estado son obligatorios' });
  }

  const newTask = {
    Descripcion,
    Estado,
  };

  tasks.push(newTask);
  res.json({ Mensaje: 'Tarea creada con éxito' });
});

app.post('/api/todo/mark/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  task.Estado = 'Terminada';
  res.json({ Mensaje: 'Tarea marcada como terminada' });
});

app.listen(port, () => {
  console.log(`API del To-Do List está escuchando en http://localhost:5050`);
});
