import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsCounter } from './products-counter';

describe('ProductsCounter', () => {
  let component: ProductsCounter;
  let fixture: ComponentFixture<ProductsCounter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsCounter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsCounter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
