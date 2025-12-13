import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquarePopup } from './square-popup';

describe('SquarePopup', () => {
  let component: SquarePopup;
  let fixture: ComponentFixture<SquarePopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SquarePopup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SquarePopup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
