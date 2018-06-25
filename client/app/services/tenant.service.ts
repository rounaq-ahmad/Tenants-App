import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TenantService{
  constructor(private http: Http){
    console.log('Tenant Service Initialized...');
  }

  getTenants(){
    return this.http.get('/api/tenants')
    .map(res => res.json());
  }

  addTenant(newTenant){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/tenant', JSON.stringify(newTenant), {headers: headers})
    .map(res => res.json());
  }

  deleteTenant(id){
    return this.http.delete('/api/tenant/' + id)
    .map(res => res.json());
  }

  updateTenant(tenant){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('/api/tenant/' + tenant._id, JSON.stringify(tenant), {headers: headers})
    .map(res => res.json());
  }
}
