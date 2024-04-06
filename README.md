<h1 align="center">Application front-end de détection du port du masque</h1>

<p align="center"><a href="https://face-mask-classification-front-alexsavina.vercel.app" target="_blank"><i>https://face-mask-classification-front-alexsavina.vercel.app</i></a></p>

## Utilisation

- L'utilisateur sélectionne une image d'un visage couvert d'un masque ou non
- Soumettre le formulaire permet de réaliser une requête POST _multipart/form-data_
- L'API, conteneurisée avec Docker et déployée sur AWS FARGATE, reçoit la requête
- La requête est transmise au modèle de deep-learning pour l'inférence afin de déterminer si la personne sur l'image porte un masque
- La prédiction générée par le modèle est renvoyée au client
- Le résultat s'affiche dans une modale

![Schema de l'application!](/public/appresume.jpg "Fonctionnement de l'application")

## Technologies pour la partie front

- Framework React avec Next.js
- Tailwind pour le CSS
- Déploiement sur Vercel
