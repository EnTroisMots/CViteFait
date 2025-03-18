import { FaCloudUploadAlt, FaCloudDownloadAlt } from "react-icons/fa";
import React, { useContext } from "react";
import { ResumeContext } from "../../pages/builder";

const LoadUnload = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);

  // Chemin vers le fichier JSON dans le dossier public
  const jsonFilePath = "/baseDeDonne.json";

  // Charger les données depuis le fichier JSON
  const loadFromCentralizedFile = async () => {
    try {
      const response = await fetch(jsonFilePath);
      const data = await response.json();
      setResumeData(data);
      alert("Données chargées avec succès !");
    } catch (error) {
      console.error("Erreur lors du chargement des données :", error);
      alert("Erreur lors du chargement des données.");
    }
  };

  // Sauvegarder les données dans le fichier JSON via l'API route
  const saveToCentralizedFile = async () => {
    try {
      const response = await fetch("/api/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resumeData),
      });
      if (response.ok) {
        alert("Données sauvegardées avec succès !");
      } else {
        throw new Error("Erreur lors de la sauvegarde.");
      }
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des données :", error);
      alert("Erreur lors de la sauvegarde des données.");
    }
  };

  // Charger un fichier JSON local
  const handleLoad = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const resumeData = JSON.parse(event.target.result);
      setResumeData(resumeData);
      alert("Données locales chargées avec succès !");
    };
    reader.readAsText(file);
  };

  // Télécharger un fichier JSON local
  const handleDownload = (data, filename, event) => {
    event.preventDefault();
    const jsonData = JSON.stringify(data);
    const blob = new Blob([jsonData], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  return (
    <div className="flex flex-wrap gap-4 mb-2 justify-center">
      {/* Charger depuis le fichier centralisé */}
      <div className="inline-flex flex-row items-center gap-2">
        <h2 className="text-[1.2rem] text-white">Charger depuis le serveur</h2>
        <button
          aria-label="Charger depuis le serveur"
          className="p-2 text-white bg-fuchsia-700 rounded"
          onClick={loadFromCentralizedFile}
        >
          <FaCloudDownloadAlt className="text-[1.2rem] text-white" />
        </button>
      </div>

      {/* Sauvegarder dans le fichier centralisé */}
      <div className="inline-flex flex-row items-center gap-2">
        <h2 className="text-[1.2rem] text-white">Sauvegarder sur le serveur</h2>
        <button
          aria-label="Sauvegarder sur le serveur"
          className="p-2 text-white bg-fuchsia-700 rounded"
          onClick={saveToCentralizedFile}
        >
          <FaCloudUploadAlt className="text-[1.2rem] text-white" />
        </button>
      </div>

      {/* Charger un fichier local */}
      <div className="inline-flex flex-row items-center gap-2">
        <h2 className="text-[1.2rem] text-white">Charger un fichier local</h2>
        <label className="p-2 text-white bg-fuchsia-700 rounded cursor-pointer">
          <FaCloudUploadAlt className="text-[1.2rem] text-white" />
          <input
            aria-label="Charger un fichier local"
            type="file"
            className="hidden"
            onChange={handleLoad}
            accept=".json"
          />
        </label>
      </div>

      {/* Télécharger un fichier local */}
      <div className="inline-flex flex-row items-center gap-2">
        <h2 className="text-[1.2rem] text-white">Télécharger un fichier local</h2>
        <button
          aria-label="Télécharger un fichier local"
          className="p-2 text-white bg-fuchsia-700 rounded"
          onClick={(event) =>
            handleDownload(
              resumeData,
              resumeData.name + " by ATSResume.json",
              event
            )
          }
        >
          <FaCloudDownloadAlt className="text-[1.2rem] text-white" />
        </button>
      </div>
    </div>
  );
};

export default LoadUnload;