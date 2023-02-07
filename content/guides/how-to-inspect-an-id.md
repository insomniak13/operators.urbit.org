+++
title = "Comment inspecter une ID"
description = "Les Urbit ID débloque l’accès à tout un monde numérique, et bien qu'il s'agisse de NFT, ils sont bien plus que votre typique œuvre d'art numérique."
+++

Il existe cinq types différents d'Urbit ID – galaxies, étoiles, planètes, lunes, comètes – mais seuls les trois premiers sont pertinents pour les besoins de ce guide (les lunes et les comètes **ne doivent jamais être achetées**). Pour un aperçu détaillé de la fonction de chaque ID, consultez le [Guide de l’acheteur d’Urbit ID](/guides/which-id-should-i-buy).

Une des choses les plus importantes à comprendre à propos des Urbit ID (”ID”) est qu’elles sont destinées à être utilisés pour alimenter un système d’exploitation, au sein duquel leur propriétaire interagir avec un réseau plus large composé d’autres propriétaires d’ID (”propriétaires”). Un propriétaire peut prendre des mesures qui affectent de façon permanente l'état de l'ID, et leurs interactions avec d'autres propriétaires sur le réseau peuvent conférer une réputation à l'ID. Dans le reste de ce guide, nous discuterons des meilleures manières de déterminer le statut d’une ID.

Tout au long de ce guide, nous allons faire usage de l’[Urbit Network Explorer](https://network.urbit.org/). 

## Planètes

Lors de l’évaluation d’une planète, vous voudrez considérer les éléments suivants : 

- Si la planète a été générée (spawn)
- Si la planète a été initialisée
- Si la planète a un parrain en ligne

### Statut de génération

Une planète qui n’a pas encore été généré ne peut être acquise. Si quelqu’un essaie de vous vendre une planète qui n’a pas été générée, il ne faut pas lui faire confiance.

Voici un exemple d’une planète non générée : https://network.urbit.org/~sampel-palnet

Notez l'absence d'un événement de **génération** dans la zone **Azimuth Event Stream** à droite de l'écran.

### Initialiser ou non Initialiser

Lors de l'achat d'une planète, il est préférable d'en acheter une qui n'a jamais été mise sur le réseau, communément appelée *non initialisée*.

Une planète qui a été initialisée a été amenée sur le réseau et nous pouvons supposer qu'elle a interagi avec d'autres vaisseaux. Cela signifie qu'elle peut avoir acquis une réputation, bonne ou mauvaise, qui vous sera conférée en tant que nouveau propriétaire. *Il est préférable de ne pas avoir le bagage d’une réputation existante lors de l’acquisition d’une nouvelle planète*.

Utilisez [Urbit Network Explorer](https://network.urbit.org) pour déterminer si une planète a déjà été initialisée ou non en vérifiant la **version de la clé** (key revision).

La planète [`~pannex-pidrup`](https://network.urbit.org/~pannex-pidrup) a été initialisée, mais a une version clé de `0`, signifiant que vous pouvez être sûr qu'elle n'a jamais été sur le réseau. En revanche, [`~riprud-tidmel`](https://network.urbit.org/~riprud-tidmel) a une version de clé de `1`, ce qui signifie qu'elle a probablement été initialisé.

### Statut du Parrain

Les planètes sont destinées à être utilisées, et pour qu'une planète soit utile, elle doit avoir un parrain en ligne. Les parrains sont chargés de distribuer les mises à jour logicielles et d’effectuer la découverte des autres propriétaires de son réseau de planètes (dont les détails sont abordés [ici](#TODO)). Ce sont des fonctions nécessaires à l’utilisation de votre planète. Ces fonctions ne pouvant être reçues par un parrain hors ligne.

Pour trouver le parrain d'une planète donnée, considérez l'exemple précédent de `~pannex-pidrup` dans l'Explorateur du Réseau :

![sponsor chain](https://storage.googleapis.com/media.urbit.org/operators/sponsor-chain.png)

Le parrain peut être trouvé dans **Sponsor Chain** (Parrain Chaîne), qui dans ce cas est `~siddef`.

Un **parrain en ligne** est une étoile qui a été initialisé et qui s’exécute sur le réseau. Au moment de la rédaction (octobre 2021), il n'y avait aucun moyen direct de déterminer si une étoile était en ligne ou non à l'aide de l'Explorer. Cependant maintenant il existe plusieurs moyen.

Premièrement, vérifiez si l'étoile a été initialisée. Si elle n'a pas initialisé, elle ne peut être en ligne (voir ci-dessus). [Cette étoile](https://network.urbit.org/~foddef) n'a jamais été initialisée, puisqu'elle a une version clé de 0, alors que [cette étoile](https://network.urbit.org/~litzod) a été initialisée.

Deuxièmement, vérifiez si l'étoile parraine activement d'autres planètes. Plus il y a de planètes parrainent, plus il y a de chances que l'étoile fournisse un service de qualité, signifiant qu'elle est en ligne la plupart du temps. Voici un [exemple d’étoile](https://network.urbit.org/~litzod) qui semble fournir un bon service puisqu’elle a de nombreuses planètes enfants sous parrainage.

Enfin, si vous voulez vraiment être sûr, vous pouvez [initialiser une comète](https://urbit.org/getting-started) et utiliser `|hi~sampel` (où `~sampel` est l’étoile en question) afin de déterminer si l’étoile est en ligne *en ce moment*. Si la réponse est `~sampel est ok`, alors `~sampel` est en ligne.

## Étoiles

Lors de l’évaluation d’une étoile, vous pourriez considérer si elle a ou non :

- Été générée
- Été initialisée
- Un parrain en ligne
- Générée des Planètes

L'évaluation des points 1-3 ci-dessus sont fondamentalement similaires à ceux des planètes pour les mêmes raisons. La seule différence est que pour vérifier un parrain en ligne, vous allez plutôt vérifier la galaxie à la place de l'étoile. 

## Planètes initialisées ou générées

La valeur d’une étoile diminue significativement si elle a été initialisée ou si elle a généré des planètes. Si elle a été initialisée ou si elle s’est engagée dans une quelconque génération de planètes, elle ne peut plus être enveloppée (wrap) par [WSTR](https://star.market).

Même si la norme d’une étoile est ERC-721, la présence de planètes initialisées indique que l’étoile n’est plus en état de “mint”. C’est comme conduire une voiture hors piste.

La façon la plus simple de vérifier si une étoile a généré des planètes est directement via Etherscan :

Naviguez jusqu'au contrat Azimuth : https://etherscan.io/address/azimuth.eth#readContract
Faites défiler jusqu'au numéro 16, `getSpawnCount`
Entrez le point number (mentionné dans l’explorer) dans le champ, et appuyez sur **Query**

Par exemple, utilisons l’étoile `~siddef`:

![point-number](https://storage.googleapis.com/media.urbit.org/operators/point-number.png)

Le point number est 30 645, que nous mettons dans Etherscan :

![getSpawnCount](https://storage.googleapis.com/media.urbit.org/operators/getSpawnCount.png)

Cette étoile a en effet généré à des planètes. Si une étoile n'a pas généré de planètes, ce nombre sera de 0.

## Galaxies

Les galaxies sont rares et de grande valeur, et l'enjeu de les acheter est beaucoup plus élevé. La plupart des galaxies ont des étoiles dans le contrat de libération linéaire, distribuant les étoiles à leur propriétaire selon un calendrier linéaire jusqu'en 2024.

En raison de la complexité inhérente à l’achat d’une Galaxie, nous vous recommandons de contacter `~wolref-podlex` de la Fondation Urbit pour obtenir de l’aide.


