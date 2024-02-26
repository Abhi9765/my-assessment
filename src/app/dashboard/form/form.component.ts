import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-form',
  standalone: true,
  providers: [MessageService],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputGroupModule,
    ButtonModule,
    FormsModule,
    ToastModule,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent implements OnInit {
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();

  @Output() public indicator = new EventEmitter<boolean>();

  addStudentDetails: FormGroup;
  studentArr = [];
  flag = false;
  formbuilder = inject(FormBuilder);
  messageService = inject(MessageService);

  ngOnInit(): void {
    this.addStudentDetails = this.formbuilder.group({
      name: ['', [Validators.required]],
      rollno: ['', [Validators.required]],
      math: ['', [Validators.required]],
      physics: ['', [Validators.required]],
      english: ['', [Validators.required]],
    });
  }

  get name() {
    return this.addStudentDetails.get('name');
  }

  get rollno() {
    return this.addStudentDetails.get('rollno');
  }

  formValidation() {
    this.messageService.add({
      key: 'toast',
      severity: 'error',
      summary: 'Error',
      detail: 'make sure all the fields filled!',
    });
  }

  validationForMarks() {
    this.messageService.add({
      key: 'toast',
      severity: 'error',
      summary: 'Error',
      detail: 'marks should be greater than 0 or less than equal to 100!',
    });
  }

  isStudentPresent(rollno) {
    let studentArr = JSON.parse(localStorage.getItem('student')) || [];
    return studentArr.some((res: any) => res.rollno === rollno);
  }
  onSubmit() {
    let Math = this.addStudentDetails.get('math').value;
    let Physics = this.addStudentDetails.get('physics').value;
    let English = this.addStudentDetails.get('english').value;
    if (this.addStudentDetails.valid) {
      if (this.addStudentDetails.get('rollno').value > 0 && this.addStudentDetails.get('rollno').value<=200){
        
        if (this.isStudentPresent(this.addStudentDetails.get('rollno').value)) {
          this.messageService.add({
            key: 'toast',
            severity: 'error',
            summary: 'Error',
            detail: 'student already present with same roll number!',
          });
        } else {
          if (
            Math > 0 &&
            Math <= 100 &&
            Physics > 0 &&
            Physics <= 100 &&
            English > 0 &&
            English <= 100
          ) {
            let temp = JSON.parse(localStorage.getItem('student'));
            if (temp && temp.length >= 0) {
              temp.push(this.addStudentDetails.value);
              localStorage.setItem('student', JSON.stringify(temp));
              this.notify.emit(false);
            } else {
              let arr = [];
              arr.push(this.addStudentDetails.value);
              localStorage.setItem('student', JSON.stringify(arr));
            }
            this.addStudentDetails.reset();
          } else {
            this.validationForMarks();
          }
        }
      } else {
        this.messageService.add({
          key: 'toast',
          severity: 'error',
          summary: 'Error',
          detail: 'roll number will be always greater than 0 or less than equal to 200!',
        });
      }
    } else {
      this.formValidation();
    }
  }
  update() {
    let Math = this.addStudentDetails.get('math').value;
    let Physics = this.addStudentDetails.get('physics').value;
    let English = this.addStudentDetails.get('english').value;
this.addStudentDetails.get('rollno').enable()
    if (this.addStudentDetails.valid) {
      if (
        Math > 0 &&
        Math <= 100 &&
        Physics > 0 &&
        Physics <= 100 &&
        English > 0 &&
        English <= 100
      ) {
        const updatedStudent = this.addStudentDetails.value;
        const students = JSON.parse(localStorage.getItem('student')) || [];

        const existingStudentIndex = students.findIndex(
          (student: any) => student.rollno === updatedStudent.rollno
        );
    
        
        if (existingStudentIndex !== -1) {
         
          updatedStudent['rollno'] = this.addStudentDetails.get('rollno').value;
       
          students[existingStudentIndex] = updatedStudent;
          
          localStorage.setItem('student', JSON.stringify(students));
          this.notify.emit(true);
          this.indicator.emit(false);
          this.addStudentDetails.reset();
        } else {
          this.messageService.add({
            key: 'toast',
            severity: 'error',
            summary: 'Error',
            detail: 'student not found for update!',
          });
          console.error('Student not found for update');
        }

      } else {
        this.validationForMarks();
      }
    } else {
      this.formValidation();
      console.error('Form is invalid');
    }
  }
}
