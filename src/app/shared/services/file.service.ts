import { Injectable } from '@angular/core';

@Injectable()
export class FileService {
    downloadWorkflow(data: any): void {
        let blob = new Blob([data], { type: 'application/json' });
        let url = window.URL.createObjectURL(blob);
        window.open(url);
    };
}
