import { Component, OnInit,Input  } from '@angular/core';
import { TodoService } from 'src/app/service/todo.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  @Input() name;
  constructor(private router:Router, private loginService: TodoService) { }

  ngOnInit() {
  
  }
  public username;
  public password;
  infoMessage = '';
  public Validateuser(form: NgForm): void {
    this.loginService.ValidateUser(form.value.username,form.value.password).subscribe(data => {
      if(data.success==true){
        localStorage.setItem("data", JSON.stringify(data['data']));
        this.loginService.setLoggedIn(true);
        this.infoMessage = '';
        window.location.reload();
      }else{
        this.infoMessage = 'Login Failed. Please Try Again.';
        this.router.navigate(['login']);
      }
    });
  }

}
