import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'relativeDate',
})
export class RelativeDatePipe implements PipeTransform {
  transform(workoutDate: Date, ...args: unknown[]): string {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate()-1);
    const inputDate = new Date(workoutDate);

    if (inputDate.toDateString() === today.toDateString()) {
      return "Today";
    } else if (inputDate.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
        return inputDate.toDateString();
    }
   
  }
}
