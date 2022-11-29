// F1 : Lister tous les lauréats (id, prénom, nom).
const getLaureates = "SELECT * FROM laureates";

// F2 : Étant donné un identifiant, affichez les informations du lauréat avec cet identifiant (prénom, nom, les prix remportés).
const getLaureate = "SELECT laureates.firstname, laureates.surname FROM laureates WHERE laureates.id_laureate = $1";
const getPrizeByLaureate = "SELECT prizes.year, nominations.motivation FROM laureates INNER JOIN nominations ON laureates.id_laureate = nominations.id_laureate INNER JOIN prizes ON nominations.id_prize = prizes.id_prize WHERE laureates.id_laureate = $1";


// F3 : Combien ont remporté plus d'un prix Nobel ?
const getLaureatesWithMoreThanOnePrize = "SELECT laureates.firstname, laureates.surname, COUNT(*) AS nb_prix FROM laureates INNER JOIN nominations ON laureates.id_laureate = nominations.id_laureate GROUP BY laureates.id_laureate, laureates.firstname, laureates.surname HAVING COUNT(*) > 1";

// F9 : Supprimer un lauréat avec un identifiant donné.
const deleteLaureate = "DELETE FROM laureates WHERE id_laureate = $1";


module.exports = {
    getLaureates,
    getLaureate,
    getLaureatesWithMoreThanOnePrize,
    deleteLaureate,
    getPrizeByLaureate
};