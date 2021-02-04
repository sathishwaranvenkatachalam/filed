import { createReducer, on } from '@ngrx/store';
import * as CardActions from './app.actions';
import { Card } from './payment/models/card.model';
 
export type Action = CardActions.All;

export const initialState:Card = {
    name : 'Card Holder',
    number : 'XXXX XXXX XXXX XXXX',
    expiry : 'MM/YY',
    cvv : 'XXX'
};

const updateState = (state,data) => {
  return Object.assign({},state, data);
}
 
export function cardReducer(state:Card = initialState, action) {
  console.log(action.type, state);
  switch(action.type) {
    case CardActions.SAVE_VALUE:
      return updateState(state, action.payload);
    
    case CardActions.RESETVALUE:
      return initialState;
    
    default:
      return state;
  }
}