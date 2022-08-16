import { Injectable } from '@angular/core';
import { IContador } from '../interfaces/IContador';

@Injectable({
  providedIn: 'root'
})
export class ServiceContador {

  constructor() {
    this.createContador();
   }

  public createContador() {
    let contador: IContador = {
      cuenta: 'Corriente',
      amount: 0,
    }
    const contadorStr = JSON.stringify(contador);
    console.log(contadorStr);
    localStorage.setItem('contador', contadorStr);
  }
  public getContador(): IContador {
    let contadorStorage = localStorage.getItem('contador')  || '{}';
    let contadorObj: IContador = JSON.parse(contadorStorage);
    return contadorObj;
  }

  public updateContador(contador: IContador) {
    const contadorObject = this.getContador();
    
    contadorObject.amount = contador.amount;
    localStorage.setItem('contador', JSON.stringify(contadorObject));
    return contadorObject;
  }
}
