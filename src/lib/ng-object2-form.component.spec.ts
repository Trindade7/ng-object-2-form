import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgObject2FormComponent } from './ng-object2-form.component';

describe('NgObject2FormComponent', () => {
  let component: NgObject2FormComponent;
  let fixture: ComponentFixture<NgObject2FormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgObject2FormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgObject2FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
