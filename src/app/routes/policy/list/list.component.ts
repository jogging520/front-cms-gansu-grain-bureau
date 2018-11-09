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

  constructor(private policyService: PolicyService,
              private commonService: CommonService){}

  ngOnInit() {
    this.queryPolicies();

    console.log(this.policies);
  }

  public queryPolicies() {
    this.policyService
      .queryPolices('农业')
      .pipe(flatMap((policy) => policy))
      .subscribe((policy: Policy) => {
        if (policy.status == PolicyConstants.CONSTANT_MODULE_POLICY_MODEL_USER_STATUS_ACTIVE) {
          console.log(policy);
          this.policies.push(policy);
        }},
        () => catchError(error => this.commonService.handleError(error)))
  }
  // titles = [
  //   'Alipay',
  //   'Angular',
  //   'Ant Design',
  //   'Ant Design Pro',
  //   'Bootstrap',
  //   'React',
  //   'Vue',
  //   'Webpack',
  // ];
  //
  // avatars = [
  //   'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png', // Alipay
  //   'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png', // Angular
  //   'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png', // Ant Design
  //   'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png', // Ant Design Pro
  //   'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png', // Bootstrap
  //   'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png', // React
  //   'https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png', // Vue
  //   'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png', // Webpack
  // ];
  // covers = [
  //   'https://gw.alipayobjects.com/zos/rmsportal/HrxcVbrKnCJOZvtzSqjN.png',
  //   'https://gw.alipayobjects.com/zos/rmsportal/alaPpKWajEbIYEUvvVNf.png',
  //   'https://gw.alipayobjects.com/zos/rmsportal/RLwlKSYGSXGHuWSojyvp.png',
  //   'https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png',
  // ];
  // desc = [
  //   '那是一种内在的东西， 他们到达不了，也无法触及的',
  //   '希望是一个好东西，也许是最好的，好东西是不会消亡的',
  //   '生命就像一盒巧克力，结果往往出人意料',
  //   '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
  //   '那时候我只会想自己想要什么，从不想自己拥有什么',
  // ];
  //
  // user = [
  //   '卡色',
  //   'cipchk',
  //   '付小小',
  //   '曲丽丽',
  //   '林东东',
  //   '周星星',
  //   '吴加好',
  //   '朱偏右',
  //   '鱼酱',
  //   '乐哥',
  //   '谭小仪',
  //   '仲尼',
  // ];
  //
  // q: any = {
  //   ps: 5,
  //   categories: [],
  //   owners: ['zxx'],
  // };
  //
  // list: any[] = [];
  // loading = false;
  //
  // // region: cateogry
  // categories = [
  //   { id: 0, text: '全部', value: false },
  //   { id: 1, text: '类目一', value: false },
  //   { id: 2, text: '类目二', value: false },
  //   { id: 3, text: '类目三', value: false },
  //   { id: 4, text: '类目四', value: false },
  //   { id: 5, text: '类目五', value: false },
  //   { id: 6, text: '类目六', value: false },
  //   { id: 7, text: '类目七', value: false },
  //   { id: 8, text: '类目八', value: false },
  //   { id: 9, text: '类目九', value: false },
  //   { id: 10, text: '类目十', value: false },
  //   { id: 11, text: '类目十一', value: false },
  //   { id: 12, text: '类目十二', value: false },
  // ];
  //
  // changeCategory(status: boolean, idx: number) {
  //   if (idx === 0) {
  //     this.categories.map(i => (i.value = status));
  //   } else {
  //     this.categories[idx].value = status;
  //   }
  // }
  // // endregion
  //
  // // region: owners
  // owners = [
  //   {
  //     id: 'wzj',
  //     name: '我自己',
  //   },
  //   {
  //     id: 'wjh',
  //     name: '吴家豪',
  //   },
  //   {
  //     id: 'zxx',
  //     name: '周星星',
  //   },
  //   {
  //     id: 'zly',
  //     name: '赵丽颖',
  //   },
  //   {
  //     id: 'ym',
  //     name: '姚明',
  //   },
  // ];
  //
  //
  //
  // setOwner() {
  //   this.q.owners = [`wzj`];
  // }
  // // endregion
  //
  // constructor(private http: _HttpClient) {}
  //
  // ngOnInit() {
  //   this.getData();
  // }
  //
  // getData(more = false) {
  //  // this.loading = true;
  //   for (let i = 0; i < 5; i += 1) {
  //     this.list.push({
  //       id: `fake-list-${i}`,
  //       owner: this.user[i % 10],
  //       title: this.titles[i % 8],
  //       avatar: this.avatars[i % 8],
  //       cover:
  //         parseInt((i / 4).toString(), 10) % 2 === 0
  //           ? this.covers[i % 4]
  //           : this.covers[3 - i % 4],
  //       status: ['active', 'exception', 'normal'][i % 3],
  //       percent: Math.ceil(Math.random() * 50) + 50,
  //       logo: this.avatars[i % 8],
  //       href: 'https://ant.design',
  //       updatedAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i),
  //       createdAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i),
  //       subDescription: this.desc[i % 5],
  //       description:
  //         '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。',
  //       activeUser: Math.ceil(Math.random() * 100000) + 100000,
  //       newUser: Math.ceil(Math.random() * 1000) + 1000,
  //       star: Math.ceil(Math.random() * 100) + 100,
  //       like: Math.ceil(Math.random() * 100) + 100,
  //       message: Math.ceil(Math.random() * 10) + 10,
  //       content:
  //         '段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。',
  //       members: [
  //         {
  //           avatar:
  //             'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png',
  //           name: '曲丽丽',
  //         },
  //         {
  //           avatar:
  //             'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
  //           name: '王昭君',
  //         },
  //         {
  //           avatar:
  //             'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png',
  //           name: '董娜娜',
  //         },
  //       ],
  //     });
  //   }
  //
  // }

}
