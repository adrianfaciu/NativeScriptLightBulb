import { Injectable } from '@angular/core';
import { BleDevice } from '../models/ble-device.model';
var bluetooth = require("nativescript-bluetooth");

@Injectable()
export class BluetoothService {
    bleDevicesAround: Array<BleDevice>;

    get magicBluesAround(): Array<BleDevice> {
        return this.bleDevicesAround.filter(d => d.name.indexOf('LEDBLE') > -1);
    }

    constructor() {
        this.bleDevicesAround = new Array;
    }

    isConnected(): boolean {
        return this.bleDevicesAround.length > 0 && this.magicBluesAround.length > 0;
    }

    write(UUID: string, value: Uint8Array) {
        var bluetoothMessage: any = {
            peripheralUUID: UUID,
            serviceUUID: '0xffe5',
            characteristicUUID: '0xffe9',
            value: value.buffer
        }

        bluetooth.writeWithoutResponse(bluetoothMessage);
    }

    getMagicBlue(): BleDevice {
        if (this.isConnected) {
            return this.magicBluesAround[0];
        } else {
            return null;
        }
    }

    scan(): Promise<any> {
        this.bleDevicesAround = new Array;

        return bluetooth.startScanning({
            serviceUUIDs: [],
            seconds: 3,
            onDiscovered: device => {
                console.log("UUID: " + device.UUID);
                console.log("Name: " + device.name);
                console.log("State: " + device.state);

                const bleDevice = new BleDevice(device.UUID, device.name, device.state);
                this.bleDevicesAround.push(bleDevice);
            }
        });
    }
}