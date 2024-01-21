import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent implements OnInit {
  public resources: Resource[] = [];
  public newResource: Resource = {
    resourceId: 0,
    name: '',
    description: '',
    subjectCategory: { subjectCategoryId: 0, name: '' },
    classroomId: 0,
    classroom: { classroomId: 0, subjectCategoryId: 0, subjectCategory: { subjectCategoryId: 0, name: '' }, resources: [] },
    code: ''
  };
  currentView: string = 'index';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getResources();
  }

  showView(view: string, resource?: Resource) {
    // No direct equivalent action for showView in this context.
  }

  private apiUrl = 'http://localhost:5297/Resource/api/';

  getResources() {
    this.http.get<Resource[]>(`${this.apiUrl}GetResource`).subscribe(
      result => this.resources = result); 
  }

  addResource() {
    this.http.post<Resource>(`${this.apiUrl}PostResource`, this.newResource).subscribe(
      result => {
        this.resources.push(result);
        this.resetNewResource();
      },
      error => console.error(error)
    );
  }

  updateResource(id: number, resource: Resource) {
    this.http.put(`${this.apiUrl}PutResource/${id}`, resource).subscribe(
      () => {
        // Optional: Handle success, e.g., show a message
      },
      error => console.error(error)
    );
  }

  deleteResource(id: number) {
    this.http.delete(`${this.apiUrl}DeleteResource/${id}`).subscribe(
      () => {
        this.resources = this.resources.filter(r => r.resourceId !== id);
      },
      error => console.error(error)
    );
  }

  private resetNewResource() {
    this.newResource = {
      resourceId: 0,
      name: '',
      description: '',
      subjectCategory: { subjectCategoryId: 0, name: '' },
      classroomId: 0,
      classroom: { classroomId: 0, subjectCategoryId: 0, subjectCategory: { subjectCategoryId: 0, name: '' }, resources: [] },
      code: ''
    };
  }
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

interface SubjectCategory {
  subjectCategoryId: number;
  name: string;
}

interface Classroom {
  classroomId: number;
  subjectCategoryId: number;
  subjectCategory: SubjectCategory;
  resources: Resource[];
}
