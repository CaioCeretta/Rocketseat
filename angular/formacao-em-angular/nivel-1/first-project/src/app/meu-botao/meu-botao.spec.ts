import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeuBotao } from './meu-botao';

describe('MeuBotao', () => {
  let component: MeuBotao;
  let fixture: ComponentFixture<MeuBotao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeuBotao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeuBotao);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
