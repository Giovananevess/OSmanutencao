import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileUsersPage } from './profile-users.page';

describe('ProfileUsersPage', () => {
  let component: ProfileUsersPage;
  let fixture: ComponentFixture<ProfileUsersPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProfileUsersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
