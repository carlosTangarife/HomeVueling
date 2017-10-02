import { Component, OnInit, Input } from '@angular/core';
import { IIconLink } from '../../models/commons.model';


@Component({
  selector: '[app-list-icon-link]',
  templateUrl: './list-icon-link.component.html'
})
export class ListIconLinkComponent implements OnInit {
  @Input()
  listIconLink: IIconLink[];

  constructor() { }

  ngOnInit() {
  }

}
