import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoTipoTramiteComponent } from './nuevo-tipo-tramite.component';

describe('NuevoTipoTramiteComponent', () => {
  let component: NuevoTipoTramiteComponent;
  let fixture: ComponentFixture<NuevoTipoTramiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoTipoTramiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoTipoTramiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
