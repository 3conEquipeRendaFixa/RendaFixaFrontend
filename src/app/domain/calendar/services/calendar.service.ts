import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CalendarItem } from '@domain/calendar/types/interfaces/calendar.interface';

interface ApiResponse<T> {
  data: T;
  statusCode: number;
  message: string;
  success: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/calendar';

  getCalendars(
    exchange?: string,
    location?: string,
    segment?: string,
    process?: string
  ): Observable<CalendarItem[]> {
    let url = `${this.apiUrl}/calendars`;
    const params = new URLSearchParams();

    if (exchange) params.append('exchange', exchange);
    if (location) params.append('location', location);
    if (segment) params.append('segment', segment);
    if (process) params.append('process', process);

    const queryString = params.toString();
    if (queryString) {
      url += `?${queryString}`;
    }

    return this.http.get<ApiResponse<CalendarItem[]>>(url).pipe(
      map(response => response.data || [])
    );
  }

  getAllCalendars(): Observable<CalendarItem[]> {
    return this.getCalendars();
  }
}
