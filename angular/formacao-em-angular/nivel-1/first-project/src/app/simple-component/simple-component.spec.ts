import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleComponent } from './simple-component';

describe('SimpleComponent', () => {
  let component: SimpleComponent;
  let fixture: ComponentFixture<SimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
