import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestProductComponent } from './best-product.component';

describe('BestProductComponent', () => {
  let component: BestProductComponent;
  let fixture: ComponentFixture<BestProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BestProductComponent]
    });
    fixture = TestBed.createComponent(BestProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
