import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from '../../shared/services/config.service';
import { IDiscountConfig } from '../models/discount.model';
import { TYPE_DISCOUNT } from '../enums/type-discount.enum';

@Injectable()
export class DiscountService {
  private configDiscount: IDiscountConfig;
  public typeDiscountList: string[];

  private typeDiscountListSubject: BehaviorSubject<string[]>;
  public typeDiscountList$: Observable<string[]>;

  constructor(private configService: ConfigService) {
    this.configDiscount = this.configService.getConfigDiscount();
    this.initTypeDiscountList();
    this.typeDiscountListSubject = new BehaviorSubject<string[]>(this.typeDiscountList);
    this.typeDiscountList$ = this.typeDiscountListSubject.asObservable();
  }

  private initTypeDiscountList() {
    this.typeDiscountList = [TYPE_DISCOUNT[TYPE_DISCOUNT.noresfam]];
  }

  isDiscountEnabled(): boolean {
    return this.configDiscount.IsEnabled;
  }

  setDiscountList(isResident: boolean, isLargeFamily: boolean) {
    this.initTypeDiscountList();
    this.configDiscount.Options.forEach(discount => {
      this.addTypeDiscount(discount, isResident, isLargeFamily);
    });
    this.typeDiscountListSubject.next(this.typeDiscountList);
  }

  private addTypeDiscount(discount: string, isResident: boolean, isLargeFamily: boolean) {
    switch (discount) {
      case TYPE_DISCOUNT[TYPE_DISCOUNT.res]:
        if (isResident) {
          this.typeDiscountList.push(discount);
        }
        break;
      case TYPE_DISCOUNT[TYPE_DISCOUNT.fam1]:
        if (isLargeFamily) {
          this.typeDiscountList.push(discount);
        }
        break;
      case TYPE_DISCOUNT[TYPE_DISCOUNT.fam2]:
        if (isLargeFamily) {
          this.typeDiscountList.push(discount);
        }
        break;
      case TYPE_DISCOUNT[TYPE_DISCOUNT.resfam1]:
        if (isResident && isLargeFamily) {
          this.typeDiscountList.push(discount);
        }
        break;
      case TYPE_DISCOUNT[TYPE_DISCOUNT.resfam2]:
        if (isResident && isLargeFamily) {
          this.typeDiscountList.push(discount);
        }
        break;
      default:
        break;
    }
  }
}
