// F4 : Lister toutes les catégories des prix nobel
const getCategories = "SELECT * FROM categories";

// F5 : Déterminez quelle catégorie a produit le plus grand nombre de lauréats du prix Nobel.
const getMostLaureatesCategory = "SELECT categories.label, COUNT(*) AS nb_lauréats FROM categories INNER JOIN prizes ON categories.id_categorie = prizes.id_categorie INNER JOIN nominations ON prizes.id_prize = nominations.id_prize GROUP BY categories.label ORDER BY nb_lauréats DESC LIMIT 1";
