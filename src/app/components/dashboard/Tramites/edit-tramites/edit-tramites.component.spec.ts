import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTramitesComponent } from './edit-tramites.component';

describe('EditTramitesComponent', () => {
  let component: EditTramitesComponent;
  let fixture: ComponentFixture<EditTramitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTramitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTramitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
