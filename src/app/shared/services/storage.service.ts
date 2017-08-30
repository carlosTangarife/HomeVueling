import { Injectable } from '@angular/core';
import { PersistenceService, StorageType } from 'angular-persistence';

@Injectable()
export class StorageService {
    constructor(private _persistenceService: PersistenceService) { }

    public setStorage(key: string, value: any, timeout?: number) {
        this._persistenceService.set(key, value, { expireAfter: timeout });
    }

    public setLocalStorage(key: string, value: any, timeout?: number) {
        this._persistenceService.set(key, value, {
            type: StorageType.LOCAL,
            expireAfter: timeout
        });
    }

    public setSessionStorage(key: string, value: any, timeout?: number) {
        this._persistenceService.set(key, value, {
            type: StorageType.SESSION,
            expireAfter: timeout
        });
    }

    public getStorage(key: string) {
        this._persistenceService.get(key);
    }

    public getLocalStorage(key: string) {
        this._persistenceService.get(key, StorageType.LOCAL);
    }

    public getSessionStorage(key: string) {
        this._persistenceService.get(key, StorageType.SESSION);
    }

    public removeAllStorage() {
        this._persistenceService.removeAll();
    }

    public removeAllLocalStorage() {
        this._persistenceService.removeAll(StorageType.LOCAL);
    }

    public removeAllSessionStorage() {
        this._persistenceService.removeAll(StorageType.SESSION);
    }

    public removeStorage(key: string) {
        this._persistenceService.remove(key);
    }

    public removeLocalStorage(key: string) {
        this._persistenceService.remove(key, StorageType.LOCAL);
    }

    public removeSessionStorage(key: string) {
        this._persistenceService.remove(key, StorageType.SESSION);
    }

    public cleanStorage() {
        this._persistenceService.clean();
    }

    public cleanLocalStorage() {
        this._persistenceService.clean(StorageType.LOCAL);
    }

    public cleanSessionStorage() {
        this._persistenceService.clean(StorageType.SESSION);
    }
}
