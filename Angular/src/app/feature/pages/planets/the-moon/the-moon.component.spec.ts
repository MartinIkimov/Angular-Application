import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheMoonComponent } from './the-moon.component';

describe('TheMoonComponent', () => {
  let component: TheMoonComponent;
  let fixture: ComponentFixture<TheMoonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheMoonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TheMoonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
