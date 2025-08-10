import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignNotificationsComponent } from './campaign-notifications.component';

describe('CampaignNotificationsComponent', () => {
  let component: CampaignNotificationsComponent;
  let fixture: ComponentFixture<CampaignNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignNotificationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
