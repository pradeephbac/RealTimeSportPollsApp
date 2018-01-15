import { TestBed, inject } from '@angular/core/testing';

import { PollsSocketService } from './polls-socket.service';

describe('PollsSocketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PollsSocketService]
    });
  });

  it('should be created', inject([PollsSocketService], (service: PollsSocketService) => {
    expect(service).toBeTruthy();
  }));
});
