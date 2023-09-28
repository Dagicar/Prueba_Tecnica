import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { LoginDto } from '../../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private module: string = 'services/auth/'

  constructor(private apiService: ApiService) { }

  async login(body: LoginDto): Promise<{
    accessToken: string
    tokenType: string
  }> {
    return await this.apiService.post<any, LoginDto>(this.module + 'signin', body);
  }

}
