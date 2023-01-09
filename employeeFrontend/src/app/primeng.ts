import { NgModule } from "@angular/core";
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {MenubarModule} from 'primeng/menubar';
import {CardModule} from 'primeng/card';
import {TabViewModule} from 'primeng/tabview';
import {CalendarModule} from 'primeng/calendar';
@NgModule({
    exports:[
        ButtonModule,
        InputTextModule,
        MenubarModule,
        CardModule,
        TabViewModule,
        CalendarModule
    ]
})
export class PrimeNgModule{}