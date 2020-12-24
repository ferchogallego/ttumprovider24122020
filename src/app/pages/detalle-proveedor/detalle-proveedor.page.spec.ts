import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetalleProveedorPage } from './detalle-proveedor.page';

describe('DetalleProveedorPage', () => {
  let component: DetalleProveedorPage;
  let fixture: ComponentFixture<DetalleProveedorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleProveedorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleProveedorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
