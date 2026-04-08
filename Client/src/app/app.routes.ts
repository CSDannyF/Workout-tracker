import { Routes } from '@angular/router';
import { WorkoutList } from './components/workout-list/workout-list';
import { WorkoutForm } from './components/workout-form/workout-form';
import { Profile } from './components/profile/profile';

export const routes: Routes = [
  { path: "workouts", component: WorkoutList },
  { path: "workouts/add", component: WorkoutForm },
  { path: "profile", component: Profile }
];
