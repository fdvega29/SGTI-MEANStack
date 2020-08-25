import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoAreaComponent } from './nuevo-area.component';

describe('NuevoAreaComponent', () => {
  let component: NuevoAreaComponent;
  let fixture: ComponentFixture<NuevoAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
