import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsinfoComponent } from './roomsinfo.component';

describe('RoomsinfoComponent', () => {
  let component: RoomsinfoComponent;
  let fixture: ComponentFixture<RoomsinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomsinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomsinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
