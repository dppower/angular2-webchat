"use strict";
import {Injector} from "angular2/core";

let appInjectorRef: Injector;

export const getAppInjector = (injector?: Injector): Injector => {
    if (injector) {
        appInjectorRef = injector;
    }
    return appInjectorRef;
};