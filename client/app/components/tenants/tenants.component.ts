import {Component} from '@angular/core';
import {TenantService} from '../../services/tenant.service';
import {Tenant} from '../../Tenant';

@Component({
  moduleId: module.id,
  selector:'tenants',
  templateUrl: 'tenants.component.html'
})
export class TenantsComponent {
  tenants: Tenant[];
  name: string = "";
  address: string = "";
  pan: string = "";
  adhaar: string = "";
  phone: number = null;
  tenantEditing: boolean = false;
  error: string;
  message: string;

  id: any;
  newName: string;
  newAddress: string;
  newPan: string;
  newAdhaar: string;
  newPhone: number;

  constructor(private tenantService: TenantService){
    this.tenantService.getTenants()
    .subscribe(tenants => {
      this.tenants = tenants;
    })
  }

  addTenant(){
    if(this.name === "" || this.address === "" || this.pan === "" || this.adhaar === "" || this.phone === null){
      this.error = "Please fill all the details";
    } else {
      this.error = "";
      var newTenant = {
        name: this.name,
        address: this.address,
        pan: this.pan.toUpperCase(),
        adhaar: this.adhaar,
        phone: this.phone
      }

      this.tenantService.addTenant(newTenant)
      .subscribe(tenant => {
        this.tenants.push(tenant);
        this.name = '';
        this.address = '';
        this.pan = '';
        this.adhaar = '';
        this.phone = '';
      });
    }
  }

  deleteTenant(id){
    this.error = "";
    var tenants = this.tenants;

    this.tenantService.deleteTenant(id)
    .subscribe(data => {
      if(data.n == 1){
        for(var i = 0; i < tenants.length; i++){
          if(tenants[i]._id == id){
            tenants.splice(i, 1);
          }
        }
      }
    });
  }

  editTenant(tenant){
    this.error = "";
    this.id = tenant._id;
    this.newName = tenant.name;
    this.newAddress = tenant.address;
    this.newPan = tenant.pan.toUpperCase();
    this.newAdhaar = tenant.adhaar;
    this.newPhone = tenant.phone;
    this.tenantEditing = true;
  }

  cancelEditing(){
    this.tenantEditing = false;
    this.message = "";
  }

  updateTenant(){

    if(this.newName === "" || this.newAddress === "" || this.newPan === "" || this.newAdhaar === "" || this.newPhone === ""){
      this.message = "Please fill all the details";
    } else {
      this.tenantEditing = false;
      this.message = "";

      var _tenant = {
        _id: this.id,
        name: this.newName,
        address: this.newAddress,
        pan: this.newPan,
        adhaar: this.newAdhaar,
        phone: this.newPhone
      };

      this.tenantService.updateTenant(_tenant).subscribe(data => {
        console.log(data);
        if(data.n == 1){
          for(var i = 0; i < this.tenants.length; i++){
            if(this.tenants[i]._id === _tenant._id){
              this.tenants[i] = _tenant;
            }
          }
        }
      });
    }
  }
}
