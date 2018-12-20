import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../auth.service';
import {NgForm} from '@angular/forms';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ToastrService } from '../../common/toastr.service';
import { TimeinService } from './timein.service';
import { timeout } from 'rxjs-compat/operator/timeout';
import { ITimein } from '../../emp-dashboard/time/timein';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent implements OnInit {

    timein: ITimein[];
    textValue: string = '';
    userObj: any;
    timid: string;
    time: number = Date.now();
    date = new FormControl(new Date());

    @ViewChild("video")
    public video: ElementRef;

    @ViewChild("canvas")
    public canvas: ElementRef;

    public captures: string;

    public constructor(private authService: AuthService,
    private timeinService: TimeinService,
    private router: Router,
    private toastr: ToastrService,private route: ActivatedRoute,) {
    }

    public ngOnInit() { 
        // $(document).ready(function() {
        //     var button = $('#Button');
        //     $('#timeout').attr('disabled', 'disabled');
        
        //     $('#click').click(function() {
        //         if ($('#timeout').attr('disabled')) $('#timeout').removeAttr('disabled');
        //         else $('#timeout').attr('disabled', 'disabled');
        //     });
        // });
        



    //     window.addEventListener("load", function(){
    //         var currentTime = new Date();
    //         var hours = currentTime.getHours();
    //         // var newButton = document.getElementById("timeout");
       
    //        if(hours >= 11) {
    //         $('#timeout').prop('disabled', false);
    //        }
    //        else {
    //         $('#timeout').prop('disabled', true);
    //        }
    //    }, false);

       

        $(document).ready(function(){
            $('.modal').modal();
          });
          
        $(document).ready(function(){
            $('.tabs').tabs();
          });



        this.userObj =  this.authService.currentUser;
        console.log(this.userObj.userid);
        var thehours = new Date().getHours();
        var themessage;
        var morning = ('Good morning!! Have a nice day');
        var afternoon = ('Good afternoon !! Had your lunch??');
        var evening = ('Good evening !! Enjoy the rest of the day');
    
        if (thehours >= 0 && thehours < 12) {
            themessage = morning; 
    
        } else if (thehours >= 12 && thehours < 17) {
            themessage = afternoon;
    
        } else if (thehours >= 17 && thehours < 24) {
            themessage = evening;
        }
    
        $('.greeting').append(themessage);


        this.timeinService
        .gettimeinDate(this.userObj.userid)
        .subscribe(
          (data: ITimein[]) => {this.timein = data;});
    }


    public ngAfterViewInit() {
        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
                this.video.nativeElement.srcObject = stream;
                this.video.nativeElement.play();
            });
        }
    }
    
    public capture() {
        var context = this.canvas.nativeElement.getContext("2d").drawImage(this.video.nativeElement, 0, 0, 110, 80);
        //this.captures.push(this.canvas.nativeElement.toDataURL("image/jpeg"));
        this.captures = this.canvas.nativeElement.toDataURL("image/jpeg");
    //     console.log(image);
    }


    

    onSubmit(f: NgForm) {
        console.log(f.value);
        this.timeinService.saveTimein(this.userObj.userid,f.value)
        .subscribe(data => {
            if (data.success === false) {
              if (data.errcode){
                this.authService.logout();
                this.router.navigate(['auth/elogin']);

              }
              this.toastr.error(data.message);
              
            } else {
              this.toastr.success(data.message);
            }
            
        },(err) => {this.toastr.error("Forgot to snap your photo!!")}
    );  // { first: '', last: '' }
      }
      saveTimeout(g: NgForm){
        console.log(g.value);
        this.timeinService.saveTimeout(this.userObj.userid,g.value)
        .subscribe(data => {
            if (data.success === false) {
              if (data.errcode){
                this.toastr.error(data.message);
                this.authService.logout();
                this.router.navigate(['auth/elogin']);
              }
              this.toastr.error(data.message);
            } else {
              this.toastr.success(data.message);
            }
        },(err) => {this.toastr.error("Seems like you Forgot to &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Time-in or snap your photo !!")}
    
        
    );
          // { first: '', last: '' }
          
      }

}
