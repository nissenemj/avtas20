
"use strict";

class Henkilo {
    constructor (etunimet, sukunimi, kutsumanimi, syntymavuosi){
        this._etunimet = etunimet;
        this._sukunimi = sukunimi;
        this._kutsumanimi = kutsumanimi;
        this._syntymavuosi = syntymavuosi;
    }
}

class Urheilija extends Henkilo {
    constructor (etunimet, sukunimi, kutsumanimi, syntymavuosi, kuva, paino, laji, saavutukset) {
        super(etunimet, sukunimi, kutsumanimi, syntymavuosi);
        this._kuva = kuva;
        this._paino = paino;
        this._laji = laji;
        this._saavutukset = saavutukset;
        console.log("luotu", this);
    }

    set uudetEtunimet(uudetEtunimet) {
        this._etunimet = uudetEtunimet;
    }
    set uusiSukunimi(uusiSukunimi) {
        this._sukunimi = uusiSukunimi;
    }
    get syntymavuosi() {
        return this._syntymavuosi;
    }
    set uusiSyntymavuosi(uusiSyntymavuosi) {
        this._syntymavuosi = uusiSyntymavuosi;
    }
    get kuva() {
        return this._kuva;
    }
    set uusiKuva(uusiKuva) {
        this._kuva = uusiKuva;
    }
    get paino() {
        return this._paino;
    }
    set uusiPaino(uusiPaino) {
        this._paino = uusiPaino;
    }
    get laji() {
        return this._laji;
    }
    set uusiLaji(uusiLaji) {
        this._laji = uusiLaji;
    }
    get saavutukset() {
        return this._saavutukset;
    }
    set uudetSaavutukset(uudetSaavutukset) {
        this._saavutukset = uudetSaavutukset;
    }
}
