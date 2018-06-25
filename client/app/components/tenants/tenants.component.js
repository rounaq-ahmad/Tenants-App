"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var tenant_service_1 = require("../../services/tenant.service");
var TenantsComponent = /** @class */ (function () {
    function TenantsComponent(tenantService) {
        var _this = this;
        this.tenantService = tenantService;
        this.name = "";
        this.address = "";
        this.pan = "";
        this.adhaar = "";
        this.phone = null;
        this.tenantEditing = false;
        this.tenantService.getTenants()
            .subscribe(function (tenants) {
            _this.tenants = tenants;
        });
    }
    TenantsComponent.prototype.addTenant = function () {
        var _this = this;
        if (this.name === "" || this.address === "" || this.pan === "" || this.adhaar === "" || this.phone === null) {
            this.error = "Please fill all the details";
        }
        else {
            this.error = "";
            var newTenant = {
                name: this.name,
                address: this.address,
                pan: this.pan.toUpperCase(),
                adhaar: this.adhaar,
                phone: this.phone
            };
            this.tenantService.addTenant(newTenant)
                .subscribe(function (tenant) {
                _this.tenants.push(tenant);
                _this.name = '';
                _this.address = '';
                _this.pan = '';
                _this.adhaar = '';
                _this.phone = '';
            });
        }
    };
    TenantsComponent.prototype.deleteTenant = function (id) {
        this.error = "";
        var tenants = this.tenants;
        this.tenantService.deleteTenant(id)
            .subscribe(function (data) {
            if (data.n == 1) {
                for (var i = 0; i < tenants.length; i++) {
                    if (tenants[i]._id == id) {
                        tenants.splice(i, 1);
                    }
                }
            }
        });
    };
    TenantsComponent.prototype.editTenant = function (tenant) {
        this.error = "";
        this.id = tenant._id;
        this.newName = tenant.name;
        this.newAddress = tenant.address;
        this.newPan = tenant.pan.toUpperCase();
        this.newAdhaar = tenant.adhaar;
        this.newPhone = tenant.phone;
        this.tenantEditing = true;
    };
    TenantsComponent.prototype.cancelEditing = function () {
        this.tenantEditing = false;
        this.message = "";
    };
    TenantsComponent.prototype.updateTenant = function () {
        var _this = this;
        if (this.newName === "" || this.newAddress === "" || this.newPan === "" || this.newAdhaar === "" || this.newPhone === "") {
            this.message = "Please fill all the details";
        }
        else {
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
            this.tenantService.updateTenant(_tenant).subscribe(function (data) {
                console.log(data);
                if (data.n == 1) {
                    for (var i = 0; i < _this.tenants.length; i++) {
                        if (_this.tenants[i]._id === _tenant._id) {
                            _this.tenants[i] = _tenant;
                        }
                    }
                }
            });
        }
    };
    TenantsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'tenants',
            templateUrl: 'tenants.component.html'
        }),
        __metadata("design:paramtypes", [tenant_service_1.TenantService])
    ], TenantsComponent);
    return TenantsComponent;
}());
exports.TenantsComponent = TenantsComponent;
//# sourceMappingURL=tenants.component.js.map