import { Injectable } from '@angular/core';
import { BleDevice } from '../models/ble-device.model';
var bluetooth = require("nativescript-bluetooth");

@Injectable()
export class BluetoothService {
    bleDevicesAround: Array<BleDevice> = new Array;

    write(bluetoothMessage): void {
        console.log('Writing message: ' + JSON.stringify(bluetoothMessage));
        bluetooth.write(bluetoothMessage)
            .then((result) => console.log("Value written " + JSON.stringify(result)),
            (error) => console.log("Write error: " + error));
    }

    fixPermission(): void {
        bluetooth.hasCoarseLocationPermission()
            .then((granted) => {
                console.log("Has location permission ? " + granted);

                if (!granted) {
                    bluetooth.requestCoarseLocationPermission()
                        .then(() => console.log("Location permission requested"));
                }
            });
    }

    connect(UUID: string): Promise<any> {
        return bluetooth.connect({
            UUID: UUID,
            onConnected: (peripheral) => {
                console.log("Periperhal connected with UUID: " + peripheral.UUID);
                peripheral.services.forEach(function (service) {
                    console.log("Service found: " + JSON.stringify(service));
                });
            },
            onDisconnected: (peripheral) => {
                console.log("Periperhal disconnected with UUID: " + peripheral.UUID)
            }
        });
    }

    disconnect(UUID: string): void {
        bluetooth.disconnect({ UUID: UUID })
            .then(() => console.log("Disconnected successfully"),
            (err) => console.log("Disconnection error: " + err));
    }

    scan(): Promise<any> {
        console.log('Scanning...');
        this.bleDevicesAround = new Array;

        return bluetooth.startScanning({
            serviceUUIDs: [],
            seconds: 3,
            onDiscovered: (device) => {
                console.log("UUID: " + device.UUID);
                console.log("Name: " + device.name);
                console.log("State: " + device.state);

                const bleDevice = new BleDevice(device.UUID, device.name, device.state);
                this.bleDevicesAround.push(bleDevice);
            }
        });
    }
}