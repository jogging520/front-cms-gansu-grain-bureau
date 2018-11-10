import { Component, OnInit } from '@angular/core';

import {PolicyService} from "@shared/services/business/policy.service";
import {Policy} from "@shared/models/business/policy";
import * as PolicyConstants from "@shared/constants/business/policy-constants";
import {catchError, flatMap, map} from "rxjs/internal/operators";
import {CommonService} from "@shared/services/general/common.service";
import * as GeneralConstants from "@shared/constants/general/general-constants";
import {ActivatedRoute} from "@angular/router";
import {User} from "@shared/models/general/user";



@Component({
  selector: 'app-policy-list',
  templateUrl: './list.component.html',
})
export class PolicyListComponent implements OnInit {
  users: User[] = [];
  policies: Policy[] = [];
  loading = false;
  conditions: any = {

  };
  totalReadings: number = 0;

  colors: string[] = GeneralConstants.CONSTANT_COMMON_COMPONENT_TAG_COLORS;

  constructor(private activatedRoute: ActivatedRoute,
              private policyService: PolicyService,
              private commonService: CommonService){
    this.activatedRoute
      .data
      .pipe(map(data => data.userParams))
      .subscribe((data) => {
        this.users = data;
      });
  }

  ngOnInit() {
    this.queryPolicies();
  }

  public queryPolicies() {
    this.loading = true;

    this.policyService
      .queryPolices('IT')
      .pipe(flatMap((policy) => policy))
      .subscribe((policy: Policy) => {
        if (policy.status == PolicyConstants.CONSTANT_MODULE_POLICY_MODEL_USER_STATUS_ACTIVE) {
          this.users
            .forEach((user) => {
              if (policy.author === user.id)
                policy.author = user.realName;
            });

          this.totalReadings += policy.readings;
          this.policies.push(policy);
        }},
        () => {catchError(error => this.commonService.handleError(error));
          this.loading = false;},
        () => this.loading = false)
  }

}
