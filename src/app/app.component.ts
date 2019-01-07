import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpEvent } from '@angular/common/http';
import { FileService } from './file.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'file-upload-ng';

  form: FormGroup;
  loading: boolean = false;
  fileform: any
  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(
    private fileService: FileService,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      fileimg: null
    });
    // this.fileService.test().subscribe(res => {
    //   console.log(res);
    // })
  }

  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      this.fileform  = event.target.files[0];
    }
  }

  onSubmit() {
    this.fileService.getpresignedurls().subscribe(res =>{
      
      if(res.success){
        var fd = new FormData();
        fd.append( 'file', this.fileform ); 
        const fileuploadurl = res.urls;
        this.fileService.uploadfileAWSS3(fileuploadurl, 'multipart/form-data', this.fileform)
        .subscribe((event: HttpEvent<any>) => {
          console.log(event);
        });
        // $.ajax( {
        //   url: fileuploadurl,
        //   type: 'PUT',
        //   data: this.fileform,
        //   processData: false,
        //   contentType: false,
        //   headers: {'Content-Type': 'multipart/form-data'},
        //   success: function(){
        //     console.log( "File was uploaded" );
        //   }
        // });
      } else {
        console.log(res.message, res.urls);
      }
    });
  }

  clearFile() {
    this.form.get('fileimg').setValue(null);
    this.fileInput.nativeElement.value = '';
  }
}
