import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    SidebarModule,
    CommonModule,
    FormComponent,
    ToastModule,
    ConfirmDialogModule,
    DialogModule,
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  studentList = [];
  role = localStorage.getItem('role');
  sidebarVisible: boolean = false;
  confirmationService = inject(ConfirmationService);
  messageService = inject(MessageService);

  @ViewChild(FormComponent) form: FormComponent;
  ngOnInit(): void {
    this.studentList = JSON.parse(localStorage.getItem('student'));
  }

  hidesidebar(event) {
    this.sidebarVisible = event;
  }

  sidebarControl() {
    this.form.addStudentDetails.reset();
    this.sidebarVisible = true;
    this.form.flag = false;
  }

  onSubmit(event) {
    this.studentList = JSON.parse(localStorage.getItem('student'));
    this.messageService.add({
      key: 'toast',
      severity: 'success',
      summary: 'Success',
      detail: 'Updated data successfully!',
    });
    this.sidebarVisible = event;
  }

  deleteStudent(object, event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle text-primary-500',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'pi pi-check mr-2',
      rejectIcon: 'pi pi-times mr-2',

      accept: () => {
        const index = this.studentList.findIndex(
          (student) => student.rollno === object.rollno
        );
        if (index !== -1) {
          this.studentList.splice(index, 1);
          localStorage.setItem('student', JSON.stringify(this.studentList));
          this.messageService.add({
            key: 'toast',
            severity: 'info',
            summary: 'Confirmed',
            detail: 'Record deleted!',
          });
        }
      },
      reject: () => {
        this.messageService.add({
          key: 'toast',
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
        });
      },
    });
  }

  calPercentage(event) {
    let percentage = event.math + event.physics + event.english;
    this.messageService.add({
      key: 'toast',
      severity: 'info',
      detail: `${event.name} got  ${Math.round((percentage / 300) * 100)}% !`,
    });
  }

  editData(student) {
    const index = this.studentList.findIndex(
      (e) => e.rollno === student.rollno
    );

    if (index !== -1) {
      this.sidebarVisible = true;
      this.form.flag = true;

      this.form.addStudentDetails.patchValue({
        name: student.name,
        rollno: student.rollno,
        math: student.math,
        physics: student.physics,
        english: student.english,
      });
     this.form.addStudentDetails.get('rollno').disable()
    }
  }
}
