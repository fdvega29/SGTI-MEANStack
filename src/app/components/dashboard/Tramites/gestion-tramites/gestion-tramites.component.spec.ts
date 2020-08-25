import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionTramitesComponent } from './gestion-tramites.component';

describe('GestionTramitesComponent', () => {
  let component: GestionTramitesComponent;
  let fixture: ComponentFixture<GestionTramitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionTramitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionTramitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
