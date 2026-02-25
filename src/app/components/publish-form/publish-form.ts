import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../services/notification';
import { PublishMessageRequest } from '../../models/notification.model';

@Component({
  selector: 'app-publish-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './publish-form.html',
  styleUrl: './publish-form.css'
})
export class PublishFormComponent {

  // Modelo de dados
  publishMode: 'exchange' | 'queue' = 'exchange';
  exchange: string = 'notification-exchange';
  routingKey: string = 'notification.email';
  queue: string = 'notification-queue';
  message: string = '';
  contentType: string = 'application/json';

  // Estados
  isLoading: boolean = false;
  showSuccess: boolean = false;
  showError: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';
  messageId: string = '';

  constructor(private notificationService: NotificationService) { }

  // ====================================================
  // Métodos - Publica a mensagem
  // ====================================================
  publishMessage(): void {
    if (!this.validateForm()) {
      return;
    }

    this.isLoading = true;
    this.showSuccess = false;
    this.showError = false;

    const request: PublishMessageRequest = {
      message: this.message,
      contentType: this.contentType
    };

    if (this.publishMode === 'exchange') {
      request.exchange = this.exchange;
      request.routingKey = this.routingKey;
    } else {
      request.queue = this.queue;
    }

    this.notificationService.publishMessage(request).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.status === 'SUCCESS') {
          this.showSuccessMessage(response);
          this.resetForm();
        } else {
          this.showErrorMessage(response.message);
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.showErrorMessage(error.message);
      }
    });
  }

  // ====================================================
  // Métodos - Valida o formulário
  // ====================================================
  private validateForm(): boolean {
    if (!this.message.trim()) {
      this.showErrorMessage('Mensagem não pode estar vazia');
      return false;
    }

    if (this.publishMode === 'exchange' && !this.exchange.trim()) {
      this.showErrorMessage('Exchange não pode estar vazio');
      return false;
    }

    if (this.publishMode === 'queue' && !this.queue.trim()) {
      this.showErrorMessage('Queue não pode estar vazio');
      return false;
    }

    return true;
  }

  // ====================================================
  // Métodos - Exibe mensagem de sucesso
  // ====================================================
  private showSuccessMessage(response: any): void {
    this.successMessage = `Mensagem publicada com sucesso! ID: ${response.messageId}`;
    this.messageId = response.messageId;
    this.showSuccess = true;
    this.hideMessagesAfterDelay();
  }

  // ====================================================
  // Métodos - Exibe mensagem de erro
  // ====================================================
  private showErrorMessage(message: string): void {
    this.errorMessage = message;
    this.showError = true;
    this.hideMessagesAfterDelay();
  }

  // ====================================================
  // Métodos - Oculta mensagens após delay
  // ====================================================
  private hideMessagesAfterDelay(): void {
    setTimeout(() => {
      this.showSuccess = false;
      this.showError = false;
    }, 5000);
  }

  // ====================================================
  // Métodos - Limpa o formulário
  // ====================================================
  public resetForm(): void {
    this.message = '';
    this.exchange = 'notification-exchange';
    this.routingKey = 'notification.email';
    this.queue = 'notification-queue';
  }

  // ====================================================
  // Métodos - Copia o ID da mensagem
  // ====================================================
  copyMessageId(): void {
    navigator.clipboard.writeText(this.messageId).then(() => {
      alert('ID copiado para clipboard!');
    });
  }
}