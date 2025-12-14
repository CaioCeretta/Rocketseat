import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveButton } from './active-button';

describe('ActiveButton', () => {
  let component: ActiveButton;
  let fixture: ComponentFixture<ActiveButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
