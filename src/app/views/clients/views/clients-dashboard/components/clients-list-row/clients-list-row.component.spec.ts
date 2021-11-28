import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsListRowComponent } from './clients-list-row.component';

describe('ClientsListRowComponent', () => {
  let component: ClientsListRowComponent;
  let fixture: ComponentFixture<ClientsListRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientsListRowComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsListRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
