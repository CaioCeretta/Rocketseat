import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardConsumer } from './card-consumer';

describe('CardConsumer', () => {
  let component: CardConsumer;
  let fixture: ComponentFixture<CardConsumer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardConsumer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardConsumer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
