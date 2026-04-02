import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { WorkoutApi } from '../../services/workout-api';
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

  constructor(private workoutApi: WorkoutApi, private cdr: ChangeDetectorRef) {}
  
  async ngOnInit(): Promise<void> {
    console.log('ngOnInit aangeroepen');
    this.workouts = await this.workoutApi.getWorkouts();
    this.cdr.detectChanges();
    console.log('workouts: ', this.workouts);
  }
}
