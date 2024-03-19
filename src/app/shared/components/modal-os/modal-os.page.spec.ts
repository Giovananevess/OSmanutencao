import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalOsPage } from './modal-os.page';

describe('ModalOsPage', () => {
  let component: ModalOsPage;
  let fixture: ComponentFixture<ModalOsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalOsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
