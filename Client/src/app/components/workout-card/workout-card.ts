import { Component, Input } from '@angular/core';
import { Workout } from '../../models/workout';
import { MatCardModule } from '@angular/material/card'

import { RelativeDatePipe } from '../../pipes/relative-date-pipe';

@Component({
  selector: 'app-workout-card',
  imports: [MatCardModule, RelativeDatePipe],
  templateUrl: './workout-card.html',
  styleUrl: './workout-card.css',
})
export class WorkoutCard {
  @Input()
  workout!: Workout;
}
