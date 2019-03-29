import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetAddListComponent } from './tweet-add-list.component';

describe('TweetAddListComponent', () => {
  let component: TweetAddListComponent;
  let fixture: ComponentFixture<TweetAddListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TweetAddListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetAddListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
