import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Workout } from '../../models/workout';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { RelativeDatePipe } from '../../pipes/relative-date-pipe';

@Component({
  selector: 'app-workout-card',
  imports: [MatCardModule, RelativeDatePipe, MatButtonModule, MatIconModule],
  templateUrl: './workout-card.html',
  styleUrl: './workout-card.css',
})
export class WorkoutCard {
  @Input()
  workout!: Workout;

  @Output()
  removed: EventEmitter<Workout> = new EventEmitter<Workout>;

  remove() {
    this.removed.emit(this.workout);
  }
}
