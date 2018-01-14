import { TestBed, inject } from '@angular/core/testing';

import { PollsService } from './polls.service';
import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http'; 
describe('PollsService', () => {
   beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PollsService],
      imports:[HttpClientModule, HttpModule]
    });
  });

  it('should be created', inject([PollsService, HttpClientModule, HttpModule], (service: PollsService) => {
    expect(service).toBeTruthy();
  }));

 /* it(`should be return result polls`, inject([PollsService, HttpClientModule, HttpModule], (service: PollsService) => {
    let polls = service.getAllPolls();
    expect(polls).toBeTruthy();
  }));
*/
});
