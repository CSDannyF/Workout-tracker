import { Component, EventEmitter, Output } from '@angular/core';
import { Workout } from '../../models/workout';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


import { WorkoutApi } from '../../services/workout-api';
import { MatAnchor } from "@angular/material/button";

@Component({
  selector: 'app-workout-form',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatAnchor, MatButtonModule, MatDatepickerModule, MatNativeDateModule],
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
      this.workout.startTime ?? "",
      this.workout.time ?? 0,
      this.workout.calories?? 0,
      this.workout.intensity
    )
    await this.workoutApi.addWorkout(newWorkout)
    this.router.navigate(['/workouts']);
  }
}
