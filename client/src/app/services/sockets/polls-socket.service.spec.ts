import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { PollsSocketService } from './polls-socket.service';
import { Http, Headers, RequestOptions } from '@angular/http';
describe('PollsSocketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PollsSocketService],
      imports: [HttpModule]
    });
  });

  it('should be created', inject([PollsSocketService, Http], (service: PollsSocketService, http: Http) => {
    expect(service).toBeTruthy();
  }));
});
