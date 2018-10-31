import { Component } from '@angular/core';

@Component({
  selector: 'header-icon',
  template: `
  <nz-dropdown nzTrigger="click" nzPlacement="bottomRight" (nzVisibleChange)="change()">
    <div class="alain-default__nav-item" nz-dropdown>
      <i nz-icon type="appstore-o"></i>
    </div>
    <div nz-menu class="wd-xl animated jello">
      <nz-spin [nzSpinning]="loading" [nzTip]="'正在读取数据...'">
        <div nz-row [nzType]="'flex'" [nzJustify]="'center'" [nzAlign]="'middle'" class="app-icons">
          <div nz-col [nzSpan]="6">
            <i nz-icon type="calendar" class="bg-error text-white"></i>
            <small>Calendar</small>
          </div>
          <div nz-col [nzSpan]="6">
            <i nz-icon type="file" class="bg-geekblue text-white"></i>
            <small>Files</small>
          </div>
          <div nz-col [nzSpan]="6">
            <i nz-icon type="cloud" class="bg-success text-white"></i>
            <small>Cloud</small>
          </div>
          <div nz-col [nzSpan]="6">
            <i nz-icon type="star-o" class="bg-magenta text-white"></i>
            <small>Star</small>
          </div>
          <div nz-col [nzSpan]="6">
            <i nz-icon type="team" class="bg-purple text-white"></i>
            <small>Team</small>
          </div>
          <div nz-col [nzSpan]="6">
            <i nz-icon type="scan" class="bg-warning text-white"></i>
            <small>QR</small>
          </div>
          <div nz-col [nzSpan]="6">
            <i nz-icon type="pay-circle-o" class="bg-cyan text-white"></i>
            <small>Pay</small>
          </div>
          <div nz-col [nzSpan]="6">
            <i nz-icon type="printer" class="bg-grey text-white"></i>
            <small>Print</small>
          </div>
        </div>
      </nz-spin>
    </div>
  </nz-dropdown>
  `,
})
export class HeaderIconComponent {
  loading = true;

  change() {
    setTimeout(() => (this.loading = false), 500);
  }
}
