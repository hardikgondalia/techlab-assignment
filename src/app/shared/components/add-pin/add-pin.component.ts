import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../service/app.service';
import { FileUploader } from 'ng2-file-upload';
import { DomSanitizer } from '@angular/platform-browser';

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

  constructor(private sanitizer: DomSanitizer,private appService:AppService,private fb: FormBuilder,){
    this.setForm();
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
      this.closeModal.emit(this.addPinForm.value);
    }
  }

  onDNDSelected(event:any){
   this.fileOverBase(event)
  }

  onFileSelected(event:any){
    this.fileOverBase(event.target.files)
  }

  fileOverBase(event:any){
  const file = this.setLocalCover(event);
  this.addPinForm.get('image')?.setValue(file);
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
