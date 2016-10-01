import { Injectable } from '@angular/core';

@Injectable()
export class LightBulbCommandService {
    constructor() { }

    update(isOn: boolean, red: number, green: number, blue: number, white: number) {
        console.log(isOn);
        console.log(red);
        console.log(green);
        console.log(blue);
    }
}