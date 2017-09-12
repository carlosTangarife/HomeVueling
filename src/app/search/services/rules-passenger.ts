import { IPassengers } from '../models/passenger.model';
import { IMaxAndMinRule } from '../models/rules-passenger.model';

export namespace RulesPax {
    export interface IRulePassenger {
        validate(passenger: IPassengers, rule: IMaxAndMinRule);
    }

    export class RulePassenger implements IRulePassenger {
        validate(passenger: IPassengers, rule: IMaxAndMinRule) { }

        ruleValidate(value: number, min: number, max: number) {
            value = (value > max) ? max : value;
            return {
                minus : value > min,
                plus: value < max,
                value: value
            };
        }

        getRuleMax(passenger: IPassengers, rule: IMaxAndMinRule): number {
            let pax = rule.Max + 1;
            if (rule.Dependent) {
                pax = 0;
                rule.Dependent.forEach(type => {
                    pax += passenger[type];
                });
            }
            return (pax > rule.Max) ? rule.Max : pax;
        }
    }

    export class AdultsRule extends RulePassenger {
        validate(passenger: IPassengers, rule: IMaxAndMinRule): any {
            return super.ruleValidate(passenger.Adults, rule.Min, rule.Max);
        }
    }

    export class ChildrenRule extends RulePassenger {
        validate(passenger: IPassengers, rule: IMaxAndMinRule): any {
            let max = (rule.MaxWhenAdults && passenger.Adults > 0) ? rule.MaxWhenAdults : rule.Max;
            return this.ruleValidate(passenger.Children, rule.Min, max);
        }
    }

    export class InfantsRule extends RulePassenger {
        validate(passenger: IPassengers, rule: IMaxAndMinRule): any {
            let max = super.getRuleMax(passenger, rule);
            return super.ruleValidate(passenger.Infants, rule.Min, max);
        }
    }

    export class ExtraSeatRule extends RulePassenger {
        validate(passenger: IPassengers, rule: IMaxAndMinRule): any {
            let max = super.getRuleMax(passenger, rule);
            return super.ruleValidate(passenger.ExtraSeat, rule.Min, max);
        }
    }
}
