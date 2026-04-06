import express from "express";
import fs from "fs";
import cors from "cors";
import { join } from "path";

import __dirname from './__dirname.js';

const app = express();
const port = process.env.PORT ? process.env.PORT : 3000;

const workoutsPath = "workouts.json";
const sportsPath = "sport.json";

// Middleware
app.use(cors());
app.use(express.json());
app.use("/", express.static(join(__dirname, 'public', 'browser')));

// Json uitlezen en teruggeven als Array
async function readJsonData(path) {
  let data;
  try {
    data = await fs.promises.readFile(path, 'utf8');
    if (!data) return [];
  } catch (e) {
    console.log("Error reading file: ", e);
    return []
  }
  return JSON.parse(data);
}

// Data in Json wegschrijven
async function writeJsonData(path, workoutData) {
  try {
    const workoutDataAsString = JSON.stringify(workoutData);
    await fs.promises.writeFile(path, workoutDataAsString, 'utf8')
    //console.log("Workout added");
  } catch (e) {
    console.log("Error appending to file: ", e);
  }
};

// Endpoints Workouts
// GET workouts
app.get('/my-workouts', async (req, res) => {
  res.json(await readJsonData(workoutsPath));
});

// POST workouts
app.post('/my-workouts', async (req, res) => {
  const newworkout = req.body;
  let workouts = await readJsonData(workoutsPath);
  let highestId = Math.max(...workouts.map(w => w.id));

  if (highestId == -Infinity) {
    newworkout.id = 1;
  } else {
    newworkout.id = highestId +1;
  }

  workouts.push(newworkout);
  await writeJsonData(workoutsPath, workouts);
  res.status(201).json(newworkout);
});

// DELETE workout
app.delete('/my-workouts/:id', async (req, res) => {
  const workouts = await readJsonData(workoutsPath);
  const index = workouts.findIndex(w => w.id == req.params.id);

  if (index == -1) {
    res.status(404).send('id not found');
    return;
  } 

  workouts.splice(index, 1);

  await writeJsonData(workoutsPath, workouts);
  res.status(200).end();
});


// Endpoints Sport
// GET sport
app.get('/sports', async (req, res) => {
  res.json(await readJsonData(sportsPath));
});

//POST sport
app.post('/sports', async (req, res) => {
  const newSport = req.body;
  let sports = await readJsonData(sportsPath);
  let highestId = Math.max(...sports.map(s => s.id));

  if (highestId == -Infinity) {
    newSport.id = 1
  } else {
    newSport.id = highestId+1;
  }

  sports.push(newSport);
  await writeJsonData(sportsPath, sports);
  res.status(201).json(newSport);
});

//DELETE
app.delete('/sports/:id', async (req, res) => {
  const sports = await readJsonData(sportsPath);
  const index = sports.findIndex(s => s.id == req.params.id);

  if (index == -1) {
    res.status(404).send('id not found');
    return;
  }

  sports.splice(index, 1);

  await writeJsonData(sportsPath, sports);
  res.status(200).end();
});

app.listen(port, () => {
  console.log(`Node-express server listening on port ${port}`);
});