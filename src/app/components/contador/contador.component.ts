import { Component, OnInit } from '@angular/core';
import { IContador } from 'src/app/interfaces/IContador';
import { ServiceContador } from 'src/app/services/service-contador.service';

@Component({
  selector: 'app-contador',
  templateUrl: './contador.component.html',
  styleUrls: ['./contador.component.css']
})
export class ContadorComponent implements OnInit {

  contador!: IContador;
  valueContador: number = 0;
  constructor( private serviceContador: ServiceContador) { }

  ngOnInit(): void {
    this.contador = this.serviceContador.getContador();
    // console.log(typeof(this.totalContador));
    // console.log(this.totalContador.amount);
    this.valueContador = this.getCounter(this.contador);
  }

  public actionNumberChange(action: string, contador:IContador) {
    const amount = action === 'plus' ? contador.amount + 1: contador.amount - 1;
    contador.amount = Number(amount);
    this.contador = this.serviceContador.updateContador(contador);
    this.valueContador = this.getCounter(contador);
  }

  public getCounter(contador: IContador) {
    return contador.amount;
  }

  //* un método privado debe ser llamado por un método accesor
  public onClearCounter(): void {
    if(this.valueContador > 0 || this.valueContador < 0) {
      this.clearCounter();
    }
  }

  private clearCounter() {
    this.valueContador = 0;
  }

}
