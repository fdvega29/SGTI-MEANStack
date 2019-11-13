import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { UsersService } from 'src/app/services/users.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', inject ([UsersService], (service: UsersService) => {
    expect(component).toBeTruthy();
  }));
});
