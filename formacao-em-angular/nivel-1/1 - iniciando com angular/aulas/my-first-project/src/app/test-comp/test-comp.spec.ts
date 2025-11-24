import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestComp } from './test-comp';

describe('TestComp', () => {
  let component: TestComp;
  let fixture: ComponentFixture<TestComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
