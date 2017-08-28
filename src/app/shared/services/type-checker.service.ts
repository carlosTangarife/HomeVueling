import { Injectable } from '@angular/core';

@Injectable()
export class TypeCheckerService {

    public isGUID(pattern: string): boolean {
        return /^([0-9A-Fa-f]{8}[-][0-9A-Fa-f]{4}[-][0-9A-Fa-f]{4}[-][0-9A-Fa-f]{4}[-][0-9A-Fa-f]{12})$/i.test(pattern);
    }

    public isNumber(pattern: string): boolean {
        return /^([0-9]+\.?[0-9]*)$/.test(pattern);
    }

    public isInt(pattern: string): boolean {
        return /^(-?[0-9]+)$/.test(pattern);
    }

    public isBoolean(pattern: string): boolean {
        return /^([0-1]|true|false)$/.test(pattern);
    }

    public isDateTime(pattern: string): boolean {
        let regExpr = new RegExp(`^([0-9]{2}-[0-9]{2}-[0-9]{4}|[0-9]{4}-[0-9]{2}-[0-9]{2}|[0-9]{2}\/
                                 [0-9]{2}\/[0-9]{4}|[0-9]{4}\/[0-9]{2}\/[0-9]{2})$`);
        return regExpr.test(pattern);
    }

    public startsAsDateTime(pattern: string): boolean {
        return /^([0-9]{2}-[0-9]{2}|[0-9]{4}-[0-9]{2}|[0-9]{2}\/[0-9]{2}|[0-9]{4}\/[0-9]{2})/.test(pattern);
    }

    public isUUID(pattern: string): boolean {
        return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(pattern);
    }
}
