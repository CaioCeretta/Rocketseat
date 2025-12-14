import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicText } from './dynamic-text';

describe('DynamicText', () => {
  let component: DynamicText;
  let fixture: ComponentFixture<DynamicText>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicText]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicText);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
