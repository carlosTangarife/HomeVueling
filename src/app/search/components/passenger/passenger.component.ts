import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-passenger',
  template: `
    <div id="form-group--passengers">
    <label for="usr">Pasajeros</label>
    <div class="input-group">
      <input type="text" id="passengers-input" class="form-control js-searchbar-input" placeholder="Ciudad, país o aeropuerto">
    </div>

    <div id="passengers-popup" class="searchbar-popup passengers-popup">
      <ul class="passengers-popup_main">

        <li>
          <div class="passengers-popup_main_description">
            <p class="title">Adultos</p>
            <label class="label">Desde 16 años</label>
          </div>
          <div class="passengers-popup_main_counter">
            <span class="icon icon-rounded-less"></span>
            <div class="number">1</div>
            <span class="icon icon-rounded-more"></span>
          </div>
        </li>

        <li>
          <div class="passengers-popup_main_description">
            <p class="title">Niños</p>
            <label class="label">De 2 a 15 años</label>
          </div>
          <div class="passengers-popup_main_counter">
            <span class="icon icon-rounded-less disabled"></span>
            <div class="number">0</div>
            <span class="icon icon-rounded-more"></span>
          </div>
        </li>

        <li>
          <div class="passengers-popup_main_description">
            <p class="title">Bebé</p>
            <label class="label">De 7 días - 23 meses</label>
          </div>
          <div class="passengers-popup_main_counter">
            <span class="icon icon-rounded-less disabled"></span>
            <div class="number">0</div>
            <span class="icon icon-rounded-more"></span>
          </div>
        </li>

        <li>
          <div class="passengers-popup_main_description">
            <p class="title">Asiento extra</p>
            <label class="label"><a href="">+ info</a></label>
          </div>
          <div class="passengers-popup_main_counter">
            <span class="icon icon-rounded-less disabled"></span>
            <div class="number">0</div>
            <span class="icon icon-rounded-more"></span>
          </div>
        </li>
      </ul>

      <ul class="passengers-popup_main discount">
        <li id="discount-list-active">
          <p>Descuento Residente o familia numerosa</p>
          <span class="icon icon-arrow-right"></span>
        </li>
        <li class="js-discount-item-selected">
          <p class="discount-item selected">Fam. Numerosa Especial (10%)</p>
        </li>
        <div class="alert alert--icon info">
          <div class="alert_wrap">
            <span class="icon icon-info"><span class="path1"></span><span class="path2"></span></span>
            <p class="alert_wrap_title">Residentes</p>
            <p class="alert_wrap_message">Durante la reserva se validará tu condición de residente.</p>
          </div>
          <div class="alert_wrap">
            <span class="icon icon-info"><span class="path1"></span><span class="path2"></span></span>
            <p class="alert_wrap_title">Familia numerosa</p>
            <p class="alert_wrap_message">Se debe presentar la documentación acreditativa en el aeropuerto.</p>
          </div>
        </div>
    </ul>
    <ul id="discount-list" class="passengers-popup_main discount-list">
      <li>
        <p class="discount-item js-discount">Residente islas o Ceuta (50%)</p>
      </li>
      <li>
        <p class="discount-item js-discount">Fam. Numerosa General (5%)</p>
      </li>
      <li>
        <p id="discount-item" class="discount-item js-discount">Fam. Numerosa Especial (10%)</p>
      </li>
      <li>
        <p class="discount-item js-discount">Fam. Numerosa General Residente (55%)</p>
      </li>
      <li>
        <p class="discount-item js-discount">Fam. Numerosa Especial Residente (60%)</p>
      </li>
    </ul>

    </div>
  </div>
  `
})
export class PassengerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
