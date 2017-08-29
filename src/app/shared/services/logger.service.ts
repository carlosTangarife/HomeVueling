import { Injectable, Optional } from '@angular/core';
import { LogLevel } from '../models/log-level.enum';
import { LogOptions } from '../models/log-options.model';

// For browsers that don't implement the debug method, log will be used instead. Fixes #62.
const CONSOLE_DEBUG_METHOD = console['debug'] ? 'debug' : 'log';

const DEFAULT_OPTIONS: LogOptions = {
    level: LogLevel.WARN
};

@Injectable()
export class LoggerService {

    public Level: any = LogLevel;

    private _level: LogLevel;

    isErrorEnabled = (): boolean => this.level >= LogLevel.ERROR;
    isWarnEnabled = (): boolean => this.level >= LogLevel.WARN;
    isInfoEnabled = (): boolean => this.level >= LogLevel.INFO;
    isDebugEnabled = (): boolean => this.level >= LogLevel.DEBUG;
    isLogEnabled = (): boolean => this.level >= LogLevel.LOG;

    get level(): LogLevel { return this._level; }

    set level(level: LogLevel) {
        this._level = level;
    }

    constructor( @Optional() options?: LogOptions) {
        let { level } = Object.assign({}, DEFAULT_OPTIONS, options);

        this._level = level;
    }

    error(message?: any, ...optionalParams: any[]) {
        if (this.isErrorEnabled()) {
            console.error.apply(console, arguments);
        }
    }

    warn(message?: any, ...optionalParams: any[]) {
        if (this.isWarnEnabled()) {
            console.warn.apply(console, arguments);
        }
    }

    info(message?: any, ...optionalParams: any[]) {
        if (this.isInfoEnabled()) {
            console.info.apply(console, arguments);
        }
    }

    debug(message?: any, ...optionalParams: any[]) {
        if (this.isDebugEnabled()) {
            (<any>console)[CONSOLE_DEBUG_METHOD].apply(console, arguments);
        }
    }

    log(message?: any, ...optionalParams: any[]) {
        if (this.isLogEnabled()) {
            console.log.apply(console, arguments);
        }
    }
}
