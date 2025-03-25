import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDependentesComponent } from './lista-dependentes.component';

describe('ListaDependentesComponent', () => {
  let component: ListaDependentesComponent;
  let fixture: ComponentFixture<ListaDependentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaDependentesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaDependentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
