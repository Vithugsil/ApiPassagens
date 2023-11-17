import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassagensComponent } from './passagens.component';

describe('PassagensComponent', () => {
  let component: PassagensComponent;
  let fixture: ComponentFixture<PassagensComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PassagensComponent]
    });
    fixture = TestBed.createComponent(PassagensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
