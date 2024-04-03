"use client";
import Image from "next/image";
import { useState } from "react";

import axios from "axios";

import maskExemple from "../../public/mask-exemple.jpg";

export default function Home() {
  const [imageUrl, setImageUrl] = useState(maskExemple);
  const [image, setImage] = useState(null);
  const [filename, setFilename] = useState("");
  const [content_type, setContent_type] = useState("");
  const [prediction, setPrediction] = useState("");

  // formulaire POST utilisant l'API AWS
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      // FormData pour envoyer le body de la requête multipart/form-data
      const formData = new FormData();
      formData.append("file", image);
      formData.append("filename", filename);
      formData.append("content_type", content_type);
      await axios
        .post(`${process.env.NEXT_PUBLIC_AWS_API}`, formData)
        .then((response) => {
          setPrediction(response.data);
        });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 text-slate-700">
      <h1 className="text-4xl font-bold">Application de démonstration :</h1>
      <h1 className="text-4xl font-bold my-2">
        Détecter le port du masque chirurgical
      </h1>
      <p className="mt-3 text-2xl">
        Postez l&apos;image d&apos;un visage pour obtenir une prédiction
        réalisée par un modèle de deep-learning.
      </p>
      <div className="max-w-3xl mx-auto my-8 bg-white shadow py-8 px-8 rounded-xl">
        <h2 className="text-base font-semibold text-slate-700">
          &Eacute;tapes préalables à l&apos;inférence :
        </h2>
        <ul className="mt-3 list-disc pl-5 space-y-3 text-slate-500 marker:text-sky-400">
          <li>Développement d&apos;une API pour intéragir avec le modèle</li>
          <li>L&apos;application est conteneurisée avec Docker</li>
          <li>L&apos;image Docker est déployée sur AWS Fargate</li>
          <li>Nous envoyons une requête à cette API</li>
          <li>La requête est transmise au modèle pour l&apos;inférence</li>
          <li>La prédiction est envoyée au client, ici</li>
        </ul>
      </div>
      <p className="mt-3 text-2xl">
        Le modèle est entraîné sur 308 images et réalise 93% de bonnes
        prédictions sur un échantillon de test de 44 images.
      </p>
      {/* <Image
        src="/votre-image-d-exemple.jpg" // Mettez le chemin de votre image d'échantillon
        alt="Échantillon"
        width={500}
        height={300}
        className="my-5"
      /> */}

      {/* Formulaire POST avec l'image sélectionnée */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center space-x-6 my-4"
      >
        <div className="flex flex-row items-center">
          <div className="shrink-0 px-4 py-2">
            <Image
              className="h-24 w-24 object-cover rounded-full"
              src={imageUrl}
              alt="Current profile photo"
              width={500}
              height={500}
            />
          </div>
          <input
            type="file"
            onChange={(e) => {
              let file = e.target.files[0];
              if (file && file.type.substring(0, 5) === "image") {
                const url = URL.createObjectURL(file); // Utilise l'url temporaire créée pour afficher l'image sélectionnée
                setImageUrl(url);
              } else {
                setImageUrl(maskExemple);
              }
              setImage(e.target.files[0]);
              setFilename(e.target.files[0].name);
              setContent_type(e.target.files[0].type);
            }}
            className="block w-full text-sm text-slate-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-violet-50 file:text-violet-700
        hover:file:bg-violet-100
      "
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Soumettre
        </button>
      </form>

      {/* Afficher le résultat de la prédiction */}
      {prediction && (
        <div className="mt-5">Résultat de la prédiction : {prediction}</div>
      )}
    </div>
  );
}
