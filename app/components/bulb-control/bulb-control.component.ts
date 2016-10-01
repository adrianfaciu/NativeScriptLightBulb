import { Component } from '@angular/core';
import { LightBulbCommandService } from '../../services/lightbulb-command.service';

@Component({
    moduleId: module.id,
    selector: 'ns-bulb-control',
    templateUrl: 'bulb-control.component.html',
    styleUrls: ['bulb-control.component.css']
})
export class BulbControlComponent {
    maxValue = 255;
    minValue = 0;

    isLightOn = false;
    redValue = 0;
    greenValue = 0;
    blueValue = 0;
    whiteValue = 0;

    constructor(private lightBulbCommandService: LightBulbCommandService) {}

    updateLightBulb() {
       this.lightBulbCommandService.update(this.isLightOn, 
                                           this.redValue, 
                                           this.greenValue, 
                                           this.blueValue, 
                                           this.whiteValue);
    }
}