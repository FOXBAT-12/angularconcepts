import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwowaydatabindComponent } from './twowaydatabind.component';

describe('TwowaydatabindComponent', () => {
  let component: TwowaydatabindComponent;
  let fixture: ComponentFixture<TwowaydatabindComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TwowaydatabindComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwowaydatabindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
