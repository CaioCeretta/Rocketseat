import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoFlat } from './botao-flat';

describe('BotaoFlat', () => {
  let component: BotaoFlat;
  let fixture: ComponentFixture<BotaoFlat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotaoFlat]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotaoFlat);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
