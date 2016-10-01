import { Component } from '@angular/core';

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

    updateLightBulb() {
        console.log(this.isLightOn);
        console.log(this.redValue);
        console.log(this.greenValue);
        console.log(this.redValue);
    }
}