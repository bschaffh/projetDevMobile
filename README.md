
# Projet Développement Mobile

Bienvenue sur le projet réalisé lors du cours de Développement Mobile dans le cadre du Master 2 Génie Informatique pendant l'année 2022-2023.




## Auteurs

- CHAIDON Arno
- SCHAFFHAUSER Bastien


## Fonctionnalités

Notre application propose de rechercher des lieux d'intérêts autour de soi. Pour cela, il est possible de lancer une recherche en spécifiant plusieurs critères. 

Ces lieux d'intérêts peuvent êtres des restaurants, bars, cinémas mais également médecins, supermarchés, etc.

Voici les fonctionnalités proposées : 

- Chercher des lieux d'intérêts autour de soi avec les critères suivants :
    * Mots clés rechchés
    * Catégories
    * Distance maximum des lieux d'intérêts
- Visualiser ces lieux sur une carte interactive. Le déplacement de la carte recharge les lieux dans la zone visualisée, en utilisant les mêmes critères de recherche.
- Visualiser les détails d'un lieu  d'intérêt et avoir la possibilité de :
    * L'ajouter et la retirer des favoris (un message de type 'toast' validant l'action)
    * Appeler directement le lieu d'intérêt en cliquant sur le numéro (si le numéro est fourni)
    * Obtenir un itinéraire vers le lieu d'intérêt dans l'application Google Maps, en cliquant sur son adresse
- Visualiser la liste des favoris enregistrés

Une recherche sans catégories ni mots clés renvoie 30 lieux d'intérêts parmi les meilleurs (les mieux notés) autour de soi.

Si on mets plusieurs catégories, la recherche se fera en faisant un "OU inclusif" sur les catégories.

La distance maximale de recherche est de 40km (si on mets plus, ça sera considéré comme 40km par l'application).

Cliquer sur un marqueur sur la carte ouvre une popup, et cliquer sur cette popup nous redirige vers la page de détails du lieu d'intérêt.







## Caractéristiques techniques
L'API utilisée est [Yelp](https://docs.developer.yelp.com/). La clé est stockée en dur dans le fichier /api/yelpAPI.js et le nombre de requêtes maximum par jour est de 5000.

Cette API est gratuite et nous fournit les catégories de lieux d'intérêts ainsi que les lieux d'intérêts eux-même.

- La localisation est trouvée à partir de l'API expo-location 
- La carte est la carte de la librairie react-native-maps, à savoir le composant MapView
- Pour la page de recherche, nous avons utilisé des librairies existantes afin de simplifier les d'input : 
    * [react-native-numeric-input](https://www.npmjs.com/package/react-native-numeric-input)
    * [react-native-sectioned-multi-select](https://github.com/renrizzolo/react-native-sectioned-multi-select)
## Remarques

Pour la 



