"use strict";

export const TRANSFER_INIT = 'transfer.init';
export const TRANSFER_REQUEST = 'transfer.request';
export const TRANSFER_SUCCESS = 'transfer.success';
export const TRANSFER_FAILURE = 'transfer.failure';


export function init(action) {
  return {
  	    type: TRANSFER_INIT
  };
}
