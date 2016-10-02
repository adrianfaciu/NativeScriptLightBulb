import { Injectable } from '@angular/core';
import { BluetoothService } from './bluetooth.service';
import { BleDevice } from '../models/ble-device.model';

@Injectable()
export class LightBulbCommandService {
    magicBlue: BleDevice;

    constructor(private bluetoothService: BluetoothService) { }

    connectToMagicBlue() {
        this.bluetoothService.scan().then(() => {
            console.log('Scanning completed');
            this.magicBlue = this.getMagicBlue();
            if (this.magicBlue) {
                console.log('Magic blue found');
                this.bluetoothService.connect(this.magicBlue.UUID);
            } else {
                console.log('Device not found');
            }
        });
    }

    update(red: number, green: number, blue: number, white: number) {
        if (!this.isConnected(this.magicBlue.UUID)) {
            console.log('Not connected to device');
            return;
        }

        const color = [red, green, blue, white].map(param => {
            return this.convertToHexString(param);
        }).join(",");

        console.log('Updating the color:' + color);

        const updateMessage = this.getMessage(this.magicBlue.UUID, color);
        this.bluetoothService.write(updateMessage);
    }

    getMessage(UUID: string, value: string): any {
        return {
            peripheralUUID: UUID,
            serviceUUID: 'ffe5',
            characteristicUUID: 'ffe9',
            value: value
        };
    }

    isConnected(UUID: string): boolean {
        const magicBlue = this.getMagicBlue();
        console.log('Device: ' + JSON.stringify(magicBlue));

        return magicBlue && magicBlue.UUID === UUID && magicBlue.state === 'connected';
    }

    getMagicBlue(): BleDevice {
        return this.bluetoothService.bleDevicesAround
            .filter(d => d.name && d.name.indexOf('LEDBLE') > -1)[0];
    }

    convertToHexString(code: number): string {
        return "0x" + code.toString(16);
    }
}