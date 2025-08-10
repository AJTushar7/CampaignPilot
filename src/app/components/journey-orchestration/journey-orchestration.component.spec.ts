import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JourneyOrchestrationComponent } from './journey-orchestration.component';

describe('JourneyOrchestrationComponent', () => {
  let component: JourneyOrchestrationComponent;
  let fixture: ComponentFixture<JourneyOrchestrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JourneyOrchestrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JourneyOrchestrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
