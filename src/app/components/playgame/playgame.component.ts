
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgImageSliderComponent } from 'ng-image-slider';
import { TodoService } from 'src/app/service/todo.service';
import { IImage } from 'ng-simple-slideshow';
import { NgForm } from '@angular/forms';
import {Router} from "@angular/router"
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-playgame',
  templateUrl: './playgame.component.html',
  styleUrls: ['./playgame.component.css']
})

export class PlaygameComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService,private todoServcie:TodoService,private router:Router) { }
  public m_id:any;
  public todoLists:Todo[];
  public haveGamePlayer:any = 0;
  public team_win:any;
  public hd_id:any;
  public ss_id:any;
  public ss_name:any;
  public ss_date_start:any;
  public ss_date_stop:any;

  
  public todoListAdss:Ads[];
  public image_name_1:any;
  public image_name_2:any;
  public image_name_3:any;
  public image_type_1:any;
  public image_type_2:any;
  public image_type_3:any;
  
  ngOnInit() {
    this.spinner.show();
    this.todoServcie.getDataAds().subscribe((response)=>{
      this.todoListAdss = response.data;
      if(response.data!=null){
        this.image_name_1 = response.data[0].pupn_image_filename;
        this.image_type_1 = response.data[0].pupn_image_type;
  
        this.image_name_2 = response.data[1].pupn_image_filename;
        this.image_type_2 = response.data[1].pupn_image_type;
  
        this.image_name_3 = response.data[2].pupn_image_filename;
        this.image_type_3 = response.data[2].pupn_image_type;
      }
      
        //  console.log(this.todoPromotionText);
    });
    if(JSON.parse(localStorage.getItem('data'))!=null){
      this.m_id = JSON.parse(localStorage.getItem('data')).member_id;
    }
    this.todoServcie.getDataGame(0).subscribe((response)=>{
       this.todoLists = response.data;
       this.todoServcie.getSeason().subscribe((response)=>{
        this.ss_id = response.data.ss_id;
        this.ss_name =  response.data.ss_name;
        this.ss_date_start = response.data.ss_date_start;
        this.ss_date_stop =  response.data.ss_date_stop;
        this.spinner.hide();
       });
       this.todoServcie.getGame().subscribe((response)=>{
        if(response.success==true){
          this.haveGamePlayer = 1;
          this.hd_id = response.data['hg_hd_id'];
          this.team_win = response.data['hg_team_win'];
        }
      });
     });
  }
  saveGame(hd_id,team_win){
    if(confirm("คุณต้องการเลือกทีมนี้?")){
      this.todoServcie.saveGame(hd_id,team_win).subscribe((response)=>{
        this.router.navigateByUrl('/profile/'+this.m_id);
        
      });
    }
   
    
  }
}

interface Todo{
  hd_id :any;
  hd_title_league:any;
  hd_date:any;
  hd_time:any;
  hd_home:any;
  hd_away:any;
  hd_handicap:any;
  hd_xh:any;
  hd_xa:any;
  hd_hl:any;
  hd_home_star:any;
  hd_away_star:any;
  hd_real_result:any;
  hd_real_hl:any;
  hd_real_win:any;
  hd_result_hl:any;
  hd_result_hl_stat:any;
  hd_result_home:any;
  hd_result_away:any;
  hd_result_percent:any;
  hd_result_win:any;
  hd_result_cal:any;
  hd_tdedteam_status:any;
  hd_tdedHL_status:any;
  hd_update_tded:any;
  hd_status_tded:any;
  hd_status_game:any;
  hd_create_date:any;
  hd_update_date:any;
  hd_delete:any;
}

interface Ads{
  pupn_unixtime_image:number;
  pupn_image_filename:string;
  pupn_image_type:string;
  pupn_order:string;
}