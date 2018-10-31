import {Component, OnInit} from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import {SessionService} from "@shared/services/general/session.service";
import {CommonService} from "@shared/services/general/common.service";

@Component({
  selector: 'exception-404',
  template: `<exception type="404" style="min-height: 500px; height: 80%;"></exception>`,
})
export class Exception404Component implements OnInit {
  constructor(modalSrv: NzModalService,
              private sessionService: SessionService,
              private commonService: CommonService,) {
    modalSrv.closeAll();
  }

  ngOnInit(): void {
    this.commonService.clear();
    this.sessionService.clearIntervals();
  }
}
