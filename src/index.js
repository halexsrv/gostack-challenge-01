const express = require('express');

const server = express();

server.use(express.json());

countRequests = 0;

server.use((req, res, next) => {
  countRequests++;
  console.log(`Total requests = ${countRequests}`);

  return next();
});

const projects = [];

function checkProjectExists(req, res, next) {
  const { id } = req.params;

  // projects.map(project => {
  //   if (project.id === id) {
  //     return next();
  //   }
  // });

  // return res.status(400).json({ error: 'Project does not exists' });

  const project = projects.find(project => project.id === id);

  if (!project) {
    return res.status(400).json({ error: 'Project does not exists' });
  }

  return next();
}

server.post('/projects', (req, res) => {
  const { id, title, tasks } = req.body;

  const project = { id, title, tasks };

  projects.push(project);

  return res.status(201).json(project);
});

server.get('/projects', (req, res) => {
  return res.json(projects);
});

server.put('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  // projects.forEach((project, index) => {
  //   if (project.id === id) {
  //     projects[index].title = title;

  //     return res.json(project);
  //   }
  // });

  const project = projects.find(project => project.id === id);

  project.title = title;

  return res.json(project);
});

server.delete('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;

  // projects.forEach((project, index) => {
  //   if (project.id === id) {
  //     projects.splice(index, 1);

  //     return res.send();
  //   }
  // });

  const projectIndex = projects.findIndex(project => project.id == id);

  projects.splice(projectIndex, 1);

  return res.send();
});

server.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  // projects.forEach((project, index) => {
  //   if (project.id === id) {
  //     projects[index].tasks.push(title);

  //     return res.status(201).json(projects[index]);
  //   }
  // });

  const project = projects.find(project => project.id == id);

  project.tasks.push(title);

  return res.json(project);
});

server.listen(3333);
