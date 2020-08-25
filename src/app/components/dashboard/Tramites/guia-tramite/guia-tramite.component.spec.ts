import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiaTramiteComponent } from './guia-tramite.component';

describe('GuiaTramiteComponent', () => {
  let component: GuiaTramiteComponent;
  let fixture: ComponentFixture<GuiaTramiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuiaTramiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuiaTramiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
