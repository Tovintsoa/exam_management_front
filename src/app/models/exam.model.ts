export interface Exam {
  id: number;
  studentName: string;
  location: string;
  date: string;
  status: string;
  time: string;
}

export interface ExamResponse {
  totalItems: number;
  member: Exam[];
  page: number;
  itemsPerPage: number;
}
