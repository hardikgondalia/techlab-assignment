import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AppService } from '../../service/app.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
    if(res?.['status-code']===200){
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

  countryChanged(event:any){

  }

  createCustomer(){
    this.isSubmitted = true;
    
    if(this.addCustomerForm.valid){
      this.isSubmitted = false;

      // console.log(this.addCustomerForm.value)
      let model ={
        id : new Date().getTime(),
        ...this.addCustomerForm.value
      }
      let localData : any
      if(localStorage.getItem('customersData')){
        localData = JSON.parse(localStorage.getItem('customersData') || '');
        localData.push(model);
      }else{
        localData = [model];
      }
      localStorage.setItem('customersData',JSON.stringify(localData));
      this.closeModal.emit();
    }else{
      // this.isSubmitted = false;
    }
  }


}
