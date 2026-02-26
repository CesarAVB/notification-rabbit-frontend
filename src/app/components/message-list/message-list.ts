import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification';
import { MessageItem } from '../../models/notification.model';

@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-list.html',
  styleUrl: './message-list.css',
})
export class MessageList implements OnInit {
  messages: MessageItem[] = [];
  isLoading: boolean = false;
  error: string | null = null;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    this.isLoading = true;
    this.error = null;
    this.notificationService.getRecentMessages().subscribe({
      next: (res) => {
        this.messages = res || [];
        this.isLoading = false;
      },
      error: (err) => {
        this.error = err?.message || 'Erro ao carregar mensagens';
        this.isLoading = false;
      }
    });
  }

  getMessageIcon(msg: MessageItem): string {
    if (msg.exchange) {
      return 'fas fa-exchange-alt fa-lg';
    } else if (msg.queue) {
      return 'fas fa-list fa-lg';
    }
    return 'fas fa-envelope fa-lg';
  }

  getMessageIconClass(msg: MessageItem): string {
    if (msg.exchange) {
      return 'icon-exchange';
    } else if (msg.queue) {
      return 'icon-queue';
    }
    return 'icon-default';
  }

  getMessageTitle(msg: MessageItem): string {
    if (msg.exchange) {
      return `Exchange: ${msg.exchange}`;
    } else if (msg.queue) {
      return `Queue: ${msg.queue}`;
    }
    return 'Mensagem';
  }

  copyMessageContent(message: string): void {
    navigator.clipboard.writeText(message).then(() => {
      console.log('Conteúdo copiado para a área de transferência');
    }).catch(err => {
      console.error('Erro ao copiar:', err);
    });
  }
}
