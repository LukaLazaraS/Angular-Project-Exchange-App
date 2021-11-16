import { Component, OnInit, ViewChild } from '@angular/core';
import { ExchangeService } from '../exchange.service';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss']
})
export class ExchangeComponent implements OnInit {
  faExchangeAlt = faExchangeAlt;

  currencyNames: string[] = [];
  data: object | undefined;
  Currency1inputNum: string | number = "";
  Currency2inputNum: string | number = "";

  inputs: number[] = [];

  selectedCurrency1: string = 'GEL';
  selectedCurrency2: string = 'EUR';

  currenciesMap = new Map();
  
  constructor( private exchangeService: ExchangeService) { }

  ngOnInit(): void {
    this.exchangeService.getCurrencies().subscribe (data => {
      this.data = data;
      this.currencyNames = Object.keys(data.data);
      this.currencyNames.unshift('USD');
    })
  }
  
  onCurrency1Change(e: any, Currency1input: any, Currency2input: any, isInput1: boolean) {
    this.exchangeService.getCurrencies(Currency1input.value).subscribe(data => {
      if(Currency1input.value == Currency2input.value){
        this.Currency2inputNum = e.value
      }else{
        if(isInput1){
          this.multiInputsConverter(Currency1input.value, Number(e.value) * data.data[Currency2input.value])
        }else{
          this.Currency1inputNum = Number(e.value) * data.data[Currency2input.value];
        }
      }
      
    })
  }

  onAddCurrency(){
    this.inputs.push(0);
  }
  
  onClearAll(){
    this.currenciesMap = new Map();
    this.inputs = [];
    this.Currency1inputNum = "";
    this.Currency2inputNum = "";

    // location.reload();

  }

  onExchangeAlt(){
    let temp: string = this.selectedCurrency1;
    this.selectedCurrency1 = this.selectedCurrency2;
    this.selectedCurrency2 = temp;

    this.currenciesMap = new Map();
    this.Currency1inputNum = "";
    this.Currency2inputNum = "";
  }

  multiInputsConverter(currency: string, value: number){
    this.currenciesMap.set(currency, value);
    this.Currency2inputNum = 0;
    console.log(this.currenciesMap);
    
    this.currenciesMap.forEach((value, key) => {
      this.Currency2inputNum += value;
    })
    
  }
}