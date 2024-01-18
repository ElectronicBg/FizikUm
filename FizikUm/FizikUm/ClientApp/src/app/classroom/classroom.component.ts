import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css']
})
export class ClassroomComponent implements OnInit {

  classrooms: Classroom[] = [];
  subjectCategories: SubjectCategory[] = [];
  newClassroom: Classroom = { classroomId: 0, name: '', subjectCategoryId: 0, subjectCategory: null, resources: [] };
  selectedClassroom: Classroom | null = null;
  successMessage: string = '';
  currentView: string = 'index';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getClassrooms();
    this.getSubjectCategories();
  }

  showView(view: string, classroom?: Classroom) {
    this.currentView = view;

    if (view === 'edit' && classroom) {
      this.selectedClassroom = { ...classroom };
    }
  }

  private apiUrl = 'https://localhost:7175/Classroom/api/';

  getSubjectCategories() {
    this.http.get<SubjectCategory[]>(`https://localhost:7175/SubjectCategory/api/GetSubjectCategory`)
      .subscribe(data => this.subjectCategories = data);
  }

  getClassrooms() {
    this.http.get<Classroom[]>(`${this.apiUrl}GetClassroom`)
      .subscribe(data => this.classrooms = data);
  }

  getClassroom(id: number) {
    this.http.get<Classroom>(`${this.apiUrl}GetClassroom/${id}`)
      .subscribe(data => console.log(data));
  }

  addClassroom() {
    this.http.post<Classroom>(`${this.apiUrl}PostClassroom`, this.newClassroom)
      .subscribe(
        data => {
          this.classrooms.push(data);
          this.newClassroom = { classroomId: 0, name: '', subjectCategoryId: 0, subjectCategory: null, resources: [] };
          this.successMessage = 'Classroom added successfully!';
        },
        error => {
          console.error('Error adding classroom:', error);
        }
      );
  }

  updateClassroom(id: number, classroom: Classroom) {
    this.http.put(`${this.apiUrl}PutClassroom/${id}`, classroom)
      .subscribe(() => {
        this.successMessage = 'Classroom updated successfully!';
      });
  }

  deleteClassroom(id: number) {
    this.http.delete(`${this.apiUrl}DeleteClassroom/${id}`)
      .subscribe(() => {
        this.classrooms = this.classrooms.filter(c => c.classroomId !== id);
        this.successMessage = 'Classroom deleted successfully!';
      });
  }

}

interface Classroom {
  classroomId: number;
  name: string;
  subjectCategoryId: number;
  subjectCategory: SubjectCategory | null;
  resources: Resource[] | null;
}

interface SubjectCategory {
  subjectCategoryId: number;
  name: string;
}

interface Resource {
  resourceId: number;
  name: string;
  description: string;
  subjectCategory: SubjectCategory;
  classroomId: number;
  classroom: Classroom;
  code: string;
}
