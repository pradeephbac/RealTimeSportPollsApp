import { TestBed, inject,  async,
  fakeAsync,
  ComponentFixture } from '@angular/core/testing';
  import 'zone.js/dist/proxy';
  import 'zone.js/dist/jasmine-patch';
import { PollsService } from './polls.service';
import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';

describe('PollsService', async() => {
   beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PollsService],
      imports:[HttpClientModule, HttpModule]
    });
  });

  it('should be created', inject([PollsService], (pollsService) => {
    expect(pollsService).toBeTruthy();
    expect(pollsService).toBeDefined();
  }));

  it('should be defined', inject([PollsService], (pollsService) => {
    expect(pollsService).toBeDefined();
  }));

  it('Should load Access Token', inject([PollsService], (pollsService) => {
    expect(pollsService.loadToken()).toBe(undefined);
  }));
  /*it('Should load Polls Objects', inject([PollsService, HttpClientModule, HttpModule],  (pollsService) => {
    expect(pollsService.getAllPolls().length).toBeGreaterThan(1);
  }));*/

});

 