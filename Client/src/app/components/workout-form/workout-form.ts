import { Component, EventEmitter, Output } from '@angular/core';
import { Workout } from '../../models/workout';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { WorkoutApi } from '../../services/workout-api';

@Component({
  selector: 'app-workout-form',
  imports: [FormsModule],
  templateUrl: './workout-form.html',
  styleUrl: './workout-form.css',
})
export class WorkoutForm {  

  // met Partial kan ik een leeg object aanmaken
  workout: Partial<Workout> = {};

  @Output()
  addWorkout: EventEmitter<Workout> = new EventEmitter<Workout>;

  constructor(private workoutApi: WorkoutApi, private router: Router) {}

  async onSubmit() {
    let newWorkout = new Workout(
      0,
      this.workout.name ?? "",
      this.workout.type ?? "",
      this.workout.sport ?? "",
      new Date(this.workout.date ?? Date.now()),
      this.workout.time ?? 0,
      this.workout.calories?? 0,
      this.workout.intensity
    )
    await this.workoutApi.addWorkout(newWorkout)
    this.router.navigate(['/workouts']);
  }
}
