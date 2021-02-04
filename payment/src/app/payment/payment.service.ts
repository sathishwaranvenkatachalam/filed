import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient: HttpClient) { }

  saveCard(data) {
    return this.httpClient.post('https://crudcrud.com/api/fdd8d36113414b42b96d6905f1e9de1e/card', data);
  }

}
