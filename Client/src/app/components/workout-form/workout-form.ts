import { Component, OnInit } from '@angular/core';
import { Workout } from '../../models/workout';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule} from '@angular/material/select';
import { MatAnchor } from "@angular/material/button";

import { WorkoutService } from '../../services/workout-service';
import { SportService } from '../../services/sport-service';
import { Sport } from '../../models/sport';

@Component({
  selector: 'app-workout-form',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatAnchor, MatButtonModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule],
  templateUrl: './workout-form.html',
  styleUrl: './workout-form.css',
})
export class WorkoutForm implements OnInit {  

  // met Partial kan ik een leeg object aanmaken
  workout: Partial<Workout> = {};
  sports: Sport[] = [];

  constructor(private workoutService: WorkoutService, private sportService: SportService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    this.sports = await this.sportService.getSports();
  }

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
    await this.workoutService.addWorkout(newWorkout)
    this.router.navigate(['/workouts']);
  }
}
