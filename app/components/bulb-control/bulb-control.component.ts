import { Component, OnInit } from '@angular/core';
import { LightBulbCommandService } from '../../services/lightbulb-command.service';
import { BluetoothService } from '../../services/bluetooth.service';

@Component({
    moduleId: module.id,
    selector: 'ns-bulb-control',
    templateUrl: 'bulb-control.component.html',
    styleUrls: ['bulb-control.component.css']
})
export class BulbControlComponent implements OnInit {
    maxValue = 255;
    minValue = 0;

    redValue = 128;
    greenValue = 0;
    blueValue = 0;
    whiteValue = 0;

    constructor(private lightBulbCommandService: LightBulbCommandService,
                private bluetoothService: BluetoothService) {}

    ngOnInit() {
        this.bluetoothService.fixPermission();
        this.lightBulbCommandService.connectToMagicBlue();
    }

    updateLightBulb() {
       this.lightBulbCommandService.update(this.redValue, 
                                           this.greenValue, 
                                           this.blueValue, 
                                           this.whiteValue);
    }
}