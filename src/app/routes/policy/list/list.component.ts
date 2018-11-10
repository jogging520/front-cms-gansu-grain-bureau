import { Component, OnInit } from '@angular/core';

import {PolicyService} from "@shared/services/business/policy.service";
import {Policy} from "@shared/models/business/policy";
import * as PolicyConstants from "@shared/constants/business/policy-constants";
import {catchError, flatMap} from "rxjs/internal/operators";
import {CommonService} from "@shared/services/general/common.service";




@Component({
  selector: 'app-policy-list',
  templateUrl: './list.component.html',
})
export class PolicyListComponent implements OnInit {
  policies: Policy[] = [];
  loading = false;
  conditions: any = {

  };

  constructor(private policyService: PolicyService,
              private commonService: CommonService){}

  ngOnInit() {
    this.queryPolicies();

    console.log(this.policies);
  }

  public queryPolicies() {
    this.loading = true;
    this.policyService
      .queryPolices('农业')
      .pipe(flatMap((policy) => policy))
      .subscribe((policy: Policy) => {
        if (policy.status == PolicyConstants.CONSTANT_MODULE_POLICY_MODEL_USER_STATUS_ACTIVE) {
          console.log(policy);
          this.policies.push(policy);
        }},
        () => {catchError(error => this.commonService.handleError(error));
          this.loading = false;},
        () => this.loading = false)
  }


}
