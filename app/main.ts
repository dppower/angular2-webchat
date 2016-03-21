import {bootstrap} from "angular2/platform/browser";
import {ComponentRef} from "angular2/core"
import {HTTP_PROVIDERS} from "angular2/http";
import {ROUTER_PROVIDERS} from "angular2/router";
import {AppComponent} from "./app.component";
import {getAppInjector} from "./injector-ref";

bootstrap(AppComponent, [HTTP_PROVIDERS, ROUTER_PROVIDERS]).then((appRef: ComponentRef) => { getAppInjector(appRef.injector); });