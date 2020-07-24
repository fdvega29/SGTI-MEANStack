import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiaAdministradorComponent } from './guia-administrador.component';

describe('GuiaAdministradorComponent', () => {
  let component: GuiaAdministradorComponent;
  let fixture: ComponentFixture<GuiaAdministradorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuiaAdministradorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuiaAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
