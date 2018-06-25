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
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var TenantService = /** @class */ (function () {
    function TenantService(http) {
        this.http = http;
        console.log('Tenant Service Initialized...');
    }
    TenantService.prototype.getTenants = function () {
        return this.http.get('/api/tenants')
            .map(function (res) { return res.json(); });
    };
    TenantService.prototype.addTenant = function (newTenant) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/tenant', JSON.stringify(newTenant), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    TenantService.prototype.deleteTenant = function (id) {
        return this.http.delete('/api/tenant/' + id)
            .map(function (res) { return res.json(); });
    };
    TenantService.prototype.updateTenant = function (tenant) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('/api/tenant/' + tenant._id, JSON.stringify(tenant), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    TenantService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], TenantService);
    return TenantService;
}());
exports.TenantService = TenantService;
//# sourceMappingURL=tenant.service.js.map