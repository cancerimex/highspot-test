import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CardResponse } from '../models/card';

/**
 * Card Service
 */
@Injectable({
  providedIn: 'root'
})
export class CardService {

  /**
   * Creates an instance of CardService
   *
   * @param http HttpClient
   */
  constructor(
    private http: HttpClient
  ) { }

  /**
   * Get a list of cards from the API
   *
   * @param page Pagination
   * @param pageSize Anywhere from 1-100 is valid.
   */
  getCardList(page: number = 1, pageSize: number = 20): Observable<CardResponse> {
    return this.http.get<CardResponse>(`https://api.elderscrollslegends.io/v1/cards?page=${page}&pageSize=${pageSize}`)
      .pipe(
        catchError(this.handleError<CardResponse>('getCardList', null))
      );
  }

  /**
   * Generic error handler
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
