import { ComponentFixture, TestBed } from '@angular/core/testing'; 

import { CompanhiasAereasComponent } from './companhias-aereas.component';

describe('CompanhiasAereasComponent', () => {
  let component: CompanhiasAereasComponent;
  let fixture: ComponentFixture<CompanhiasAereasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanhiasAereasComponent]
    });
    fixture = TestBed.createComponent(CompanhiasAereasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
