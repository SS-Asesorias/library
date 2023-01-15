import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorFieldsComponent } from './author-fields.component';

describe('AuthorFieldsComponent', () => {
  let component: AuthorFieldsComponent;
  let fixture: ComponentFixture<AuthorFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorFieldsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
