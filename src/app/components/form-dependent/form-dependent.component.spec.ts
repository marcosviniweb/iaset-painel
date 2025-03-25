import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDependentComponent } from './form-dependent.component';

describe('FormDependentComponent', () => {
  let component: FormDependentComponent;
  let fixture: ComponentFixture<FormDependentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormDependentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDependentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
