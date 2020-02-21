import { Component,ViewChild } from '@angular/core';

import { AuthService } from './service/auth.service';
import { Router,NavigationEnd } from '@angular/router';
import { NgImageSliderComponent } from 'ng-image-slider';
import { CookieService } from 'ngx-cookie-service';
import { TodoService } from 'src/app/service/todo.service';
import * as AOS from 'aos';
import * as $ from 'jquery';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'casino';
  constructor(private todoServcie:TodoService,private _authService:AuthService, private _router:Router, private cookie:CookieService,private router:Router){}
  @ViewChild('nav') slider: NgImageSliderComponent;
  public close_popup = "0";
  public member_nickname:string;
  public member_current:string;
  
  public adjust_page_image_name:string;
  public adjust_page_image_type:string;
  public website_title:string;
  imageObject: Array<object> = [{
      image: '/assets/images/content/slide1.jpg',
      thumbImage: '/assets/images/content/slide2.jpg'
  }, {
      image: '/assets/images/content/slide2.jpg',
      thumbImage: '/assets/images/content/slide1.jpg',
      //title: 'Image with title' //Optional: You can use this key if you want to show title
  },{
      image: '/assets/images/content/slide3.jpg',
      thumbImage: '/assets/images/content/slide3.jpg',
      //title: 'Image with title' //Optional: You can use this key if you want to show title
  }
  ];
  prevImageClick() {
      this.slider.prev();
  }

  nextImageClick() {
      this.slider.next();
  }

  closePopup() {
    this.cookie.set("close_popup", "1",1);
    this.close_popup = '1';
  }
  public class_checkShow:string;
  public login_status_check:string = '0';
  showHeader = true;
  ngOnInit() {
    if(localStorage.getItem("login")=="success"){
      this.login_status_check = '1';
    }
    if(JSON.parse(localStorage.getItem('data'))!=null){
      this.member_current = JSON.parse(localStorage.getItem('data')).member_id;
      this.member_nickname = JSON.parse(localStorage.getItem('data')).member_nickname;
    }
    
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        var check_url = event.url.split("/")[2];
        // if(check_url=='register'||check_url=='deposit'||check_url=='withdraw'){
        //   this.showHeader = false;
        //  // this.class_checkShow = "content_100";
        // }else{
        //   this.showHeader = true;
        //  // this.class_checkShow = "container bg_content";
        // // this.class_checkShow = "container bg_content";
        // }
        
      //  this.showHeader = this.activatedRoute.firstChild.snapshot.data.showHeader !== false;
      }
    });

   

    // this.todoServcie.getSetting().subscribe((response)=>{
    //   // this.website_title = response.data.website_title;
    //   // $('title').html(this.website_title);
    // });
   
    AOS.init();
    // this.todoServcie.getPopup().subscribe((response)=>{
    //  this.adjust_page_image_name = response.adjust_page_image_name;
    //  this.adjust_page_image_type = response.adjust_page_image_type
    //  if(this.adjust_page_image_name==''||this.adjust_page_image_name==null){
    //   this.close_popup = '1';
    //  }
    // });
    var close_popup_value =  this.cookie.get("close_popup");
    if(close_popup_value=='1'){
      this.close_popup = '1';
    }
    document.body.classList.add('bg-img');
    if(localStorage.getItem('web_status')=='2'){
      this._router.navigate(['/404']);
      return false;
    }
      
  }
    public username;
    public password;
  public Validateuser(){
    if($("#username").val()!=""&&$("#password").val()!=""){
      this.todoServcie.ValidateUser($("#username").val().toString(),$("#password").val().toString()).subscribe(data => {
        if(data.success==true){
         // this.router.navigateByUrl('/home');
         localStorage.setItem("data", JSON.stringify(data['data']));
          this.todoServcie.setLoggedIn(true);
         // this.infoMessage = '';
          window.location.reload();
        }else{
          alert('login failed.');
         // this.infoMessage = 'Login Failed. Please Try Again.';
          //this.router.navigate(['login']);
        }
      });
    }else{
      alert('กรอกข้อมูลให้ครบ');
    }
    
  }
  
  public Validateuser2(){
    if($("#username2").val()!=""&&$("#password2").val()!=""){
      this.todoServcie.ValidateUser($("#username2").val().toString(),$("#password2").val().toString()).subscribe(data => {
        if(data.success==true){
         // this.router.navigateByUrl('/home');
         localStorage.setItem("data", JSON.stringify(data['data']));
          this.todoServcie.setLoggedIn(true);
         // this.infoMessage = '';
          window.location.reload();
        }else{
          alert('login failed.');
         // this.infoMessage = 'Login Failed. Please Try Again.';
          //this.router.navigate(['login']);
        }
      });
    }else{
      alert('กรอกข้อมูลให้ครบ');
    }
    
  }

  logout(){
      localStorage.clear();
      window.location.reload();
  }
}

