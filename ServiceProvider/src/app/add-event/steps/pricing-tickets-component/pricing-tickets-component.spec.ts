import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingTicketsComponent } from './pricing-tickets-component';

describe('PricingTicketsComponent', () => {
  let component: PricingTicketsComponent;
  let fixture: ComponentFixture<PricingTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PricingTicketsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PricingTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
