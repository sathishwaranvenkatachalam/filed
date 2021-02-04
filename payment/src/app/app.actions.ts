import { Action } from '@ngrx/store';

export const SAVE_VALUE = '[Card] Save';
export const RESETVALUE = '[Card] Reset';

export class SAVEVALUE implements Action {
    readonly type = SAVE_VALUE;
    constructor(public payload:any) {}
}

export class ResetValue implements Action {
    readonly type = RESETVALUE;
}

export type All = SAVEVALUE | ResetValue;
