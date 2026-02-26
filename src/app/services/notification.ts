import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, map } from 'rxjs';
import { environment } from '../environments/environment';
import { PublishMessageRequest, PublishMessageResponse, HealthCheckResponse, MessageItem, PageResponse } from '../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // ====================================================
  // Métodos - Publica mensagem no backend
  // ====================================================
  publishMessage(request: PublishMessageRequest): Observable<PublishMessageResponse> {
    return this.http.post<PublishMessageResponse>(
      `${this.apiUrl}/notifications/publish`,
      request
    ).pipe(
      catchError(this.handleError)
    );
  }

  // ====================================================
  // Métodos - Recupera mensagens recentes
  // ====================================================
  getRecentMessages(): Observable<MessageItem[]> {
    return this.http.get<PageResponse<MessageItem>>(
      `${this.apiUrl}/notifications/recent`
    ).pipe(
      map(res => res.content),
      catchError(this.handleError)
    );
  }

  // ====================================================
  // Métodos - Verifica saúde do serviço
  // ====================================================
  healthCheck(): Observable<HealthCheckResponse> {
    return this.http.get<HealthCheckResponse>(
      `${this.apiUrl}/notifications/health`
    ).pipe(
      catchError(this.handleError)
    );
  }

  // ====================================================
  // Métodos - Tratamento de erros
  // ====================================================
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Erro desconhecido';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      errorMessage = `Erro ${error.status}: ${error.error?.message || error.statusText}`;
    }
    
    return throwError(() => new Error(errorMessage));
  }
}