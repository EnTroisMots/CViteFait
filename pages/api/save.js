import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method === "POST") {
    const newData = req.body;

    // Chemin vers le fichier JSON dans le dossier public
    const jsonFilePath = path.join(process.cwd(), "public", "baseDeDonne.json");

    // Écrire les nouvelles données dans le fichier JSON
    fs.writeFile(jsonFilePath, JSON.stringify(newData, null, 2), (err) => {
      if (err) {
        console.error("Erreur lors de la sauvegarde des données :", err);
        return res.status(500).json({ message: "Erreur lors de la sauvegarde des données." });
      }
      res.status(200).json({ message: "Données sauvegardées avec succès !" });
    });
  } else {
    res.status(405).json({ message: "Méthode non autorisée." });
  }
}