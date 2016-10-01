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

    redValue = 127;
    greenValue = 127;
    blueValue = 127;
    whiteValue = 127;

    constructor(private lightBulbCommandService: LightBulbCommandService) {}

    updateLightBulb() {
       this.lightBulbCommandService.update(this.redValue, 
                                           this.greenValue, 
                                           this.blueValue, 
                                           this.whiteValue);
    }
}