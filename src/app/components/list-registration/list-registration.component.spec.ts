import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRegistrationComponent } from './list-registration.component';

describe('ListRegistrationComponent', () => {
  let component: ListRegistrationComponent;
  let fixture: ComponentFixture<ListRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListRegistrationComponent]
    });
    fixture = TestBed.createComponent(ListRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
