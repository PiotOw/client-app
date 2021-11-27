import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ClientFormRowComponent} from './client-form-row.component';

describe('ClientFormRowComponent', () => {
  let component: ClientFormRowComponent;
  let fixture: ComponentFixture<ClientFormRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientFormRowComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientFormRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
