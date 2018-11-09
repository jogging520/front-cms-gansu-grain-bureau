import { Injectable } from '@angular/core';
import {CommonService} from "@shared/services/general/common.service";
import {_HttpClient} from "@delon/theme";
import {Observable} from "rxjs/index";
import {catchError} from "rxjs/internal/operators";
import {Policy} from "@shared/models/business/policy";
import * as GeneralConstants from "@shared/constants/general/general-constants";
import {environment} from "@env/environment";


@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  constructor(
    private httpClient: _HttpClient,
    private commonService: CommonService
  ) { }

  public queryPolices(name?: string): Observable<Policy[]> {
    return this.httpClient
      .get(`${environment.serverUrl}${GeneralConstants.CONSTANT_COMMON_HTTP_PARAM_PUBLIC_POLICY}`,
        {name: name}
      )
      .pipe(
        catchError(error => this.commonService.handleError(error))
      );
  }
}
