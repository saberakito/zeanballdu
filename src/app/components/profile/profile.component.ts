import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/service/todo.service';
import {Router,ActivatedRoute} from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService,private route:ActivatedRoute,private todoServcie:TodoService,private router:Router) { }
  public todoLists:Todo[];
  public countWin = "";
  public countDraw = "";
  public countLose = "";
  public sumScore = "";
  public win_rate = "";
  public member_id="";
  public member_tel=""
  public member_name="";
  public member_create="";
  name = 'World';
  public myOptions:any;
  public m_id:any;
  sub:any;
  public member_current:any;
  public member_nickname:any;
  public member_nickname_sub:any;
  public season_lists:any;
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
    });
    this.myOptions = {
        'placement': 'left',
        'show-delay': 500
    }

    this.sub = this.route.params.subscribe(params => {
      if(JSON.parse(localStorage.getItem('data'))!=null){
        this.member_current = JSON.parse(localStorage.getItem('data')).member_id;
        this.member_nickname = JSON.parse(localStorage.getItem('data')).member_nickname;
        this.member_nickname_sub = JSON.parse(localStorage.getItem('data')).member_nickname.substr(0,1);
      }
      this.m_id =  params['id'];
      //debugger;
      
      this.todoServcie.getAllSeason().subscribe((response)=>{
          this.season_lists = response.data;
      });
      this.todoServcie.getGameArray(this.m_id).subscribe((response)=>{
        if(response.success!=false){
          this.todoServcie.getDataMember(this.m_id).subscribe((response3)=>{
            this.member_id = response3.data.member_id;
            this.member_name = response3.data.member_name;
            this.member_create = response3.data.member_create_date;
            this.member_nickname_sub = response3.data.member_nickname.substr(0,1);
            this.member_nickname = response3.data.member_nickname;
            this.member_tel = response3.data.member_tel;
          });
          this.todoServcie.getSummary(this.m_id).subscribe((response2)=>{
            if(response2.data!=null){
              this.countWin   = response2.data.COUNTWIN;
              this.countDraw  = response2.data.COUNTDRAW;
              this.countLose  = response2.data.COUNTLOSE;
              this.sumScore   = response2.data.sum_score;
              if(response2.data.win_rate=='nan'){
                response2.data.win_rate = 0;
              }
              this.win_rate   = response2.data.win_rate;
            }
          });
          this.spinner.hide();
        }else{
          this.router.navigateByUrl('/home');
        }
        
        
        if(response.success==true){
          this.todoLists = response.data;
        }
      });

    });
      
    
  }
  selected: number = 1;
  public changeSeason(id: number){
    this.todoServcie.getGameArray_Form_id(this.selected).subscribe((response)=>{
     
      if(response.success==true){
        this.todoLists = response.data;
      }
    });
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