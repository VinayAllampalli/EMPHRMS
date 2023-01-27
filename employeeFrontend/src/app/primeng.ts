import { NgModule } from "@angular/core";
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {MenubarModule} from 'primeng/menubar';
import {CardModule} from 'primeng/card';
import {TabViewModule} from 'primeng/tabview';
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import {CheckboxModule} from 'primeng/checkbox';

@NgModule({
    exports:[
        ButtonModule,
        InputTextModule,
        MenubarModule,
        CardModule,
        TabViewModule,
        CalendarModule,
        DropdownModule,
        CheckboxModule,
       
    ]
})
export class PrimeNgModule{}