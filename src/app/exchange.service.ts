import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ExchangeService {
  constructor(private http: HttpClient) { }
  
  getCurrencies(currency: string = 'USD'): Observable<any> {
    return this.http.get<any>(`https://freecurrencyapi.net/api/v2/latest?apikey=5d006840-4561-11ec-9372-250197b0dab9&base_currency=${currency}`)
  }
}