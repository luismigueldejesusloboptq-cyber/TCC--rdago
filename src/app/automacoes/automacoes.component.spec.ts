import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomacoesComponent } from './automacoes.component';

describe('AutomacoesComponent', () => {
  let component: AutomacoesComponent;
  let fixture: ComponentFixture<AutomacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutomacoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutomacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
