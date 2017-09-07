import { Pipe, PipeTransform } from '@angular/core';
import { ConfigService } from '../services/config.service';

@Pipe({
    name: 'dictionary',
    pure: false
})

export class DictionaryPipe implements PipeTransform {

    constructor(private _config: ConfigService) {
    }

    transform(value: string, args: any[]): any {
        if (!value) { return };
        return this._config.getDictionary(value);
    }
}
