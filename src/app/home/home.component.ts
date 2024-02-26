import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    RadioButtonModule,
    ToastModule,
    AnimateOnScrollModule 
  ],
providers:[MessageService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  messageService=inject(MessageService);
  router = inject(Router);
  visible = false;
  role = '';
  loading: boolean = false;
  submit='Submit'
  selectUser() {
    this.visible = true;
  }

  save(form) {
   if(form.control.touched){
    this.loading = true;
    this.submit=''
    setTimeout(() => {
    
      this.router.navigate(['dashboard']);
      localStorage.setItem('role', form.controls['role'].value);
    },200);

   }else{
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'please select your role first!',
    });
   }
  
  }
}
