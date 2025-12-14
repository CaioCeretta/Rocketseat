import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidInput } from './invalid-input';

describe('InvalidInput', () => {
  let component: InvalidInput;
  let fixture: ComponentFixture<InvalidInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvalidInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvalidInput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
