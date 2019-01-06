import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpEvent } from '@angular/common/http';
import { FileService } from './file.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'file-upload-ng';

  form: FormGroup;
  loading: boolean = false;

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
  }

  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        const readerResult: any = reader.result;
        this.form.get('fileimg').setValue({
          filename: file.name,
          filetype: file.type,
          value: readerResult.split(',')[1]
        })
      };
    }
  }

  onSubmit() {
    this.fileService.getpresignedurls().subscribe(res =>{
      console.log(res);
      if(res.success){
        const fileuploadurl = res.urls;
        this.fileService.uploadfileAWSS3(fileuploadurl, 'image/jpg', this.form.get('fileimg').value)
        .subscribe((event: HttpEvent<any>) => {
          console.log(event);
        });
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
