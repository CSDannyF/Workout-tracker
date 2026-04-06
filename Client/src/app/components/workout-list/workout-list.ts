import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { WorkoutService } from '../../services/workout-service';
import { Workout } from '../../models/workout';
import { WorkoutCard } from '../workout-card/workout-card';

@Component({
  selector: 'app-workout-list',
  imports: [WorkoutCard],
  templateUrl: './workout-list.html',
  styleUrl: './workout-list.css',
})
export class WorkoutList implements OnInit {

  workouts: Workout[] = [];

  constructor(private workoutApi: WorkoutService, private cdr: ChangeDetectorRef) {}
  
  async ngOnInit(): Promise<void> {
    this.workouts = await this.workoutApi.getWorkouts();
    this.cdr.detectChanges();
  }

  async removeChild(workoutToRemove: Workout) {
    this.workouts = this.workouts.filter(w => w.id != workoutToRemove.id);
    await this.workoutApi.deleteWorkout(workoutToRemove.id);
    this.cdr.detectChanges();
  }
}
