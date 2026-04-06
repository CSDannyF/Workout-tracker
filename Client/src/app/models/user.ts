export class User {
  id: number = 0;
  name: string = "";
  email: string = "";
  birthdate: Date = new Date();
  gender: string = "";
  weight: number = 0;
  height: number = 0;

  constructor(id: number, name: string, email: string, birthdate: Date, gender: string, weight: number, height: number) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.birthdate = birthdate;
    this.gender = gender;
    this.weight = weight;
    this.height = height;
  }
}
