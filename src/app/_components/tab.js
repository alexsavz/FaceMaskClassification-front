import { useState } from "react";
import { Tab } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  let [categories] = useState({
    Utilisation: [
      {
        text: "Une API interagit avec le modèle de classification hébergé sur AWS",
      },
      {
        text: "Nous envoyons une requête POST à cette API avec une image en pièce jointe",
      },
      {
        text: "La requête est transmise au modèle pour l'inférence",
      },
      {
        text: "Celui-ci retourne une prédiction qui est envoyée au client",
      },
    ],
    Technos: [
      {
        text: (
          <p>
            Une <b>image docker</b>, contenant une API <b>fastAPI</b> et un
            modèle, est hébergée avec <b>AWS Fargate</b>
          </p>
        ),
      },
      {
        text: (
          <p>
            Le modèle est un Vision Transformer du framework <b>Pytorch</b>{" "}
            pré-entrainé sur le dataset ImageNet-1K
          </p>
        ),
      },
      {
        text: (
          <p>
            L&apos;application front-end est déployée sur <b>Vercel</b>, elle
            est conçue avec <b>Next.js</b> (React framework) et{" "}
            <b>Tailwind CSS</b>
          </p>
        ),
      },
    ],
    Liens: [
      {
        text: (
          <p>
            <b>Github</b> =&gt;{" "}
            <a
              className="text-gray-500 hover:text-gray-900"
              aria-label="Visit Alex Savina github"
              href="https://github.com/alexsavz?tab=repositories"
              target="_blank"
            >
              github.com/alexsavz
            </a>
          </p>
        ),
      },
      {
        text: (
          <p>
            <b>Front-end</b> =&gt;{" "}
            <a
              className="text-gray-500 hover:text-gray-900"
              aria-label="Visit application front-end"
              href="https://github.com/alexsavz/FaceMaskClassification-front"
              target="_blank"
            >
              github.com/alexsavz/FaceMaskClassification-front
            </a>
          </p>
        ),
      },
      {
        text: (
          <p>
            <b>Back-end</b> =&gt;{" "}
            <a
              className="text-gray-500 hover:text-gray-900"
              aria-label="Visit application back end"
              href="https://github.com/alexsavz/face-mask-classification"
              target="_blank"
            >
              github.com/alexsavz/face-mask-classification
            </a>
          </p>
        ),
      },
      {
        text: (
          <p>
            <b>LinkedIn</b> =&gt;{" "}
            <a
              className="text-gray-500 hover:text-gray-900"
              aria-label="Visit Alex Savina LinkedIn"
              href="https://www.linkedin.com/in/alex-savina-8a6482103/"
              target="_blank"
            >
              www.linkedin.com/in/alex-savina
            </a>
          </p>
        ),
      },
    ],
  });

  return (
    <div className="w-full max-w-xl px-2 py-16 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                  "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none",
                  selected
                    ? "bg-white text-blue-700 shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.values(categories).map((posts, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                "rounded-xl bg-white p-3 h-full min-h-64",
                "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none"
              )}
            >
              <ul className="mt-3 list-disc pl-5 space-y-6 text-slate-500 marker:text-sky-400">
                {posts.map((post, idx) => (
                  <li key={idx}>{post.text}</li>
                ))}
              </ul>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
