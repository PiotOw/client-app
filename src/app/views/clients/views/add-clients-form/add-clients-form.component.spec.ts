import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddClientsFormComponent} from './add-clients-form.component';

describe('AddClientsFormComponent', () => {
  let component: AddClientsFormComponent;
  let fixture: ComponentFixture<AddClientsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddClientsFormComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClientsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
