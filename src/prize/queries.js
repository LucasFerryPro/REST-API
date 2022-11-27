// F6 : Pour chaque année, indiquez combien de lauréats avaient remporté un prix nobel.
const getNbLaureatesByYear = "SELECT prizes.year, COUNT(*) AS nb_lauréats FROM prizes INNER JOIN nominations ON prizes.id_prize = nominations.id_prize GROUP BY prizes.year ORDER BY prizes.year";

// F7 : Afficher toutes les années au cours desquelles aucun prix Nobel n'a été décerné
const getYearsWithNoPrize = "SELECT prizes.year FROM prizes LEFT JOIN nominations ON prizes.id_prize = nominations.id_prize WHERE nominations.id_laureate IS NULL";

// F8 : Afficher toutes les années de prix nobel triées par nombre de lauréats ascendant/descendant
const getYearsByNbLaureates = "SELECT prizes.year, COUNT(*) AS nb_lauréats FROM prizes INNER JOIN nominations ON prizes.id_prize = nominations.id_prize GROUP BY prizes.year ORDER BY nb_lauréats DESC";
