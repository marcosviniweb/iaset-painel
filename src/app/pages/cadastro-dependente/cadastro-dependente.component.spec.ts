import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroDependenteComponent } from './cadastro-dependente.component';

describe('CadastroDependenteComponent', () => {
  let component: CadastroDependenteComponent;
  let fixture: ComponentFixture<CadastroDependenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroDependenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroDependenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
