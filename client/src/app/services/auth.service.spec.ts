import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpModule } from '@angular/http';
import { Http, Headers, RequestOptions } from '@angular/http';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
      imports: [HttpModule]
    });
  });

  it('should be created', inject([AuthService, Http], (service: AuthService, http) => {
    expect(service).toBeTruthy();
  }));
});
