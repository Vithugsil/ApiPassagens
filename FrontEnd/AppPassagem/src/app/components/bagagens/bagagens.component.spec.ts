import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BagagensComponent } from './bagagens.component';

describe('BagagensComponent', () => {
  let component: BagagensComponent;
  let fixture: ComponentFixture<BagagensComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BagagensComponent]
    });
    fixture = TestBed.createComponent(BagagensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
