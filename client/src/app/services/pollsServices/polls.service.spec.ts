import { TestBed, inject } from '@angular/core/testing';
import { PollsService } from './polls.service';
import { HttpModule } from '@angular/http';
import { Http, Headers, RequestOptions } from '@angular/http';
describe('PollsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PollsService],
      imports: [HttpModule]
    });
  });

  it('should be created', inject([PollsService, Http], (pollsService, http) => {
    expect(pollsService).toBeTruthy();
  }));
  it('should be defined', inject([PollsService, Http], (pollsService, http) => {
    expect(pollsService).toBeDefined();
  }));
  it('Should load Access Token', inject([PollsService, Http], (pollsService, http) => {
    expect(pollsService.loadToken()).toBe(undefined);
  }));
  it('Should load Polls Objects', inject([PollsService, Http], (pollsService, http) => {
    expect(pollsService.getAllPolls().length).toBe(undefined);
  }));

});