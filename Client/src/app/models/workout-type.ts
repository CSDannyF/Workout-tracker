export class WorkoutType {
  id: number = 0;
  name: string = "";
  category: string = "";

  constructor(id: number = 0, name: string, category: string) {
    this.id = id;
    this.name = name;
    this.category = category;
  }
}
