import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoTramiteComponent } from './tipo-tramite.component';

describe('TipoTramiteComponent', () => {
  let component: TipoTramiteComponent;
  let fixture: ComponentFixture<TipoTramiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoTramiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoTramiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
