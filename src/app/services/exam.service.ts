import {computed, Injectable, signal} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Exam, ExamResponse} from '../models/exam.model';
import {Observable, tap} from 'rxjs';
import { API_URL } from '../constants/api.constants';
@Injectable({
  providedIn: 'root'
})
export class ExamService {
  // Signal qui contient les examens
  exams = signal<Exam[]>([]);
  // Computed qui calcule les totaux automatiquement
  totalByStatus = computed(() => {
    const totals: Record<string, number> = {};
    for (const exam of this.exams()) {
      totals[exam.status] = (totals[exam.status] || 0) + 1;
    }
    return totals;
  });
  totalItems = signal(0);
  constructor(private http: HttpClient) { }
  /** Charger tous les examens depuis l'API */
  loadExams() {
    this.http.get<ExamResponse>(`${API_URL}/exams` )
      .pipe(
        tap((data) => {
          this.exams.set(data.member ?? []); // on alimente le signal
          this.totalItems.set(data.totalItems ?? 0);
        })
      )
      .subscribe();
  }


  createExam(exam: Exam): Observable<Exam> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/ld+json'
    });
    return this.http.post<Exam>(`${API_URL}/exams`, exam, { headers });
  }
}
