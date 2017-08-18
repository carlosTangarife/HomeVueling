import { Injectable } from '@angular/core';

@Injectable()
export class DestinatiosService {
  public destinations: any;
  constructor() {
    this.destinations = [
      {iata : 'AAL', value: 'Aalborg, Dinamarca'},
      {iata : 'LCG', value: 'A Coruña, España'},
      {iata : 'ALC', value: 'Alicante, España'},
      {iata : 'LEI', value: 'Almería, España'},
      {iata : 'AMS', value: 'Ámsterdam, Países Bajos'},
      {iata : 'ALG', value: 'Argel, Argelia'},
      {iata : 'OVD', value: 'Asturias (Oviedo), España'},
      {iata : 'ATH', value: 'Atenas, Grecia'},
      {iata : 'BJL', value: 'Banjul, Gambia'},
      {iata : 'BCN', value: 'Barcelona, España'},
      {iata : 'BRI', value: 'Bari, Italia'},
      {iata : 'BSL', value: 'Basilea, Suiza'},
      {iata : 'BIA', value: 'Bastia (Córcega), Francia'},
      {iata : 'BEY', value: 'Beirut, Líbano'},
      {iata : 'BEG', value: 'Belgrado, Serbia'},
      {iata : 'BGO', value: 'Bergen, Noruega'},
      {iata : 'TXL', value: 'Berlín (Tegel), Alemania'},
      {iata : 'BIO', value: 'Bilbao, España'},
      {iata : 'BHX', value: 'Birmingham, Reino Unido'},
      {iata : 'BLQ', value: 'Bolonia, Italia'},
      {iata : 'BES', value: 'Brest, Francia'},
      {iata : 'BDS', value: 'Bríndisi, Italia'},
      {iata : 'BRU', value: 'Bruselas, Bélgica'},
      {iata : 'OTP', value: 'Bucarest, Rumanía'},
      {iata : 'BUD', value: 'Budapest, Hungría'},
      {iata : 'EZE', value: 'Buenos Aires, Argentina'},
      {iata : 'BOD', value: 'Burdeos, Francia'},
      {iata : 'CAG', value: 'Cagliari, Italia'},
      {iata : 'CWL', value: 'Cardiff, Reino Unido'},
      {iata : 'CMN', value: 'Casablanca, Marruecos'},
      {iata : 'CTA', value: 'Catania, Italia'},
      {iata : 'EFL', value: 'Cefalonia, Grecia'},
      {iata : 'CLJ', value: 'Cluj-Napoca, Rumanía'},
      {iata : 'CPH', value: 'Copenhague, Dinamarca'},
      {iata : 'CFU', value: 'Corfú, Grecia'},
      {iata : 'KRK', value: 'Cracovia, Polonia'},
      {iata : 'HER', value: 'Creta, Grecia'},
      {iata : 'DKR', value: 'Dakar, Senegal'},
      {iata : 'DUB', value: 'Dublín, Irlanda'},
      {iata : 'DBV', value: 'Dubrovnik, Croacia'},
      {iata : 'DUS', value: 'Düsseldorf, Alemania'},
      {iata : 'EDI', value: 'Edimburgo, Reino Unido'},
      {iata : 'EIN', value: 'Eindhoven, Países Bajos'},
      {iata : 'ARN', value: 'Estocolmo, Suecia'},
      {iata : 'FAO', value: 'Faro, Portugal'},
      {iata : 'FEZ', value: 'Fez, Marruecos'},
      {iata : 'FLR', value: 'Florencia, Italia'},
      {iata : 'FUE', value: 'Fuerteventura, España'},
      {iata : 'GOA', value: 'Génova, Italia'},
      {iata : 'GVA', value: 'Ginebra, Suiza'},
      {iata : 'GOT', value: 'Gotemburgo, Suecia'},
      {iata : 'GRX', value: 'Granada, España'},
      {iata : 'LPA', value: 'Gran Canaria, España'},
      {iata : 'HAM', value: 'Hamburgo, Alemania'},
      {iata : 'HAJ', value: 'Hanóver, Alemania'},
      {iata : 'HEL', value: 'Helsinki, Finlandia'},
      {iata : 'IBZ', value: 'Ibiza, España'},
      {iata : 'XRY', value: 'Jerez (Cádiz), España'},
      {iata : 'KGD', value: 'Kaliningrado, Rusia'},
      {iata : 'AOK', value: 'Kárpatos, Grecia'},
      {iata : 'IEV', value: 'Kiev, Ucrania'},
      {iata : 'KGS', value: 'Kos, Grecia'},
      {iata : 'LMP', value: 'Lampedusa, Italia'},
      {iata : 'ACE', value: 'Lanzarote, España'},
      {iata : 'SPC', value: 'La Palma, España'},
      {iata : 'LCA', value: 'Lárnaca, Chipre'},
      {iata : 'LIL', value: 'Lille, Francia'},
      {iata : 'LIS', value: 'Lisboa, Portugal'},
      {iata : 'LON', value: 'Londres, Reino Unido'},
      {iata : 'LGW', value: 'Londres, Londres (Gatwick), Reino Unido'},
      {iata : 'LHR', value: 'Londres, Londres (Heathrow), Reino Unido'},
      {iata : 'LTN', value: 'Londres, Londres (Luton), Reino Unido'},
      {iata : 'LUX', value: 'Luxemburgo, Luxemburgo'},
      {iata : 'LYS', value: 'Lyon, Francia'},
      {iata : 'FNC', value: 'Madeira, Portugal'},
      {iata : 'MAD', value: 'Madrid, España'},
      {iata : 'AGP', value: 'Málaga, España'},
      {iata : 'PMI', value: 'Mallorca, España'},
      {iata : 'MLA', value: 'Malta, Malta'},
      {iata : 'MAN', value: 'Manchester, Reino Unido'},
      {iata : 'RAK', value: 'Marrakech, Marruecos'},
      {iata : 'MRS', value: 'Marsella, Francia'},
      {iata : 'MAH', value: 'Menorca, España'},
      {iata : 'JMK', value: 'Mikonos, Grecia'},
      {iata : 'MXP', value: 'Milán, Italia'},
      {iata : 'MSQ', value: 'Minsk, Bielorrusia'},
      {iata : 'MOW', value: 'Moscú, Rusia'},
      {iata : 'DME', value: 'Moscú, Moscú (Domodedovo), Rusia'},
      {iata : 'MUC', value: 'Múnich, Alemania'},
      {iata : 'NDR', value: 'Nador, Marruecos'},
      {iata : 'NTE', value: 'Nantes, Francia'},
      {iata : 'NAP', value: 'Nápoles, Italia'},
      {iata : 'NCE', value: 'Niza, Francia'},
      {iata : 'NUE', value: 'Nuremberg, Alemania'},
      {iata : 'OLB', value: 'Olbia, Italia'},
      {iata : 'OPO', value: 'Oporto, Portugal'},
      {iata : 'ORN', value: 'Orán, Argelia'},
      {iata : 'OSL', value: 'Oslo, Noruega'},
      {iata : 'PMO', value: 'Palermo, Italia'},
      {iata : 'PNA', value: 'Pamplona, España'},
      {iata : 'PAR', value: 'París, Francia'},
      {iata : 'CDG', value: 'París, Paris (Charles de Gaulle), Francia'},
      {iata : 'ORY', value: 'París, París (Orly), Francia'},
      {iata : 'PSA', value: 'Pisa (Toscana), Italia'},
      {iata : 'PRG', value: 'Praga, República Checa'},
      {iata : 'PVK', value: 'Préveza, Grecia'},
      {iata : 'PUJ', value: 'Punta Cana, República Dominicana'},
      {iata : 'KEF', value: 'Reikiavik, Islandia'},
      {iata : 'RNS', value: 'Rennes, Francia'},
      {iata : 'RHO', value: 'Rodas, Grecia'},
      {iata : 'FCO', value: 'Roma (Fiumicino), Italia'},
      {iata : 'RTM', value: 'Róterdam, Países Bajos'},
      {iata : 'LED', value: 'San Petersburgo, Rusia'},
      {iata : 'EAS', value: 'San Sebastián, España'},
      {iata : 'SDR', value: 'Santander, España'},
      {iata : 'SCQ', value: 'Santiago, España'},
      {iata : 'JTR', value: 'Santorini, Grecia'},
      {iata : 'SVQ', value: 'Sevilla, España'},
      {iata : 'SPU', value: 'Split, Croacia'},
      {iata : 'STR', value: 'Stuttgart, Alemania'},
      {iata : 'TLL', value: 'Tallin, Estonia'},
      {iata : 'TNG', value: 'Tánger, Marruecos'},
      {iata : 'TLV', value: 'Tel Aviv, Israel'},
      {iata : 'TCI', value: 'Tenerife, España'},
      {iata : 'TFN', value: 'Tenerife, Tenerife Norte, España'},
      {iata : 'TFS', value: 'Tenerife, Tenerife Sur, España'},
      {iata : 'SKG', value: 'Tesalónica, Grecia'},
      {iata : 'TLS', value: 'Toulouse, Francia'},
      {iata : 'TUN', value: 'Túnez, Túnez'},
      {iata : 'TRN', value: 'Turin, Italia'},
      {iata : 'VLC', value: 'Valencia, España'},
      {iata : 'VLL', value: 'Valladolid, España'},
      {iata : 'WAW', value: 'Varsovia, Polonia'},
      {iata : 'VCE', value: 'Venecia, Italia'},
      {iata : 'VRN', value: 'Verona, Italia'},
      {iata : 'VIE', value: 'Viena, Austria'},
      {iata : 'VGO', value: 'Vigo, España'},
      {iata : 'ZAD', value: 'Zadar, Croacia'},
      {iata : 'ZAG', value: 'Zagreb, Croacia'},
      {iata : 'ZTH', value: 'Zante, Grecia'},
      {iata : 'ZAZ', value: 'Zaragoza, España'},
      {iata : 'ZRH', value: 'Zúrich, Suiz'}
    ];
  }

  getDestinations(): any {
    return this.destinations;
  }
}
