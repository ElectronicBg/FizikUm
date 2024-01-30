import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthorizeService } from 'D:/FizikUm/FizikUm/FizikUm/ClientApp/src/api-authorization/authorize.service';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css']
})
export class ClassroomComponent implements OnInit {
  classrooms: Classroom[] = [];
  subjects = Subject;
  subjectOptions: number[] = Object.values(Subject).filter(value => !isNaN(Number(value))) as number[];
  newClassroom: Classroom = { id: 0, name: '', teacher: null, subject: Subject.Physics, resources: [] };
  selectedClassroom: Classroom | null = null;
  selectedClassroomResources: Resource[] = [];
  successMessage: string = '';
  currentView: string = 'index';


  constructor(private http: HttpClient, private authService: AuthorizeService ) { }

  ngOnInit(): void {
    this.getClassrooms();
  }

  showView(view: string, classroom?: Classroom) {
    this.currentView = view;

    if (view === 'index') {
      this.getClassrooms();
    }

    if (view === 'edit' && classroom) {
      this.selectedClassroom = { ...classroom };
    }
  }

  private apiUrl = 'https://localhost:7175/Classroom/api/';

  getClassrooms() {
    this.http.get<Classroom[]>(`${this.apiUrl}GetClassroom`)
      .subscribe(data => this.classrooms = data);
  }

  getClassroom(id: number) {
    this.http.get<Classroom>(`${this.apiUrl}GetClassroom/${id}`)
      .subscribe(data => console.log(data));
  }

  addClassroom() {
    const userSubscription = this.authService.getUser().subscribe(
      user => {
        // Unsubscribe to avoid multiple subscriptions
        userSubscription.unsubscribe();

        this.newClassroom.teacher = user?.name ?? null;
        this.newClassroom.subject = Number(this.newClassroom.subject);

        this.http.post<Classroom>(`${this.apiUrl}PostClassroom`, this.newClassroom).subscribe(
          data => {
            this.classrooms.push(data);
            this.newClassroom = { id: 0, name: '', subject: Subject.Physics, teacher: null, resources: [] };
            this.successMessage = 'Classroom added successfully!';
          },
          error => {
            console.error('Error adding classroom:', error);
          }
        );
      },
      error => {
        console.error('Error fetching user:', error);
      }
    );
  }

  updateClassroom(id: number, classroom: Classroom) {

    classroom.subject = Number(classroom.subject);

    this.http.put(`${this.apiUrl}PutClassroom/${id}`, classroom)
      .subscribe(() => {
        this.successMessage = 'Classroom updated successfully!';
      });
  }

  deleteClassroom(id: number) {
    this.http.delete(`${this.apiUrl}DeleteClassroom/${id}`)
      .subscribe(() => {
        this.classrooms = this.classrooms.filter(c => c.id !== id);
        this.successMessage = 'Classroom deleted successfully!';
      });
  }

  showResources(classroomId: number) {
    // Fetch classroom information
    this.http.get<Classroom>(`${this.apiUrl}GetClassroom/${classroomId}`)
      .subscribe(classroom => {
        this.selectedClassroom = classroom;

        // Fetch resources for the classroom
        this.http.get<Resource[]>(`https://localhost:7175/Resource/api/GetResourcesForClassroom/${classroomId}`)
          .subscribe(data => {
            console.log("Received Resources:", data);
            this.selectedClassroomResources = data;
            this.showView('resources');
          });
      });
  }

}

enum Subject {
  Physics = 0,
  Biology = 1,
  Chemistry = 2,
}
interface Classroom {
  id: number;
  name: string;
  subject: Subject;
  teacher: string | null;
  resources: Resource[];
}

interface Resource {
  id: number;
  name: string;
  description: string;
  code: string;
  classroomId: number;
  classroom: Classroom;
  createdBy: string | null;
}


