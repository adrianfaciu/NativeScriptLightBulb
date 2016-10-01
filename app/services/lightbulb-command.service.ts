import { Injectable } from '@angular/core';
import { BluetoothService } from './bluetooth.service';

@Injectable()
export class LightBulbCommandService {
    lightBulbUUID: string;

    constructor(private bluetoothService: BluetoothService) { }

    update(red: number, green: number, blue: number, white: number) {
        const color = this.getColorValue(red, green, blue, white);

        if (!this.bluetoothService.isConnected) {
            this.bluetoothService.scan().then(() => {
                this.lightBulbUUID = this.bluetoothService.getMagicBlue().UUID;
                this.bluetoothService.write(this.lightBulbUUID, color);
            })
        } else {
            this.bluetoothService.write(this.lightBulbUUID, color);
        }
    }

    getColorValue(red: number, green: number, blue: number, warmWhite: number) {
        return new Uint8Array([0x56, red, green, blue, warmWhite, 0xf0, 0xaa]);
    }
}