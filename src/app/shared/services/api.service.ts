import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from '../../../environments/environment.development';

export interface ResponseApi<T> {
  success: boolean;
  info: T,
  message: string | null;
}

export interface ResponseSuccess<T> {
  info: T,
  message: string | null;
}
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  get<T>(url: string): Promise<T> {
    return new Promise((resolve, reject) => {
      this.http
        .get<ResponseApi<T>>(environment.apiUrl + url)
        .subscribe({
          next: ({ info, success, message }) => {
            if (!success)
              reject(message)
            resolve(info)
          },
          error: err => {
            reject(err)
          }
        });
    })
  }

  post<R, T>(url: string, data: T): Promise<R> {
    return new Promise((resolve, reject) => {
      this.http
        .post<R>(environment.apiUrl + url, data)
        .subscribe({
          next: (data) => {
            resolve(data)
          },
          error: err => {
            console.log({ err })
            reject(err)
          }
        });
    })
  }

  put<R, T>(url: string, data: T): Promise<ResponseSuccess<R>> {
    return new Promise((resolve, reject) => {
      this.http.put<ResponseApi<R>>(environment.apiUrl + url, data)
        .subscribe({
          next: ({ info, success, message }) => {
            if (!success) reject(message)
            resolve({ message, info })
          },
          error: err => {
            reject(err)
          }
        });
    });
  }

  delete<T>(url: string): Promise<ResponseSuccess<T>> {
    return new Promise((resolve, reject) => {
      this.http.delete<ResponseApi<T>>(environment.apiUrl + url)
        .subscribe({
          next: ({ info, success, message }) => {
            if (!success) reject(message)
            resolve({ message, info })
          },
          error: err => {
            reject(err)
          }
        });
    });
  }
}
