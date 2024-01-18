import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-subject-category',
  templateUrl: './subject-category.component.html',
  styleUrls: ['./subject-category.component.css']
})
export class SubjectCategoryComponent implements OnInit {

  subjectCategories: SubjectCategory[] = [];
  newSubjectCategory: SubjectCategory = { subjectCategoryId: 0, name: '' };
  successMessage: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getSubjectCategories();
  }

  private apiUrl = 'https://localhost:7175/SubjectCategory/api/';

  getSubjectCategories() {
    this.http.get<SubjectCategory[]>(`${this.apiUrl}GetSubjectCategory`)
      .subscribe(data => this.subjectCategories = data);
  }

  getSubjectCategory(id: number) {
    this.http.get<SubjectCategory>(`${this.apiUrl}GetSubjectCategory/${id}`)
      .subscribe(data => console.log(data));
  }

  addSubjectCategory() {
    this.http.post<SubjectCategory>(`${this.apiUrl}PostSubjectCategory`, this.newSubjectCategory)
      .subscribe(
        data => {
          this.subjectCategories.push(data);
          this.newSubjectCategory = { subjectCategoryId: 0, name: '' };
          this.successMessage = 'Subject category added successfully!';
        },
        error => {
          console.error('Error adding subject category:', error);
        }
      );
  }

  updateSubjectCategory(id: number, subjectCategory: SubjectCategory) {
    this.http.put(`${this.apiUrl}PutSubjectCategory/${id}`, subjectCategory)
      .subscribe(() => {
        this.successMessage = 'Subject category updated successfully!';
      });
  }

}

interface SubjectCategory {
  subjectCategoryId: number;
  name: string;
}
