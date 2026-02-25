import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent implements OnInit {

  serviceStatus: string = 'CHECKING';
  statusMessage: string = 'Verificando conexão...';

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.checkServiceHealth();
    // Verificar saúde a cada 30 segundos
    setInterval(() => this.checkServiceHealth(), 30000);
  }

  // ====================================================
  // Métodos - Verifica saúde do serviço
  // ====================================================
  checkServiceHealth(): void {
    this.notificationService.healthCheck().subscribe({
      next: (response) => {
        this.serviceStatus = response.status;
        this.statusMessage = response.message;
      },
      error: () => {
        this.serviceStatus = 'DOWN';
        this.statusMessage = 'Serviço indisponível';
      }
    });
  }

  // ====================================================
  // Métodos - Retorna classe CSS do status
  // ====================================================
  getStatusClass(): string {
    return this.serviceStatus === 'UP' ? 'badge bg-success' : 'badge bg-danger';
  }
}