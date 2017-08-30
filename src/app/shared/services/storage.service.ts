import { Injectable } from '@angular/core';
import { PersistenceService, StorageType } from 'angular-persistence';

@Injectable()
export class StorageService {
    constructor(private persistenceService: PersistenceService) { }

    public setStorage(key: string, value: Object, timeout?: number) {
        this.persistenceService.set(key, value, { expireAfter: timeout });
    }

    public setLocalStorage(key: string, value: Object, timeout?: number) {
        this.persistenceService.set(key, value, {
            type: StorageType.LOCAL,
            expireAfter: timeout
        });
    }

    public setSessionStorage(key: string, value: Object, timeout?: number) {
        this.persistenceService.set(key, value, {
            type: StorageType.SESSION,
            expireAfter: timeout
        });
    }

    public getStorage(key: string) {
        this.persistenceService.get(key);
    }

    public getLocalStorage(key: string) {
        this.persistenceService.get(key, StorageType.LOCAL);
    }

    public getSessionStorage(key: string) {
        this.persistenceService.get(key, StorageType.SESSION);
    }

    public removeAllStorage() {
        this.persistenceService.removeAll();
    }

    public removeAllLocalStorage() {
        this.persistenceService.removeAll(StorageType.LOCAL);
    }

    public removeAllSessionStorage() {
        this.persistenceService.removeAll(StorageType.SESSION);
    }

    public removeStorage(key: string) {
        this.persistenceService.remove(key);
    }

    public removeLocalStorage(key: string) {
        this.persistenceService.remove(key, StorageType.LOCAL);
    }

    public removeSessionStorage(key: string) {
        this.persistenceService.remove(key, StorageType.SESSION);
    }

    public cleanStorage() {
        this.persistenceService.clean();
    }

    public cleanLocalStorage() {
        this.persistenceService.clean(StorageType.LOCAL);
    }

    public cleanSessionStorage() {
        this.persistenceService.clean(StorageType.SESSION);
    }
}
