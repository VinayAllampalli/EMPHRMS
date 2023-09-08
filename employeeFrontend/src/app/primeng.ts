import { NgModule } from "@angular/core";
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {MenubarModule} from 'primeng/menubar';
import {CardModule} from 'primeng/card';
import {TabViewModule} from 'primeng/tabview';
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import {CheckboxModule} from 'primeng/checkbox';
import {PanelModule} from 'primeng/panel';
import {InputSwitchModule} from 'primeng/inputswitch';
import {TableModule} from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { OrganizationChartModule } from 'primeng/organizationchart';

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
        PanelModule,
        InputSwitchModule,
        TableModule,
        PaginatorModule,
        OrganizationChartModule
            
    ]
})
export class PrimeNgModule{}