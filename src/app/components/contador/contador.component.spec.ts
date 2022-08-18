//* Todos nuestros tests van a estar contenidos dentro del "describe"

import { ComponentFixture, TestBed } from "@angular/core/testing";
import { IContador } from "src/app/interfaces/IContador";
import { ServiceContador } from 'src/app/services/service-contador.service';
import { ContadorComponent } from './contador.component';

//* Se suele poner un nombre descriptivo
describe('ContadorComponent', () => {
  let service: ServiceContador;
  let component: ContadorComponent;
  let fixture: ComponentFixture<ContadorComponent>;
  //* fixture es una variable que nos va permitir extraer el servicio y componente, ademas tambien nos permite instanciar el componente

  //* El evento beforeEach se va llamar justo antes que se ejecute cada test
  beforeEach( async () => {
    await TestBed.configureTestingModule({
      declarations: [ContadorComponent], //* en declarations va el componente que estamos usando para los tests
      providers: [ServiceContador] // * El Servicio que utiliza el componente
    }).compileComponents();
  
  });
  beforeEach( () => {
    //* extrae el componente del testbed
    fixture = TestBed.createComponent(ContadorComponent);
    //* instanciar el componente
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = fixture.debugElement.injector.get(ServiceContador);
  });

  it('comprobar si el componente se crea correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('Incrementa el contador correctamente?', () => {
    let contador: IContador = {
      cuenta: 'Corriente',
      amount: 0
    };

    //* Nuestras Espias */
    const spy1 = spyOn(service, 'updateContador').and.callFake( () => null as any);
    const spy2 = spyOn(component, 'getCounter').and.callFake( () => null as any);

    const action = 'plus';
    expect(contador.amount).toBe(0);
    component.actionNumberChange(action, contador);
    expect(contador.amount === 1).toBeTrue();
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
    expect(contador.amount).toBeGreaterThan(0);
  });

  it('Decrementa el contador correctamente?', () => {
    let contador: IContador = {
      cuenta: 'Corriente',
      amount: 0
    };

    //* Nuestras Espias */
    const spy1 = spyOn(service, 'updateContador').and.callFake( () => null as any);
    const spy2 = spyOn(component, 'getCounter').and.callFake( () => null as any);

    const action = 'minus';
    expect(contador.amount).toBe(0);
    console.log('Valor del amount before: ' + contador.amount);
    component.actionNumberChange(action, contador);
    console.log('Valor del amount after: ' + contador.amount);
    expect(contador.amount === -1).toBeTrue();
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  it('onClearCounter trabaja  de manera correcta', () => {

    //* Queremos espiar un método privado
    const spy1 = spyOn((component as any ), 'clearCounter').and.callThrough();

    let contador: IContador = {
      cuenta: 'Corriente',
      amount: 100,
    };

    component.valueContador = contador.amount;
    component.onClearCounter();

    expect(component.valueContador === 0).toBeTruthy();
    expect(spy1).toHaveBeenCalled(); //* probar si se llamado al método privado
  });


}); 