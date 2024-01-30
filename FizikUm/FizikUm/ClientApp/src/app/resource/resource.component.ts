import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthorizeService } from 'D:/FizikUm/FizikUm/FizikUm/ClientApp/src/api-authorization/authorize.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent implements OnInit {
  public resources: Resource[] = [];
  public classrooms: Classroom[] = [];
  public newResource: Resource = this.getEmptyResource();

  // Add the selectedResource property
  public selectedResource: Resource | null = null;

  currentView: string = 'index';

  constructor(private http: HttpClient, private authService: AuthorizeService) { }

  ngOnInit(): void {
    this.getResources();
    this.getClassrooms();
  }

  getClassrooms() {
    // Fetch the list of existing classrooms from your API
    this.http.get<Classroom[]>(`https://localhost:7175/Classroom/api/GetClassroom`).subscribe(
      result => this.classrooms = result,
      error => console.error('Error fetching classrooms:', error)
    );
  }

  showView(view: string, resource?: Resource) {
    this.currentView = view;

    if (view === 'index') {
      this.getResources();
    }

    if (view === 'edit' && resource) {
      this.selectedResource = { ...resource };
    }
  }

  private apiUrl = 'https://localhost:7175/Resource/api/';

  getResources() {
    this.http.get<Resource[]>(`${this.apiUrl}GetResources`).subscribe(
      result => this.resources = result,
      error => console.error('Error fetching resources:', error)
    );
  }

  addResource() {
    this.authService.getUser().pipe(take(1)).subscribe(
      user => {
        this.newResource.createdBy = user?.name ?? null;
       
        const selectedClassroomId = this.newResource.selectedClassroomId;

        // Find the selected classroom based on selectedClassroomId
        const selectedClassroom = this.classrooms.find(c => c.id === selectedClassroomId);

        if (selectedClassroom) {
          // Set the classroomId to the selected classroom's id
          this.newResource.classroomId = selectedClassroom.id;
          console.log('Selected Classroom ID:', this.newResource.selectedClassroomId);

          this.http.post<Resource>(`${this.apiUrl}PostResource`, this.newResource).subscribe(
            result => {
              result.classroomId = selectedClassroom.id;
              this.resources.push(result);
              this.resetNewResource();
            },
            error => console.error('Error adding resource:', error)
          );
        } else {
          console.error('Selected classroom not found');
        }
      },
      error => console.error('Error fetching user:', error)
    );
  }

  updateResource(id: number, Resource: Resource) {
    this.http.put(`${this.apiUrl}PutResource/${id}`, Resource).subscribe(
      () => {
      },
      error => console.error('Error updating resource:', error)
    );
  }

  deleteResource(id: number | undefined) {
    if (id === undefined) {   
      return;
    }

    this.http.delete(`${this.apiUrl}DeleteResource/${id}`).subscribe(
      () => {
        this.resources = this.resources.filter(r => r.id !== id);
      },
      error => console.error('Error deleting resource:', error)
    );
  }

  private resetNewResource() {
    this.newResource = this.getEmptyResource();
  }

  private getEmptyResource(): Resource {
    return {
      id: 0,
      name: '',
      description: '',
      classroomId: 0,
      code: '',
      createdBy: ''
    };
  }
}

interface Resource {
  id: number;
  name: string;
  description: string;
  code: string;
  classroomId: number;
  createdBy: string | null;
  selectedClassroomId?: number;
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
