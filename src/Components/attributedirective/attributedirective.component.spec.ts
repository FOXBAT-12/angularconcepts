import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributedirectiveComponent } from './attributedirective.component';

describe('AttributedirectiveComponent', () => {
  let component: AttributedirectiveComponent;
  let fixture: ComponentFixture<AttributedirectiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttributedirectiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttributedirectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
