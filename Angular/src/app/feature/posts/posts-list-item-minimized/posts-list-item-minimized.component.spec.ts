import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsListItemMinimizedComponent } from './posts-list-item-minimized.component';

describe('PostsListItemMinimizedComponent', () => {
  let component: PostsListItemMinimizedComponent;
  let fixture: ComponentFixture<PostsListItemMinimizedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostsListItemMinimizedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsListItemMinimizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
