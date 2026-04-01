import { Component, Input } from '@angular/core';
import { Workout } from '../../models/workout';

@Component({
  selector: 'app-workout-card',
  imports: [],
  templateUrl: './workout-card.html',
  styleUrl: './workout-card.css',
})
export class WorkoutCard {
  @Input()
  workout!: Workout;
  
}
