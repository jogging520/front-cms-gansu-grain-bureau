import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzMessageService} from "ng-zorro-antd";
import {type} from "os";
import {PolicyService} from "@shared/services/business/policy.service";
import {Policy} from "@shared/models/business/policy";
import {environment} from "@env/environment";
import {CommonService} from "@shared/services/general/common.service";
import {flatMap} from "rxjs/internal/operators";
import {SessionService} from "@shared/services/general/session.service";

@Component({
  selector: 'app-policy-creation',
  templateUrl: './creation.component.html',
})
export class PolicyCreationComponent implements OnInit {

  policyForm: FormGroup;
  submitting: boolean = false;
  typeOptions: any[] = [
    {name: 'COMMON', value: '普通'}, {name: 'SPECIAL', value: '特殊'}];
  appOptions: any[] = [
    {name: 'app', value: '手机APP'}, {name: 'cms', value: 'cms'}];
  gradeOptions: any[] = [
    {name: '一级', value: 'first'}, {name: '二级', value: 'second'}];
  keywordsOptions: any[] = [];
  author: string;


  constructor(private formBuilder: FormBuilder,
              private msg: NzMessageService,
              private policyService: PolicyService,
              private commonService: CommonService,
              private sessionService: SessionService) { }

  ngOnInit() {
    this.policyForm = this.formBuilder.group({
      type: [null, [Validators.required]],
      appTypes: [null, [Validators.required]],
      name: [null, [Validators.required]],
      grade: [null, [Validators.required]],
      keywords: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });

    this.sessionService
      .currentUser
      .subscribe((user) => this.author = user.id);
  }

  submit() {
    this.submitting = true;
    this.createPolicy();

  }

  private createPolicy(): void {
    let serialNo = this.commonService.setSerialNo();
    let policy: Policy = {
      type: this.policyForm.controls.type.value,
      appTypes: this.policyForm.controls.appTypes.value,
      category: environment.category,
      name: this.policyForm.controls.name.value,
      grade: this.policyForm.controls.grade.value,
      keywords: this.policyForm.controls.keywords.value,
      author: this.author,
      readings: 0,
      createTime: CommonService.current(),
      timestamp: CommonService.current(),
      status: 'ACTIVE',
      serialNo: serialNo,
      description: this.policyForm.controls.description.value
    }

    this.policyService.createPolicies([policy])
      .pipe(flatMap((policies) => policies))
      .subscribe((policy: Policy) => {
        this.msg.info(policy.status);
        },
        () => {this.submitting = false;},
        () => {
          this.submitting = false;
        });

  }
}
