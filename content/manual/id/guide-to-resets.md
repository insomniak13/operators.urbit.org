+++
title = "Guide des réinitialisations d'usine"
weight = 40
template = "doc.html"
+++

Un concept important sur le réseau [Ames](https://developers.urbit.org/reference/arvo/ames/ames) est celui de la continuité. La continuité fait référence à la façon dont les vaisseaux se souviennent de l'ordre de leurs propres messages sur le réseau et de ceux des autres, ces messages sont numérotés, en partant de zéro. Une _réinitialisation d'usine_ consiste à ce que les vaisseaux du réseau acceptent d'oublier cette séquence et de traiter un ou plusieurs vaisseaux comme s'ils étaient tout neufs.

## Réinitialisations d’usine

Les vaisseaux du réseau Ames ont parfois besoin de réinitialiser leur continuité. Une réinitialisation d'usine (appelée par la suite _réinitialisation_) est le moment où un vaisseau individuel annonce au réseau : "J'ai oublié qui je suis, recommençons depuis le début." C'est-à-dire qu'il efface son propre journal d'événements et envoie une annonce au réseau, demandant à tous les vaisseaux qui ont communiqué avec lui de réinitialiser ses informations de réseau dans leur état. Cela donne l'impression que le vaisseau vient de démarrer pour la première fois, puisque tout le monde sur le réseau l'a oublié.

Les réinitialisations permettent souvent de résoudre les problèmes de connectivité, mais elles ne doivent être utilisées qu'en dernier recours. Avant de procéder à une réinitialisation, consultez les autres solutions possibles dans le [guide de dépannage des vaisseaux](https://operators.urbit.org/manual/os/ship-troubleshooting). Demandez également de l'aide dans le canal d'aide du groupe communautaire Urbit `~bitbet-bolbel/urbit-community` pour voir s'il existe une autre option. Les problèmes de connectivité sont généralement liés à un bug, et vous pouvez nous aider à le résoudre en nous envoyant un e-mail à `support@urbit.org`.

Il y a deux séquences distinctes dans l’ordre des actions que vous devez effectuer afin de réinitialiser un vaisseau. L'une est destinée au cas où vous souhaitiez conserver l'adresse de propriété Ethereum du vaisseau, et l'autre au cas où vous transféreriez le vaisseau vers une nouvelle adresse de propriété Ethereum. Nous mettons l'accent sur l'adresse de propriété Ethereum, car le changement de vos [proxies](https://developers.urbit.org/reference/glossary/proxies) ne nécessite pas de réinitialisation.

Si vous conservez votre vaisseau à la même adresse de propriété Ethereum et que vous souhaitez effectuer une réinitialisation, suivez les étapes ci-dessous.

- Allez sur [bridge.urbit.org](http://bridge.urbit.org/) et connectez-vous à votre identité.
- Cliquez sur `OS : Urbit OS Settings` en bas, puis cliquez sur `Reset Networking Keys`.
- Cochez la case `Breach Continuity`. Cliquez sur `Reset Networking Keys`, puis cliquez sur `Send Transaction` et attendez que la barre de progression apparaisse.
- Téléchargez votre nouveau fichier clé en suivant ces instructions : [Générez votre fichier de clé](https://operators.urbit.org/manual/id/using-bridge#generate-your-keyfile).
- Supprimez ou archivez votre ancien [ponton](https://developers.urbit.org/reference/glossary/pier).
- Procédez à l’[initialisation de votre vaisseau](https://urbit.org/getting-started/cli#boot-your-planet) avec le nouveau fichier de clé.
- Supprimez votre fichier clé après une initialisation réussie.
- Rejoignez vos canaux de discussion et vos abonnements préférés.

Si vous transférez un vaisseau vers une nouvelle adresse de propriété Ethereum, vous aurez le choix de réinitialiser ou non. Ceci est pour couvrir le cas où vous transféreriez vers une autre adresse que vous possédez. Le processus est ici un peu différent.

- Allez sur [bridge.urbit.org](http://bridge.urbit.org/) et connectez-vous à votre identité.
- Cliquez sur `ID : Identity and security settings` en bas, puis cliquez sur `Transfer this point`.
- Saisissez la nouvelle adresse Ethereum à laquelle vous souhaitez transférer la propriété. Cliquez sur `Generate & sign transaction`, puis cliquez sur `Send transaction` et attendez que la barre de progression se termine.
- Déconnectez-vous de votre session actuelle dans Bridge en cliquant sur `Logout` en haut, puis connectez-vous à votre nouvelle adresse de propriété.
- À partir de là, suivez les instructions pour [Accepter votre transfert](https://operators.urbit.org/manual/id/using-bridge#accept-your-transfer), [Définir vos clés de réseau](https://operators.urbit.org/manual/id/using-bridge#set-your-networking-keys), et [Générer votre fichier de clés]( Generate your keyfile). L'option de réinitialisation ou non se trouve dans l'étape Accepter votre transfert.
- Supprimez ou archivez votre ancien [ponton](https://developers.urbit.org/reference/glossary/pier))*.
- Procédez à [l’initialisation de votre vaisseau](https://urbit.org/getting-started/cli#boot-your-planet) avec le nouveau fichier clé.
- Supprimez votre fichier clé après une initialisation réussie.
- Rejoignez vos canaux de discussion et vos abonnements préférés.

## Réinitialisations du réseau

Les réinitialisations de réseau sont des événements au cours desquels tous les vaisseaux du réseau doivent être mis à jour vers une nouvelle ère de continuité. Les réinitialisations du réseau se produisent lorsqu'une mise à jour Arvo est publiée et ne peut pas être mise en œuvre via une [mise à jour OTA](https://developers.urbit.org/reference/glossary/ota-updates). L'époque de continuité est donnée par un nombre entier en Ames qui est incrémenté lorsque le réseau se réinitialise. Seuls les vaisseaux ayant la même valeur de ce type sont capables de communiquer entre eux. La dernière réinitialisation du réseau a eu lieu en décembre 2020, et nous pensons qu'il s'agit de la dernière.

Si une autre réinitialisation du réseau a lieu, nous fournirons une documentation d'accompagnement sur la marche à suivre pour transférer votre navire et toutes ses données vers la nouvelle ère.

## Brèches

Les réinitialisations d'usine étaient autrefois appelées "brèches", et vous trouverez peut-être cette terminologie encore utilisée dans certains endroits. Il s'agit d'un concept identique ; seul le nom diffère.
