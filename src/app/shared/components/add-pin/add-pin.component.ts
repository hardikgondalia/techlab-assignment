import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../service/app.service';
import { FileUploader } from 'ng2-file-upload';
import { DomSanitizer } from '@angular/platform-browser';

const URLLink = 'http://localhost:3000/fileupload/';

@Component({
  selector: 'app-add-pin',
  templateUrl: './add-pin.component.html',
  styleUrl: './add-pin.component.scss'
})
export class AddPinComponent {
  @Output() closeModal: EventEmitter<any> = new EventEmitter();
  public selectedRegion:any;
  public addPinForm: FormGroup = new FormGroup({});
  public collaboratorData : any = [];
  public isSubmitted = false;

  url= URLLink;
  disableMultipart = false;
  autoUpload= true;
  method= 'post';
  itemAlias= 'attachment';
  allowedFileType= ['image'];
  public uploader: FileUploader;
  hasBaseDropZoneOver:boolean = false;
  response:string='';

  constructor(private sanitizer: DomSanitizer,private appService:AppService,private fb: FormBuilder,){
    this.setForm();

    this.uploader = new FileUploader({
      url: URLLink,
      disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      formatDataFunctionIsAsync: true,
      formatDataFunction: async (item:any) => {
        return new Promise( (resolve, reject) => {
          resolve({
            name: item._file.name,
            length: item._file.size,
            contentType: item._file.type,
            date: new Date()
          });
        });
      }
    });
 
    this.hasBaseDropZoneOver = false;
 
    this.response = '';
 
    this.uploader.response.subscribe( res => this.response = res );
  }

  setForm(){
    this.addPinForm = this.fb.group({
      title: ['', [Validators.required]],
      image: ['', [Validators.required]],
      collaborators: ['', [Validators.required]],
      privacy: ['Private', [Validators.required]],
  })
}


  ngOnInit(): void {
    if(localStorage.getItem('customersData')){
      this.collaboratorData = JSON.parse(localStorage.getItem('customersData') || '');
    }
  }

  createPin(){
    this.isSubmitted = true;
    if(this.addPinForm.valid){
      this.isSubmitted = false;
      let model ={
        id : new Date().getTime(),
        ...this.addPinForm.value
      }
      let localData : any
      if(localStorage.getItem('pinListData')){
        localData = JSON.parse(localStorage.getItem('pinListData') || '');
        localData.push(model);
      }else{
        localData = [model];
      }
      localStorage.setItem('pinListData',JSON.stringify(localData));
      this.closeModal.emit();
    }else{
      // this.isSubmitted = false;
    }
  }

  fileOverBase(event:any){
   this.hasBaseDropZoneOver = event;
  }

  onFileSelected(event:any){
    const file: File = event[0];
    this.addPinForm.get('image')?.setValue(this.setLocalCover(event));
  }

  setLocalCover(event:any) {
    let url = URL.createObjectURL(event[0]);
    const securedLink = this.getSecuredLink(url);
    return securedLink;
  }

  getSecuredLink(url: any) {
    //For sanitization of link
    if (url) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    } return null;
  }
}
