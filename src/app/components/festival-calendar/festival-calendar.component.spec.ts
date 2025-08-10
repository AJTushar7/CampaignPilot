import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FestivalCalendarComponent } from './festival-calendar.component';

describe('FestivalCalendarComponent', () => {
  let component: FestivalCalendarComponent;
  let fixture: ComponentFixture<FestivalCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FestivalCalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FestivalCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
