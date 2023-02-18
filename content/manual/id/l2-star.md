+++
title = "Layer 2 for stars"
weight = 60
template = "doc.html"
+++

Voici un bref résumé des trois options possibles pour les propriétaires d’étoiles concernant l'utilisation de la [couche 2](https://developers.urbit.org/reference/glossary/rollups).

## Voyage à sens unique

Les étoiles ont trois options en ce qui concerne la couche 2 :

- Couche 1
- Couche 1 avec proxy de génération de couche 2
- Couche 2

Une étoile sur couche 1 peut se déplacer vers la couche 1 avec le proxy de génération sur couche 2, ou vers la couche 2. Une étoile de la couche 1 avec un proxy de génération de couche 2 peut se déplacer vers la couche 2. Aucune de ces actions n'est actuellement réversible.

Le déplacement entre les couches n'a aucun effet sur le statut de parrainage de l'un de ses filleuls, ni sur son statut de parrainage avec sa galaxie. Il n'a également aucun effet sur les planètes engendrées par l'étoile avant le déplacement entre les couches.

## Couche 1

Une étoile sur la couche 1 effectue toutes les actions liées à l'Urbit ID sur la couche 1, à l'exception des actions de parrainage, qui peuvent être effectuées sur n'importe quelle couche.

## Couche 1 avec proxy de génération de la couche 2

Une étoile sur la couche 1 avec un proxy de génération de couche 2 peut générer des planètes sur la couche 2 en utilisant soit leur proxy de propriété, soit leur proxy de génération. Elle ne pourra plus générer de planètes sur la couche 1. Elles peuvent également effectuer des actions de parrainage sur l'une des deux couches, identiques à celles des étoiles de la couche 1.

## Couche 2

Une étoile de la couche 2 doit effectuer toutes les actions liées à l'Urbit ID sur la couche 2. Toutes les planètes générées par l'étoile seront sur la couche 2.
