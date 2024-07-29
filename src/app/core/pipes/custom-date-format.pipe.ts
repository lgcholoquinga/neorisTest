import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'customDateFormat',
  standalone: true,
})
export class CustomDateFormatPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    const dateRelease = moment(value, moment.ISO_8601);
    const dateUTC = dateRelease.utc();
    return dateUTC.format('YYYY-MM-DD');
  }
}
