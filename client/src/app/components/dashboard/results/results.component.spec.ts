import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsComponent } from './results.component';
import { PollsService } from '../../../services/pollsServices/polls.service';
import { AuthService } from '../../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { PollsSocketService } from '../../../services/sockets/polls-socket.service';
import { FlashMessagesModule } from 'angular2-flash-messages/module/module';
import { HttpModule } from '@angular/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
describe('ResultsComponent', () => {
  let component: ResultsComponent;
  let fixture: ComponentFixture<ResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResultsComponent],
      providers: [PollsService, AuthService, PollsSocketService, PollsService, FlashMessagesService, Router],
      imports: [HttpModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  // uncomment this part and run npm test
  /*
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  */

});
