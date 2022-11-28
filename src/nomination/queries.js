// F10 : Mettre à jour la motivation d'un lauréat avec un identifiant donné dans une année donnée et une catégorie donnée.
const updateMotivation = "UPDATE nominations SET motivation = $1 WHERE id_laureate = $2 AND id_prize = (SELECT id_prize FROM prizes WHERE year = $3 AND id_categorie = (SELECT id_categorie FROM categories WHERE label = $4))";

module.exports = {
    updateMotivation
}