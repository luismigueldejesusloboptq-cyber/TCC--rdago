import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcquireButtonComponent } from './acquire-button.component';

describe('AcquireButtonComponent', () => {
  let component: AcquireButtonComponent;
  let fixture: ComponentFixture<AcquireButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcquireButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcquireButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
