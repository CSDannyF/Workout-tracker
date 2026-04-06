import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom, map } from 'rxjs';
import { Sport } from '../models/sport';

@Injectable({
  providedIn: 'root',
})
export class SportService {

  private url = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getSports$(): Observable<Sport[]> {
    return this.http.get<any[]>(`${this.url}/sports`)
    .pipe(map((sportLiteralArray: any[]) => {
      return sportLiteralArray.map(sportLiteral => new Sport(
        sportLiteral.id,
        sportLiteral.name,
        sportLiteral.category
      ))
    }));
  }

  addSport$(newSport: Sport): Observable<Sport> {
    return this.http.post<Sport>(`${this.url}/sports`, newSport)
    .pipe(map(sportLiteral => new Sport(
      sportLiteral.id,
      sportLiteral.name,
      sportLiteral.category
    )));
  }

  deleteSport$(id: number):Observable<void> {
    return this.http.delete<void>(`${this.url}/sports/${id}`);
  }

  getSports(): Promise<Sport[]> {
    return firstValueFrom(this.getSports$());
  }

  addSport(newSport: Sport): Promise<Sport> {
    return firstValueFrom(this.addSport$(newSport));
  }

  deleteSport(id: number): Promise<void> {
    return firstValueFrom(this.deleteSport$(id));
  }
}
