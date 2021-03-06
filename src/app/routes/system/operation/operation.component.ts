import {Component, OnInit, ViewChild} from '@angular/core';
import { ModalHelper } from '@delon/theme';
import {OperationService} from "@shared/services/general/operation.service";
import {Operation} from "@shared/models/general/operation";
import {NzMessageService} from "ng-zorro-antd";
import {tap, map} from "rxjs/operators";
import {CommonService} from "@shared/services/general/common.service";
import {SystemOperationViewComponent} from "./view/view.component";
import {ActivatedRoute} from "@angular/router";
import * as GeneralConstants from "@shared/constants/general/general-constants";
import {STColumn, STComponent} from "@delon/abc";

@Component({
  selector: 'app-system-operation',
  templateUrl: './operation.component.html',
})
export class SystemOperationComponent implements OnInit {

  //查询组合条件
  conditions: any = {};
  //渠道类型（应用类型）
  channelTypes = [];
  //业务类型
  businessTypes = [];
  //全量用户
  users = [];
  //操作记录数据
  operations: Operation[] = [];
  //加载中状态
  loading = false;

  @ViewChild('st')
  st: STComponent;
  columns: STColumn[] = [
    { title: '操作编号', index: 'id' },
    { title: '操作人员',
      index: 'user',
      format: (operation: Operation) => {
        let formattedUser = '';

        this.users
          .forEach((user) => {
            if (operation.user.toLocaleUpperCase() === user.value.toLocaleUpperCase())
              formattedUser = user.text;
          });

        return formattedUser;
      }
    },
    { title: '渠道类型',
      index: 'appType',
      format: (operation: Operation) => {
        let formattedAppType = '';

        this.channelTypes
          .forEach((channelType) => {
          if (operation.appType.toLocaleUpperCase() === channelType.value.toLocaleUpperCase())
            formattedAppType = channelType.text;
          });

        return formattedAppType;
      }
    },
    { title: '业务类型',
      index: 'businessType',
      format: (operation: Operation) => {
        let formattedBusinessType = '';

        this.businessTypes
          .forEach((businessType) => {
            if (operation.businessType.toLocaleUpperCase() === businessType.value.toLocaleUpperCase())
              formattedBusinessType = businessType.text;
          });

        return formattedBusinessType;
      }
    },
    { title: '操作时间',
      type: 'date',
      index: 'createTime',
      sorter: (a: any, b: any) => a.createTime - b.createTime,
    },
    {
      title: '操作',
      buttons: [
        { text: '详情', type: 'static', component: SystemOperationViewComponent, click: 'reload' }
        // { text: '查看', click: (item: any) => `/form/${item.id}` },
        // { text: '编辑', type: 'static', component: FormEditComponent, click: 'reload' },
      ]
    }
  ];

  constructor(private modal: ModalHelper,
              public messageService: NzMessageService,
              private activatedRoute: ActivatedRoute,
              private operationService: OperationService
  ) {
    this.activatedRoute
      .data
      .pipe(map(data => data.operationParams))
      .subscribe((data) => {
      this.channelTypes = data.channelTypes;
      this.businessTypes = data.businessTypes;
      this.users = data.users;
      });
  }

  ngOnInit() {
    this.queryDefaultOperations();
  }

  /**
   * 方法：默认初始化查询操作记录
   */
  private queryDefaultOperations(): void {
    this.conditions.fromCreateTime = CommonService.beforeDate();
    this.conditions.toCreateTime = CommonService.currentDate();
    this.queryOperations();
  }

  /**
   * 方法：根据组合条件查询操作记录
   */
  private queryOperations(): void {
    let data = [];

    this.loading = true;

    this.operationService
      .queryOperations(this.conditions)
      .pipe(tap())
      .subscribe(
        (operation: Operation) => {
          if (operation.status === GeneralConstants.CONSTANT_MODULE_SHARED_MODEL_OPERATION_STATUS_ACTIVE) {
            data.push(operation);
          }},
        () => {
          this.messageService.warning(GeneralConstants.CONSTANT_MODULE_SHARED_MODEL_OPERATION_COMMON_ERROR);
          this.loading = false;
        },
        () => {
          this.operations = data;
          this.loading = false;
        }
      )
  }
}
