+++
title = "Utilisation de Bridge"
template = "doc.html"
description = "Comment utiliser Bridge pour interagir avec Azimuth et gérer votre identifiant Urbit."
weight = 7
aliases = ["/docs/getting-started/using-bridge/"]
+++

[Bridge](https://github.com/urbit/bridge) est l'application que nous avons construite pour interagir avec [Azimuth](https://azimuth.network), les clés privées Urbit et pour gérer votre Urbit ID. Bridge vous permet également de générer un fichier clé dont vous aurez besoin pour initialiser votre vaisseau afin qu'il puisse utiliser le réseau Arvo.

Ce guide suppose que vous avez déjà une Urbit ID, ou que vous avez trouvé quelqu'un pour envoyer une Urbit ID à votre adresse Ethereum et vous cherchez à la réclamer.

### Bridge héberger

Pour vous connecter à Bridge, rendez-vous sur [https://bridge.urbit.org](https://bridge.urbit.org/) dans votre navigateur, et entrez les informations d'identification de votre identité dans les champs appropriés. Si vous avez été invité à réclamer une Urbit ID , il est très probable que vous ayez reçu un e-mail vous dirigeant vers Bridge, et vous pouvez simplement suivre le lien dans cet e-mail.
Vous arriverez sur une page vous offrant deux choix principaux : `ID` et `OS`. `OS` est la seule option qui vous intéresse pour le moment ; cliquez dessus. Sur la page `OS`, cliquez sur le bouton `Download Arvo Keyfile`. Une fois que vous avez téléchargé le fichier clé, vous pouvez quitter Bridge et procéder à [l'installation du binaire Urbit](https://urbit.org/getting-started/).

### Bridge local
Il est également possible d'exécuter Bridge localement. C'est plus compliqué, mais nous recommandons cette option pour gérer des actifs suffisamment précieux, comme plusieurs étoiles ou plus. Pour installer Bridge localement, et vous diriger vers la [page de publication sur GitHub](https://github.com/urbit/bridge/releases/). Téléchargez le fichier `.zip` de la version la plus récente. Après l'avoir téléchargé, suivez les instructions ci-dessous.

Pour utiliser Bridge :

- Décompressez le fichier .zip que vous avez téléchargé (bridge-$version.zip).
- Ouvrez votre interface de ligne de commande (Terminal sur X, Command Prompt sur Windows).
- Naviguez vers le répertoire bridge-$version, où $version est le numéro de version approprié.
- Exécutez cette commande : `python3 -m http.server 5000 --bind 127.0.0.1.`

Vous pouvez ensuite utiliser l'application Bridge en accédant à `http://localhost:5000` dans votre navigateur Internet.

### Se connecter

Une fois le programme exécuté dans votre navigateur, suivez les étapes présentées en fonction du type de portefeuille dont vous disposez. Plusieurs options de connexion vous seront proposées. Une option intéressante est Urbit Master Ticket qui est dédiée à ceux qui ont utilisé notre Wallet Generator. Si vous avez acheté des points lors d'une vente Urbit et que vous avez ensuite utilisé le Wallet Generator, vos clés de réseau seront définies pour vous. Toutes les autres options de connexion vous demanderont de définir vos propres clés de réseau.

Remarque : Bridge vous permet d'effectuer, de lire et d’écrire sur la blockchain Ethereum. L'écriture sur la blockchain, comme le changement de vos clés de réseau, entraînera un coût de transaction nécessitant que vous disposiez de quelques ETH dans le wallet avec lequelle vous vous connectez.

### Accepter votre transfert

Si vos points vous ont été attribués par Tlon, il est probable que vous les possédiez déjà en totalité. Mais si quelqu'un d'autre vous a envoyé un point, vous devrez d'abord utiliser Bridge pour accepter ce transfert.

Après avoir accédé à votre adresse Ethereum, si un point a été envoyé à cette adresse, vous arriverez à une page avec un en-tête `Incoming Transfers`, sous lequel se trouve un graphique. Cliquez sur le lien `Détails ->` situé sous le graphique

Vous êtes maintenant sur la page de gestion de votre point. Si le transfert n'est pas encore terminé, alors cliquez sur `Accept Incoming Transfer`. Si vous effectuez un transfert vers vous-même et que vous ne souhaitez pas effectuer une réinitialisation d’usine avec les paramètres [par défaut](https://developers.urbit.org/reference/glossary/reset), cochez la case intitulée `Retain proxies and key configuration, in case of transferring to self, in case of transfer to self`. Sinon, laissez la case décochée, afin que votre vaisseau soit réinitialisé avec les paramètres d’usine avec les paramètres par défaut lors du transfert et qu'aucune donnée Azimuth du propriétaire précédent (à savoir les proxies et les clés de réseau) ne soit conservée. Appuyez ensuite sur le bouton `Generate and Sign Transaction`, puis sur le bouton `Send Transaction`.

Si vous possédez déjà un point, cliquez sur le bouton `Détails ->` sous votre sigle dans la section `Your Points`.

### Définissez vos clés de réseau

Si vous venez d'accepter un point, vous serez renvoyé à l’écran relatif à vos points. Remarquez que les liens et les boutons sont maintenant cliquables. Maintenant, ce point vous appartient !

Cliquez sur le lien `Set network keys`. Le champ présenté dans la page qui s’affiche attend une chaîne hexadécimale de 32 octets. S'il est déjà rempli, aucune action n'est requise. S'il est vide, vous devrez générer la chaîne. Vous pouvez générer ces données comme bon vous semble, mais dans le terminal sous MacOS ou Linux, vous pouvez écrire

```sh
hexdump -n 32 -e '4/4 "%08X"' /dev/random
```

et utiliser le résultat.

Il convient de noter que la définition de vos clés de réseau est un événement sur le réseau Ethereum et coûtera donc une quantité triviale, mais non nulle, de [gas](https://eth.wiki/en/fundamentals/design-rationale#gas-and-fees) pour être réalisée.

### Générer votre fichier clé

Depuis la page de détails associée à votre point, cliquez sur le lien `Generate Arvo Keyfile` et vous serez dirigé vers une page avec un champ intitulé `Network seed`. Ce champ devrait déjà être rempli et correspondre à la chaîne hexadécimale que vous avez saisie lors de l'étape précédente. S'il n'est pas rempli ou ne correspond pas, remplissez-le avec la chaîne correcte. Cliquez sur `Generate ->`, ce qui téléchargera un fichier de clé sur votre machine.

Avec ce fichier clé en main, vous pouvez maintenant quitter Bridge et continuer à suivre le [guide d’installation de l’exécutable d’Urbit](https://urbit.org/getting-started/).

### Se détachez de son parrain {% #détachez-de-son-parrain %}

En tant que planète ou étoile, vous avez un intérêt à être parrainé par une étoile ou une galaxie active, respectivement. Si votre parrain ne répond pas à vos besoins, vous pouvez vous détachez vers un autre parrain.

#### Conditions préalables

- Avoir un peu d’ETH dans votre adresse de gestion proxy afin de payer la transaction, ou les frais de transaction.
- L'`@p`du parrain vers lequel vous voulez vous détacher. Vous devez négocier le transfert avec le parrain à l'avance, car il devra l'accepter de son côté. Si vous n'en trouvez pas, contactez Tlon à [support@urbit.org](mailto:support@urbit.org) et nous vous aiderons à vous détacher vers l'une de nos étoiles/galaxies.

#### Instructions

1. Connectez-vous à [Bridge](https://bridge.urbit.org) avec l'adresse proxy  du vaisseau qui va échapper à son parrain. L'adresse du propriétaire fera également l'affaire, tout comme le ticket principal si vous l'avez.
2. Cliquez sur le bouton "OS" en bas de l'écran.
3. Sous l’onglet Network, vous trouverez l'`@p` de votre parrain actuel. Cliquez sur "Change" à droite de celui-ci.
4. Entrez l'`@p` de votre nouveau parrain.
5. Cliquez sur le bouton "Request", puis effectuez la transaction.

Cette action consommera une petite quantité d'ETH. Votre parrain devra ensuite vous accepter via un processus similaire dans Bridge, nécessitant de l'ETH de sa part. Une fois la transaction effectuée sur Ethereum, il faudra encore un certain temps pour que l'information se propage sur le réseau Urbit. Après environ 30 minutes, vous pouvez vérifier que votre parrain a été modifié avec succès en exécutant `(sein:title our now our)` dans le dojo et en confirmant que le `@p` correspond à celui de votre nouveau parrain.

Une fois que vous avez changé de parrain, vous voudrez probablement changer votre source d'[OTAs](https://developers.urbit.org/reference/glossary/ota-updates). Pour ce faire, entrez `|ota ~sponsor %kids` dans le dojo, où `~sponsor%kids` est le `@p` de votre nouveau parrain.
