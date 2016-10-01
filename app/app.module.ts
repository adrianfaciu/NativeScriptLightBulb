import { NativeScriptModule } from 'nativescript-angular/platform';
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BulbControlComponent } from './components/bulb-control/bulb-control.component';
import { LightBulbCommandService } from './services/lightbulb-command.service';

@NgModule({
    declarations: [AppComponent, BulbControlComponent], 
    bootstrap: [AppComponent],
    imports: [NativeScriptModule, NativeScriptFormsModule],
    providers: [LightBulbCommandService]
})
export class AppModule {}