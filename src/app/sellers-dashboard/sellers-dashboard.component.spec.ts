import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellersDashboardComponent } from './sellers-dashboard.component';

describe('SellersDashboardComponent', () => {
  let component: SellersDashboardComponent;
  let fixture: ComponentFixture<SellersDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellersDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellersDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
