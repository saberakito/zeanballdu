import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/service/todo.service';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.css']
})
export class RewardComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService,private todoServcie:TodoService) { }
  public todoListAdss:Ads[];
  public image_name_1:any;
  public image_name_2:any;
  public image_name_3:any;
  public image_type_1:any;
  public image_type_2:any;
  public image_type_3:any;
  public adjust_page_description:any;
  ngOnInit() {
    this.spinner.show();
    this.todoServcie.getDataReward().subscribe((response)=>{
      if(response.data!=null){
        this.adjust_page_description = response.data['adjust_page_description'];
      }
      this.spinner.hide();
    });

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
  }

}
interface Ads{
  pupn_unixtime_image:number;
  pupn_image_filename:string;
  pupn_image_type:string;
  pupn_order:string;
}