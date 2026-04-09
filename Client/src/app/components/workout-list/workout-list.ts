import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule} from '@angular/material/select';

import { WorkoutService } from '../../services/workout-service';
import { Workout } from '../../models/workout';
import { WorkoutCard } from '../workout-card/workout-card';
import { SportService } from '../../services/sport-service';
import { Sport } from '../../models/sport';

@Component({
  selector: 'app-workout-list',
  imports: [WorkoutCard, FormsModule, MatCardModule, MatDatepickerModule, MatNativeDateModule, MatInputModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './workout-list.html',
  styleUrl: './workout-list.css',
})
export class WorkoutList implements OnInit {

  workouts: Workout[] = [];
  sports: Sport[] = [];

  filteredWorkouts: Workout[] = [];
  filter = {
    sport: '',
    minTime: null as number | null,
    dateFrom: null as Date | null,
    dateTo: null as Date | null
  };

  constructor(private workoutApi: WorkoutService,private sportService: SportService , private cdr: ChangeDetectorRef) {}
  
  async ngOnInit(): Promise<void> {
    this.workouts = await this.workoutApi.getWorkouts();
    this.sports = await this.sportService.getSports();
    this.filteredWorkouts = [...this.workouts];
    this.cdr.detectChanges();
  }

  async removeChild(workoutToRemove: Workout) {
    this.workouts = this.workouts.filter(w => w.id != workoutToRemove.id);
    await this.workoutApi.deleteWorkout(workoutToRemove.id);
    this.cdr.detectChanges();
  }

  applyfilter() {
    
  }
}
