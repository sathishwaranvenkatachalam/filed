import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Card } from './payment/models/card.model';


interface AppState {
  card : Card
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  title = 'payment';
  card:Observable<Card>;
  constructor(private router : Router, private store: Store<AppState>) {
    this.card = this.store.select('card');
  }
  
  routeTo(route) {
    this.router.navigate([route]);
  }

  rotateCard() {
    let card= document.querySelectorAll('.db-card')[0];
    if(card.classList.contains('rotate180')) {
      card.classList.remove('rotate180');
    } else {
      card.classList.add('rotate180');
    }
  }
}
