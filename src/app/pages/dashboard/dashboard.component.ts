import {Component, OnInit, computed, effect, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from '../common/header/header.component'
import { Router } from '@angular/router';
import { ExamService } from '../../services/exam.service';
import { Exam } from '../../models/exam.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  exams = signal<Exam[]>([]);
  nombreExam;
  totalByStatus;

  statusMap: Record<string, { textColor: string; borderColor: string; label: string }> = {
    'Confirmé': { textColor: 'text-green-600', borderColor: 'border-green-200', label: 'Confirmé' },
    'À organiser': { textColor: 'text-orange-600', borderColor: 'border-orange-200', label: 'À organiser' },
    'Annulé': { textColor: 'text-red-600', borderColor: 'border-red-200', label: 'Annulé' },
    'En recherche de place': { textColor: 'text-gray-600', borderColor: 'border-gray-200', label: 'En recherche de place' }
  };

  constructor(private examService: ExamService, private router: Router) {
    this.exams = this.examService.exams;
    this.nombreExam = computed(() => this.exams().length);
    this.totalByStatus = this.examService.totalByStatus;
    effect(() => {
      console.log('Total by status:', this.totalByStatus());
    });
  }

  ngOnInit() {
    this.examService.loadExams();
  }

  goToCreateExam() {
    this.router.navigate(['/add-exam']).then(r => console.log(r));
  }
}
