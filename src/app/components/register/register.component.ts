import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/service/todo.service';
import {ActivatedRoute,Router } from '@angular/router';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private route:ActivatedRoute,private todoServcie:TodoService,private router:Router) { }
  public todoRegisterText:RegisterText[];
  id:any;
  sub:any;
  public data_deatail:string = "<img src='/assets/images/loading/05.gif'>";
  public data_title:string;
  public username:string;
  public lastname:string;
  public password:string;
  public tel:string;
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id =  params['id'];
     // this.id =  params['id'];
      // this.todoServcie.getDataPage("register").subscribe((response)=>{
      //   this.data_title = response.data.menu_name;
      //   this.data_deatail = response.data.menu_detail;
      // });
    });
    
    
  }
  onSubmit(form: NgForm): void {
    
    if(form.value.username==null||form.value.username==''){
      alert('กรุณากรอก Username');
      $("#username").focus();
      $("#username").select();
      return;
    }
    if(form.value.password==null||form.value.password==''){
      alert('กรุณากรอก password');
      $("#password").focus();
      $("#password").select();
      return;
    }
    if(form.value.password2==null||form.value.password2==''){
      alert('กรุณากรอก password อีกครั้ง');
      $("#password2").focus();
      $("#password2").select();
      return;
    }
    if(form.value.nickname==null||form.value.nickname==''){
      alert('กรุณากรอก ฉายา');
      $("#nickname").focus();
      $("#nickname").select();
      return;
    }
    if(form.value.tel==null||form.value.tel==''){
      alert('กรุณากรอก เบอร์โทร');
      $("#tel").focus();
      $("#tel").select();
      return;
    }
    if(form.value.password!=form.value.password2){
      alert('รหัสผ่านไม่ตรงกัน');
      $("#password").focus();
      return;
    }
    this.todoServcie.saveMember(form.value).subscribe(data=>{
     if(data.success){
      // debugger;
      alert("สมัครสำเร็จ");
      localStorage.setItem("data", JSON.stringify(data['data']));
      this.todoServcie.setLoggedIn(true);
      //location.href = "http://zeanballdu.com/playgame";
     }else{
      alert("สมัครไม่สำเร็จ");
     }
      
    });
  }

}

interface RegisterText {
  register_text_id :string;
  register_text_title :string;
  register_text_detail :string;
  register_text_sort :string;
  register_text_hide :string;
  register_text_delete :string;
  register_text_create_by :string;
  register_text_update_by :string;
  register_text_create_date :string;
  register_text_update_date :string;
}
