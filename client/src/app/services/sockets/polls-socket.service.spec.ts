import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { PollsSocketService } from './polls-socket.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Socket } from 'ng-socket-io';

describe('PollsSocketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PollsSocketService, Socket],
      imports: [HttpModule]
    });
  });
  // uncomment this part and run npm test
/*
  it('should be created', inject([PollsSocketService, Http, Socket], (service: PollsSocketService, http: Http, socket: Socket) => {
    expect(service).toBeTruthy();
  }));
  */
});
