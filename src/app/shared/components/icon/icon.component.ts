import { Component, OnInit, Input } from '@angular/core';
import { IIcon } from '../../models/commons.model';

@Component({
  selector: '[app-icon]',
  templateUrl: './icon.component.html'
})
export class IconComponent implements OnInit {
  @Input()
  icon: IIcon;

  constructor() { }

  ngOnInit() {
  }

  paths(): number[] {
    return Array(this.icon.Paths).fill(0).map((x, i) => i + 1);
  }
}
