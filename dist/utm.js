"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.koordTG = exports.koordGT = void 0;
const rad2deg = (rad) => {
    return rad * (180.0 / Math.PI);
};
const deg2rad = (deg) => {
    return deg * (Math.PI / 180.0);
};
function koordGT(lev_aste, pit_aste) {
    // Vakiot
    let f = 1 / 298.257222101; // Ellipsoidin litistyssuhde
    let a = 6378137; // Isoakselin puolikas
    let lambda_nolla = 0.471238898; // Keskimeridiaani (rad), 27 astetta
    let k_nolla = 0.9996; // Mittakaavakerroin
    let E_nolla = 500000; // Itäkoordinaatti
    // Kaavat
    // Muunnetaan astemuotoisesta radiaaneiksi
    let fii;
    fii = deg2rad(lev_aste);
    let lambda;
    lambda = deg2rad(pit_aste);
    let n = f / (2 - f);
    let A1 = a / (1 + n) * (1 + Math.pow(n, 2) / 4 + Math.pow(n, 4) / 64);
    let e_toiseen = 2 * f - Math.pow(f, 2);
    let e_pilkku_toiseen = e_toiseen / (1 - e_toiseen);
    let h1_pilkku = 1 / 2 * n - 2 / 3 * Math.pow(n, 2) + 5 / 16 * Math.pow(n, 3) + 41 / 180 * Math.pow(n, 4);
    let h2_pilkku = 13 / 48 * Math.pow(n, 2) - 3 / 5 * Math.pow(n, 3) + 557 / 1440 * Math.pow(n, 4);
    let h3_pilkku = 61 / 240 * Math.pow(n, 3) - 103 / 140 * Math.pow(n, 4);
    let h4_pilkku = 49561 / 161280 * Math.pow(n, 4);
    let Q_pilkku = Math.asinh(Math.tan(fii));
    let Q_2pilkku = Math.atanh(Math.sqrt(e_toiseen) * Math.sin(fii));
    let Q = Q_pilkku - Math.sqrt(e_toiseen) * Q_2pilkku;
    let l = lambda - lambda_nolla;
    let beeta = Math.atan(Math.sinh(Q));
    let eeta_pilkku = Math.atanh(Math.cos(beeta) * Math.sin(l));
    let zeeta_pilkku = Math.asin(Math.sin(beeta) / (1 / Math.cosh(eeta_pilkku)));
    let zeeta1 = h1_pilkku * Math.sin(2 * zeeta_pilkku) * Math.cosh(2 * eeta_pilkku);
    let zeeta2 = h2_pilkku * Math.sin(4 * zeeta_pilkku) * Math.cosh(4 * eeta_pilkku);
    let zeeta3 = h3_pilkku * Math.sin(6 * zeeta_pilkku) * Math.cosh(6 * eeta_pilkku);
    let zeeta4 = h4_pilkku * Math.sin(8 * zeeta_pilkku) * Math.cosh(8 * eeta_pilkku);
    let eeta1 = h1_pilkku * Math.cos(2 * zeeta_pilkku) * Math.sinh(2 * eeta_pilkku);
    let eeta2 = h2_pilkku * Math.cos(4 * zeeta_pilkku) * Math.sinh(4 * eeta_pilkku);
    let eeta3 = h3_pilkku * Math.cos(6 * zeeta_pilkku) * Math.sinh(6 * eeta_pilkku);
    let eeta4 = h4_pilkku * Math.cos(8 * zeeta_pilkku) * Math.sinh(8 * eeta_pilkku);
    let zeeta = zeeta_pilkku + zeeta1 + zeeta2 + zeeta3 + zeeta4;
    let eeta = eeta_pilkku + eeta1 + eeta2 + eeta3 + eeta4;
    // Tulos tasokoordinaatteina
    let N = A1 * zeeta * k_nolla;
    let E = A1 * eeta * k_nolla + E_nolla;
    let array = {
        "N": N,
        "E": E
    };
    return array;
}
exports.koordGT = koordGT;
// koordTG
//
// Muuntaa ETRS-TM35FIN -muotoiset tasokoordinaatit desimaalimuotoisiksi leveys- ja pituusasteiksi
//
// koordTG(106256.35958, 6715706.37705) --> array(2) { ["lev"]=> float(60.38510687197) ["pit"]=> float(19.848136766751) }
function koordTG(N, E) {
    // Vakiot  
    let f = 1 / 298.257222101;
    // Ellipsoidin litistyssuhde  
    let a = 6378137;
    // Isoakselin puolikas  
    let lambda_nolla = 0.471238898;
    // Keskimeridiaani (rad), 27 astetta  
    let k_nolla = 0.9996;
    // Mittakaavakerroin
    let E_nolla = 500000;
    // Itäkoordinaatti
    // Kaavat  
    let n = f / (2 - f);
    let A1 = a / (1 + n) * (1 + Math.pow(n, 2) / 4 + Math.pow(n, 4) / 64);
    let e_toiseen = 2 * f - Math.pow(f, 2);
    let h1 = 1 / 2 * n - 2 / 3 * Math.pow(n, 2) + 37 / 96 * Math.pow(n, 3) - 1 / 360 * Math.pow(n, 4);
    let h2 = 1 / 48 * Math.pow(n, 2) + 1 / 15 * Math.pow(n, 3) - 437 / 1440 * Math.pow(n, 4);
    let h3 = 17 / 480 * Math.pow(n, 3) - 37 / 840 * Math.pow(n, 4);
    let h4 = 4397 / 161280 * Math.pow(n, 4);
    let zeeta = N / (A1 * k_nolla);
    let eeta = (E - E_nolla) / (A1 * k_nolla);
    let zeeta1_pilkku = h1 * Math.sin(2 * zeeta) * Math.cosh(2 * eeta);
    let zeeta2_pilkku = h2 * Math.sin(4 * zeeta) * Math.cosh(4 * eeta);
    let zeeta3_pilkku = h3 * Math.sin(6 * zeeta) * Math.cosh(6 * eeta);
    let zeeta4_pilkku = h4 * Math.sin(8 * zeeta) * Math.cosh(8 * eeta);
    let eeta1_pilkku = h1 * Math.cos(2 * zeeta) * Math.sinh(2 * eeta);
    let eeta2_pilkku = h2 * Math.cos(4 * zeeta) * Math.sinh(4 * eeta);
    let eeta3_pilkku = h3 * Math.cos(6 * zeeta) * Math.sinh(6 * eeta);
    let eeta4_pilkku = h4 * Math.cos(8 * zeeta) * Math.sinh(8 * eeta);
    let zeeta_pilkku = zeeta - (zeeta1_pilkku + zeeta2_pilkku + zeeta3_pilkku + zeeta4_pilkku);
    let eeta_pilkku = eeta - (eeta1_pilkku + eeta2_pilkku + eeta3_pilkku + eeta4_pilkku);
    let beeta = Math.asin(1 / Math.cosh(eeta_pilkku) * Math.sin(zeeta_pilkku));
    let l = Math.asin(Math.tanh(eeta_pilkku) / Math.cos(beeta));
    let Q = Math.asinh(Math.tan(beeta));
    let Q_pilkku = Q + Math.sqrt(e_toiseen) * Math.atanh(Math.sqrt(e_toiseen) * Math.tanh(Q));
    for (let kierros = 1; kierros < 5; kierros++) {
        Q_pilkku = Q + Math.sqrt(e_toiseen) * Math.atanh(Math.sqrt(e_toiseen) * Math.tanh(Q_pilkku));
    }
    // Tulos radiaaneina
    let fii = Math.atan(Math.sinh(Q_pilkku));
    let lambda = lambda_nolla + l;
    // Tulos asteina
    fii = rad2deg(fii);
    lambda = rad2deg(lambda);
    let array = {
        "lev": fii,
        "pit": lambda
    };
    return array;
}
exports.koordTG = koordTG;
// koord_testi
//
// Testataan funktioiden toimivuus ja tarkkuus
//
function koord_testi() {
    //
    // Geodeettisista tasokoordinaateiksi
    //
    // Piste G4 (Geta)
    let fii = 60 + 23 / 60 + 6.38474 / 3600;
    // 60 astetta, 23 minuuttia, 06,38474 sekuntia
    let lambda = 19 + 50 / 60 + 53.29237 / 3600;
    // 19 astetta, 50 minuuttia, 53.29237 sekuntia
    // Koordinaatit radiaaneina
    let fii_r = deg2rad(fii);
    let lambda_r = deg2rad(lambda);
    // Muunnos
    let t_koord = koordGT(fii, lambda);
    // Ero esimerkin laskettuihin arvoihin
    let N_ero = (t_koord["N"] - 6715706.37708) * 1000;
    let E_ero = (t_koord["E"] - 106256.35961) * 1000;
    //
    // Tasokoordinaateiksi geodeettisiksi koordinaateiksi
    //
    // Pisteen tasokoordinaatit
    let N = 6715706.37705;
    let E = 106256.35958;
    // Muunnos
    let g_koord = koordTG(N, E);
    // Muunnoksen tulos
    let lev = g_koord["lev"];
    let pit = g_koord["pit"];
    // Tulos radiaaneina
    let lev_r = deg2rad(lev);
    let pit_r = deg2rad(pit);
    // Ero radiaaneina
    let lev_ero_r = lev_r - 1.0539189340845;
    let pit_ero_r = pit_r - 0.34641533700441;
    // Ero asteina  
    let lev_ero_d = lev - rad2deg(1.0539189340845);
    let pit_ero_d = pit - rad2deg(0.34641533700441);
    // Eroarvio millimetreinä
    // http://www.maanmittauslaitos.fi/kartat/koordinaatit/3d-koordinaatistot/suorakulmaiset-maantieteelliset-koordinaatistot
    // Leveysaste ~ 111.5 km, pituusaste Keski-Suomessa ~ 14 km  
    let lev_ero_m = lev_ero_d * 111.5 * 1000 * 1000;
    let pit_ero_m = pit_ero_d * 14 * 1000 * 1000;
}
