import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditoriaPagosComponent } from './auditoria-pagos.component';

describe('AuditoriaPagosComponent', () => {
  let component: AuditoriaPagosComponent;
  let fixture: ComponentFixture<AuditoriaPagosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditoriaPagosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditoriaPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
