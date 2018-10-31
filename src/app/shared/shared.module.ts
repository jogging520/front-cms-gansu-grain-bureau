import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// delon
import { AlainThemeModule } from '@delon/theme';
import { DelonABCModule } from '@delon/abc';
import { DelonACLModule } from '@delon/acl';
import { DelonFormModule } from '@delon/form';

// topCode: third libs
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CountdownModule } from 'ngx-countdown';
import { RegionComponent } from '@shared/components/general/region/region.component';
import { OrganizationComponent } from '@shared/components/general/organization/organization.component';
import { NgxAmapModule } from 'ngx-amap';
import {UserRegionPipe} from "@shared/pipes/business/user-region.pipe";
import { ShowAuthedDirective } from '@shared/directives/show-authed.directive';
import { PasswordEqualValidatorSyncDirective } from '@shared/validators/general/password-equal-sync-validator.directive';
import { ImagePipe } from '@shared/pipes/general/image.pipe';
import { EventListenerDirective } from '@shared/directives/event-listener.directive';
import { MarkdownPipe } from '@shared/pipes/general/markdown.pipe';
import {DelonChartModule} from "@delon/chart";

const THIRDMODULES = [
  NgZorroAntdModule,
  CountdownModule
];
// endregion

// topCode: your componets & directives
const COMPONENTS = [RegionComponent, OrganizationComponent];
const DIRECTIVES = [ShowAuthedDirective, PasswordEqualValidatorSyncDirective, EventListenerDirective];
const PIPES = [UserRegionPipe, ImagePipe, MarkdownPipe];
// endregion

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    AlainThemeModule.forChild(),
    DelonABCModule,
    DelonACLModule,
    DelonChartModule,
    DelonFormModule,
    NgxAmapModule.forRoot({
      apiKey: '1d54cf0e4dac3ed6da30cbad7627dcdd'
    }),
    // third libs
    ...THIRDMODULES
  ],
  declarations: [
    // your components
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AlainThemeModule,
    DelonABCModule,
    DelonACLModule,
    DelonChartModule,
    DelonFormModule,
    NgxAmapModule,
    // third libs
    ...THIRDMODULES,
    // your components
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES
  ]
})
export class SharedModule { }
