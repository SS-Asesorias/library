import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookFieldsComponent } from './book-fields.component';

describe('BookFieldsComponent', () => {
  let component: BookFieldsComponent;
  let fixture: ComponentFixture<BookFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookFieldsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
