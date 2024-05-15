import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListOrderPage } from './list-order.page';

describe('ListOrderPage', () => {
  let component: ListOrderPage;
  let fixture: ComponentFixture<ListOrderPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
