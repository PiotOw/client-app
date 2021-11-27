import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ClientsDashboardComponent} from './clients-dashboard.component';

describe('ClientsDashboardComponent', () => {
  let component: ClientsDashboardComponent;
  let fixture: ComponentFixture<ClientsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientsDashboardComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
