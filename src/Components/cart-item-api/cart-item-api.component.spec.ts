import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItemAPIComponent } from './cart-item-api.component';

describe('CartItemAPIComponent', () => {
  let component: CartItemAPIComponent;
  let fixture: ComponentFixture<CartItemAPIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartItemAPIComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartItemAPIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
