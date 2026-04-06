export class User {
  userId: number = 0;
  name: string = "";
  email: string = "";
  birthdate: Date = new Date();
  gender: string = "";

  constructor(userId: number, name: string, email: string, birthdate: Date, gender: string) {
    this.userId = userId;
    this.name = name;
    this.email = email;
    this.birthdate = birthdate;
    this.gender = gender;
  }
}
