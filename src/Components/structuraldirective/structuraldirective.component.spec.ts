import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructuraldirectiveComponent } from './structuraldirective.component';

describe('StructuraldirectiveComponent', () => {
  let component: StructuraldirectiveComponent;
  let fixture: ComponentFixture<StructuraldirectiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StructuraldirectiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StructuraldirectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
