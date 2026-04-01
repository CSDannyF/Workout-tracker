import { Component, OnInit } from '@angular/core';
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

  constructor(private workoutApi: WorkoutApi) {}
  
  async ngOnInit(): Promise<void> {
    this.workouts = await this.workoutApi.getWorkouts();
  }
}
