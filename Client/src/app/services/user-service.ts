import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom, map } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private url = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getUser$(): Observable<User> {
    return this.http.get<any>(`${this.url}/user`)
    .pipe(map((userLiteralArray: any[]) => {
      const userLiteral = userLiteralArray[0];
      return new User(
        userLiteral.id,
        userLiteral.name,
        userLiteral.email,
        userLiteral.birthdate,
        userLiteral.gender,
        userLiteral.weight,
        userLiteral.height
      )
    }));
  }

  updateUser$(updatedUser: User): Observable<User> {
    return this.http.put<User>(`${this.url}/user`, updatedUser)
    .pipe(map(userLiteral => new User(
        userLiteral.id,
        userLiteral.name,
        userLiteral.email,
        userLiteral.birthdate,
        userLiteral.gender,
        userLiteral.weight,
        userLiteral.height
    )));
  }

  getUser(): Promise<User> {
    return firstValueFrom(this.getUser$());
  }

  updateUser(updatedUser: User): Promise<User> {
    return firstValueFrom(this.updateUser$(updatedUser));
  }

}
