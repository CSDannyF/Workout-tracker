import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom, map } from 'rxjs';

import { Workout } from '../models/workout';

@Injectable({
  providedIn: 'root',
})
export class WorkoutApi {

  private url = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getWorkouts$(): Observable<Workout[]> {
    return this.http.get<any[]>(`${this.url}/my-workouts`)
    .pipe(map((workoutLiteralArray: any[]) => {
      return workoutLiteralArray.map(workoutLiteral => new Workout(
        workoutLiteral.id,
        workoutLiteral.name,
        workoutLiteral.type,
        workoutLiteral.sport,
        workoutLiteral.date,
        workoutLiteral.time,
        workoutLiteral.calories,
        workoutLiteral.intensity
      ))
    }));
  } 

  addWorkout$(newWorkout: Workout): Observable<Workout> {
    return this.http.post<Workout>(`${this.url}/my-workouts`, newWorkout).pipe(map(workoutLiteral => new Workout(
      workoutLiteral.id,
      workoutLiteral.name,
      workoutLiteral.type,
      workoutLiteral.sport,
      workoutLiteral.date,
      workoutLiteral.time,
      workoutLiteral.calories,
      workoutLiteral.intensity
    )));
  }

  deleteWorkout$(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/my-workouts/${id}`)
  }

  
  getWorkouts(): Promise<Workout[]> {
    return firstValueFrom(this.getWorkouts$());
  }

  addWorkout(newWorkout: Workout): Promise<Workout> {
    return firstValueFrom(this.addWorkout$(newWorkout));
  }

  deleteWorkout(id: number): Promise<void> {
    return firstValueFrom(this.deleteWorkout$(id));
  }
}
