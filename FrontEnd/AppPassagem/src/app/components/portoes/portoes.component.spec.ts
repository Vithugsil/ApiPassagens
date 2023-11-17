import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortoesComponent } from './portoes.component';

describe('PortoesComponent', () => {
  let component: PortoesComponent;
  let fixture: ComponentFixture<PortoesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PortoesComponent]
    });
    fixture = TestBed.createComponent(PortoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
