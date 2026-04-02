export class Workout {
  id: number = 0;
  name: string = "";
  type: string = "";
  sport: string = "";
  date: Date = new Date();
  startTime: string
  time: number = 0;
  calories: number = 0;
  intensity?: number = 0;

  constructor(id: number = 0, name: string, type: string, sport: string, date: Date, startTime: string, time: number, calories: number, intensity?: number) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.sport = sport;
    this.date = date;
    this.startTime = startTime;
    this.time = time;
    this.calories = calories;
    this. intensity = intensity;
  }
}
