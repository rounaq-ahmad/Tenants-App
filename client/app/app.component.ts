import {Component} from '@angular/core';
import {TenantService} from './services/tenant.service';

@Component({
  moduleId: module.id,
  selector:'my-app',
  templateUrl: 'app.component.html',
  providers: [TenantService]
})
export class AppComponent {

}
