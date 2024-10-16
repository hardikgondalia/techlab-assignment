import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AppService } from '../../service/app.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
}

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.scss'
})
export class AddCustomerComponent implements OnInit{
  @Output() closeModal: EventEmitter<any> = new EventEmitter();
  public selectedRegion:any;
  public addCustomerForm: FormGroup = new FormGroup({});
  public locationData : any = [];
  public regions : any = [];
  public countries : any = [];
  public isSubmitted = false;


  constructor(private appService:AppService,private fb: FormBuilder,){
    this.setForm();
  }

  setForm(){
    this.addCustomerForm = this.fb.group({
      title: ['', [Validators.required]],
      email: ['', [Validators.required,Validators.email]],
      region: ['', [Validators.required]],
      country: ['', [Validators.required]],
  })
}


  ngOnInit(): void {
    this.getRegions();
  }

  getRegions(){
   this.appService.getLocation().subscribe((res:any)=>{
    if(res?.['status-code']===HttpStatusCode.OK){
    this.locationData = Object.values(res?.data).reduce((acc:any, { country, region }:any) => {
      let regionObj = acc.find((r:any) => r.region === region);
      if (!regionObj) {
          regionObj = { region, countries: [] };
          acc.push(regionObj);
      }
      regionObj.countries.push(country);
      return acc;
  }, []);
    this.regions = this.locationData.map((data:any) => data.region);
    }
   })
  }

  regionChanged(event:any){
    const region = event[0]?.value;
    const index = this.locationData.findIndex((value:any)=>value.region===region);
    if(index>=0){
      this.countries = this.locationData[index]?.countries
    }
  }

  createCustomer(){
    this.isSubmitted = true;
    if(this.addCustomerForm.valid){
      this.isSubmitted = false;
      this.closeModal.emit(this.addCustomerForm.value)
    }
  }


}
