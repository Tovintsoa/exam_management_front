import {Component, Output} from '@angular/core';
import {Exam} from '../../models/exam.model';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {HeaderComponent} from '../common/header/header.component'
import {Router} from '@angular/router';
import {ExamService} from '../../services/exam.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-exam',
  standalone: true,
  imports: [
    HeaderComponent,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.css'
})
export class ExamComponent {
  examForm: FormGroup;
  backendError: string | null = null;
  constructor(private fb: FormBuilder, private router: Router, private examService: ExamService) {
    this.examForm = this.fb.group({
      studentName: ['', Validators.required],
      location: [''],
      date: ['', Validators.required],
      time: ['', Validators.required],
      status: ['À organiser', Validators.required]
    });
  }

  submit() {
    if (!this.examForm.valid) {
      // Marquer tous les champs comme touchés pour déclencher les messages d'erreur
      this.examForm.markAllAsTouched();
      return;
    }
    if (this.examForm.valid) {
      const formValue = this.examForm.value;
      const datetime = `${formValue.date} ${formValue.time}:00`; // ex: "2025-09-21 21:06:00"
      const newExam: Exam = {
        id: Date.now(), // temporaire
        studentName: formValue.studentName,
        location: formValue.location,
        date: datetime,       // datetime complet pour la base
        time: datetime,
        status: formValue.status
      };


      this.examForm.reset({ status: 'En attente' });
      this.examService.createExam(newExam).subscribe({
        next: (res) => {
          console.log('Examen créé:', res);
          this.router.navigate(['/dashboard']); // Retour au dashboard
        },
        error: (err) => {
          console.error('Erreur création examen:', err);
          alert('Erreur lors de la création de l’examen.');
        }
      });

    }
  }
  goBack() {
    this.router.navigate(['/dashboard']).then(r => console.log(r)); // Redirige vers le dashboard
  }
}
