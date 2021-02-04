import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import * as _moment from 'moment';
import { Observable } from 'rxjs';
import { Card } from 'src/app/payment/models/card.model';
import { PaymentService } from 'src/app/payment/payment.service';
import * as CardActions from '../../app.actions';

const moment = _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

interface AppState {
  card : Card
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  providers :  [{
    provide: DateAdapter,
    useClass: MomentDateAdapter,
    deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
  },

  {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},]
})
export class PaymentComponent implements OnInit {
  card: Observable<Card>;
  cardForm: FormGroup;
  isLoading: boolean = false;
  today:any = moment().toDate();

  constructor(private store: Store<AppState>, private formBuilder: FormBuilder, private paymentService:PaymentService,
    private _snackBar: MatSnackBar) {
    this.card = this.store.select('card');
   }

  ngOnInit(): void {
    this.cardForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      number: new FormControl('', Validators.required),
      expiry: new FormControl('', Validators.required),
      cvv: new FormControl('', Validators.required)
    });
  }

  cardNumFormat(event) {
    console.log(event.target.value);
    if(this.numberOnly(event)) {
      if(event.key != 'Backspace' && event.key != 'Delete') {
        const number = event.target.value.split(' ').filter(value => !!value).join('');
        if(number.length != 0 && (number.length % 4)  == 0 && number.length !=16 ) {
          this.cardForm.get('number').setValue( this.cardForm.value.number + ' ')
        }
      }
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  chosenYearHandler(normalizedYear) {
    const ctrlValue = moment();
    ctrlValue.year(normalizedYear.year());
    this.cardForm.get('expiry').setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth, datepicker: MatDatepicker<any>) {
    const ctrlValue =  this.cardForm.get('expiry').value;
    ctrlValue.month(normalizedMonth.month());
    this.cardForm.get('expiry').setValue(ctrlValue);
    datepicker.close();
  }

  saveCard() {
    if(this.cardForm.valid) {
      const data = Object.assign({}, this.cardForm.value, {expiry: this.cardForm.value.expiry.format('MM/YY')})
      this.isLoading = true;
      this.paymentService.saveCard(data).subscribe(res=> {
        this._snackBar.open('Card details saved', 'Ok');
        this.store.dispatch(new CardActions.SAVEVALUE(data));
        this.isLoading = false;
      }, err => {
        this._snackBar.open('Error occured, please try again', 'Ok!');
        this.isLoading = false;
      })
    } else {
      this._snackBar.open('Details are not valid, please check again', 'Ok!');
    }
  }

  reset() {
    this.cardForm.reset();
    this.store.dispatch(new CardActions.ResetValue());
  }

  numberOnly(event) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

}
