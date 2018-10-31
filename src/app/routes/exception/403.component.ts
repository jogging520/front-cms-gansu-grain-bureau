import {Component, OnInit} from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import {CommonService} from "@shared/services/general/common.service";
import {SessionService} from "@shared/services/general/session.service";

@Component({
  selector: 'exception-403',
  template: `<exception type="403" style="min-height: 500px; height: 80%;"></exception>`,
})
export class Exception403Component implements OnInit {
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
