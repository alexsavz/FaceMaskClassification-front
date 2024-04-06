"use client";
import Image from "next/image";
import { useState } from "react";

import axios from "axios";

import maskExemple from "../../public/mask-exemple.jpg";
import Modal from "./_components/modal";
import Tab from "./_components/tab";
import Footer from "./_components/footer";

export default function Home() {
  const [imageUrl, setImageUrl] = useState(maskExemple);
  const [image, setImage] = useState(null);
  const [filename, setFilename] = useState("");
  const [content_type, setContent_type] = useState("");
  const [prediction, setPrediction] = useState("");
  const [isLoading, SetIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  // formulaire POST utilisant l'API AWS
  const handleSubmit = async (event) => {
    SetIsLoading(true);
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
          setOpenModal(true);
        });
    } catch (error) {
      alert(error.message);
    }
    SetIsLoading(false);
  };

  return (
    <div className="max-w-screen-2xl m-auto p-5">
      <div className="flex flex-col items-center justify-center min-h-screen py-2 text-slate-700">
        <h1 className="text-5xl font-bold text-slate-900">
          Application de démonstration :
        </h1>
        <h1 className="text-5xl font-bold my-2 text-slate-900">
          Détecter le port du masque chirurgical
        </h1>
        <p className="mt-3 text-2xl">
          Postez l&apos;image d&apos;un visage pour obtenir une prédiction
          réalisée par un modèle de deep-learning.
        </p>
        {}
        <Tab />

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
            {isLoading ? (
              <div className="flex">
                <svg
                  class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <p>Prédiction en cours</p>
              </div>
            ) : (
              <p>Soumettre</p>
            )}
          </button>
        </form>

        {/* Affiche le résultat de la prédiction dans une modale */}
        <Modal
          openModal={openModal}
          setOpenModal={setOpenModal}
          prediction={prediction}
        />
      </div>
      <Footer></Footer>
    </div>
  );
}
