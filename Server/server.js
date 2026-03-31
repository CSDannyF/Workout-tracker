import express from "express";
import fs from "fs";
import cors from "cors";
import { join } from "path";

import __dirname from './__dirname.js';

const app = express();
const port = process.env.PORT ? process.env.PORT : 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/", express.static(join(__dirname, 'public', 'browser')));

// Workout.json uitlezen en teruggeven als Array
async function readWorkouts() {
  let data;
  try {
    data = await fs.promises.readFile('workouts.json', 'utf8');
    if (!data) return [];
    //console.log('File data', data);
  } catch (e) {
    console.log("Error reading file: ", e)
    return [];
  }
  return JSON.parse(data);
};

// Geupdate workouts wegschrijven in workouts.json
async function writeWorkouts(workoutData) {
  try {
    const workoutDataAsString = JSON.stringify(workoutData);
    await fs.promises.writeFile('workouts.json', workoutDataAsString, 'utf8')
    //console.log("Workout added");
  } catch (e) {
    console.log("Error appending to file: ", e);
  }
};

// Endpoints
// GET workouts
app.get('/my-workouts', async (req, res) => {
  res.json(await readWorkouts());
});

// POST workouts
app.post('/my-workouts', async (req, res) => {
  const newworkout = req.body;
  let workouts = await readWorkouts();
  let highestId = Math.max(...workouts.map(w => w.id));

  if (highestId == -Infinity) {
    newworkout.id = 1;
  } else {
    newworkout.id = highestId +1;
  }

  workouts.push(newworkout);
  await writeWorkouts(workouts);
  res.status(201).json(newworkout);
});

// DELETE workout
app.delete('/my-workouts/:id', async (req, res) => {
  const workouts = await readWorkouts();
  const index = workouts.findIndex( w => w.id == req.params.id);

  if (index == -1) {
    res.status(404).send('id not found');
    return;
  } 

  workouts.splice(index, 1);

  await writeWorkouts(workouts);
  res.status(200).end();
});

app.listen(port, () => {
  console.log(`Node-express server listening on port ${port}`);
});