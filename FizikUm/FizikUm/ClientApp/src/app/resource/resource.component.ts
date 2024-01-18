import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Define the Resource interface
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

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html'
})
export class ResourceComponent {
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

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.loadResources();
  }

  loadResources() {
    this.http.get<Resource[]>(this.baseUrl + 'resource').subscribe(result => {
      this.resources = result;
    }, error => console.error(error));
  }

  createResource() {
    this.http.post<Resource>(this.baseUrl + 'resource', this.newResource).subscribe(result => {
      this.resources.push(result);
      this.newResource = {
        resourceId: 0,
        name: '',
        description: '',
        subjectCategory: { subjectCategoryId: 0, name: '' }, // Provide default values
        classroomId: 0,
        classroom: { classroomId: 0, subjectCategoryId: 0, subjectCategory: { subjectCategoryId: 0, name: '' }, resources: [] }, // Provide default values
        code: ''
      };
    }, error => console.error(error));
  }


  updateResource(resource: Resource) {
    this.http.put(this.baseUrl + 'resource/' + resource.resourceId, resource).subscribe(() => {
      // Optional: Handle success, e.g., show a message
    }, error => console.error(error));
  }

  deleteResource(resource: Resource) {
    this.http.delete(this.baseUrl + 'resource/' + resource.resourceId).subscribe(() => {
      this.resources = this.resources.filter(r => r !== resource);
    }, error => console.error(error));
  }
}
