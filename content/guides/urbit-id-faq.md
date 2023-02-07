+++
title = "FAQ Urbit ID"
description = "Questions fréquemment posées à propos des Urbit ID."
+++



## What is Urbit ID?

Urbit ID est le système d'identité utilisé par Urbit, qui associe à chaque [vaisseau](https://developers.urbit.org/reference/glossary/ship) une clé publique ainsi qu’une clé privée servant à établir des connexions cryptées entre elles et à protéger les données privées. Pour les [planètes](https://developers.urbit.org/reference/glossary/planet), les [étoiles](https://developers.urbit.org/reference/glossary/star), et les [galaxies](https://developers.urbit.org/reference/glossary/galaxy), ceci est réalisé via un ensemble de contrats intelligents Ethereum appelés [Azimuth](https://developers.urbit.org/overview/azimuth). Les clés pour les [lunes](https://developers.urbit.org/reference/glossary/moon) et les [comètes](https://developers.urbit.org/reference/glossary/comet) sont gérées à l’intérieur d’Urbit.

## Que sont les étoiles, les galaxies et les planètes ?

Les Urbit ID se divisent en trois catégories : galaxies, étoiles et planètes. La longueur du nom d’une identité vous annonce sa classe. Les galaxies font 8 bits et ont des noms comme `~mul`. Les galaxies génèrent des étoiles de 16 bits (`~dacmul`), pouvant elles-mêmes générer des planètes de 32 bits (`~laptel-holfur`).

Les planètes sont destinées à un usage quotidien par les individus, et il y en a 4,3 milliards (2^32). Les étoiles et les galaxies, quant à elles, sont destinées à servir d'infrastructure réseau : sur le réseau [Urbit OS](https://developers.urbit.org/overview/arvo), elles fournissent le routage et sont responsables de la distribution des mises à niveau du logiciel.

## Comment puis-je dépenser moins pour avoir une planète ?

L’utilisation d’Ethereum est devenu beaucoup plus cher depuis qu’Urbit ID ait été lancé. Pour y remédier, Tlon a créé un système similaire à un [rollups naïfs](https://developers.urbit.org/reference/glossary/rollups), ou "Layer 2". En réduisant la taille des transactions, en les regroupant et en déplaçant le calcul hors chaîne vers votre urbit, il est désormais possible d'effectuer des transactions Urbit ID gratuitement et sans aucune connaissance préalable des blockchains, des crypto-monnaies ou même d’Ethereum. Cela se fait facilement à l’aide de [Bridge](https://developers.urbit.org/reference/glossary/bridge), notre interface web pour gérer votre Urbit ID.

## Qu’est-ce que Azimuth?

[Azimuth](https://developers.urbit.org/overview/azimuth) est ce que nous appelons l'ensemble des contrats Ethereum constituent une PKI ("public key infrastructure") décentralisée à usage général utilisé par Urbit ID. Il conserve un enregistrement des adresses Ethereum qui possèdent les planètes Urbit, étoiles, et les galaxies, ainsi que les clés publiques associées à ces vaisseaux.

C'est également un [concept astronomique cool](https://en.wikipedia.org/wiki/Azimuth).

## Combien de planètes, d'étoiles et de galaxies sont actives ?

Les données brutes sur la plupart des événements Urbit ID / Azimuth qui se sont produits se trouvent [sur le site Web d'Azimuth](https://gaze-exports.s3.us-east-2.amazonaws.com/events.txt). Nous travaillons actuellement sur un outil généralisé pour visualiser ces événements.

Vous pouvez également inspecter et exécuter des fonctions dans le contrat [azimuth.eth](https://etherscan.io/address/azimuth.eth#code) sur Etherscan.

## Que sont les comètes et les lunes ?
En plus des trois catégories d'identités mentionnées ci-dessus, il existe deux autres types de [vaisseaux](https://developers.urbit.org/reference/glossary/ship) Urbit qui ne sont pas immatriculés dans les contrats Urbit ID / Azimuth.

Les [lunes](https://developers.urbit.org/reference/glossary/moon) font 64 bits, généré par les [planètes](https://developers.urbit.org/reference/glossary/planet), et ont des noms comme `~doznec-salfun-naptul-habrys`. Les Lunes sont destinées aux appareils connectés : téléphones, ordinateurs de bureau, téléviseurs intelligents, thermostats numériques et autres appareils IoT. Les lunes sont subordonnées à leur planète mère. Une analogie forte ici est que les sites de médias sociaux ordinaires sont un peu comme des planètes, et votre compte sur eux est une lune. Urbit élève tout le monde au niveau de planète.

Les [comètes](https://developers.urbit.org/reference/glossary/comet) font 128 bits et n'ont pas de parents. Ils peuvent être lancés par n'importe qui gratuitement. Comme leur identité n'est pas maintenue sur la blockchain, elles ne seront probablement pas approuvées par défaut par d'autres sur le réseau [Urbit OS](https://developers.urbit.org/overview/arvo), bien que vous ne devriez pas avoir de problème jusqu'à ce que le réseau se développe beaucoup plus. Ils ont des noms longs et difficiles à mémoriser, comme `~racmus-mollen-fallyt-linpex-watres-sibbur-modlux-rinmex`.

## Qu’est-ce qu’un @p ? Pourquoi mon nom d'utilisateur est-il généré pour moi ?

Un @p ([prononcé](https://developers.urbit.org/guides/core/hoon-school#reading-hoon-aloud) pat-pee) est un nom comme `~zod` ou `~lodleb-ritrul` composé de trois lettres, d'éléments phonémiques prononçables tel que `zor`, `lod`, `leb`, `rit` et `rul`. Des noms plus courts, comme `~zod` et `~marzod`, sont assignés respectivement aux vaisseaux ayant des fonctions spéciales sur les galaxies et les étoiles du réseau [Arvo](https://developers.urbit.org/overview/arvo). Les noms plus longs comme `~palfun-foslup` sont des identités pour des utilisateurs lambda.

Ces noms correspondent directement à un numéro correspondant dans l'espace d'adressage Urbit ID. Les galaxies occupent un espace d'adresse de 8 bits, donc n'importe quelle galaxie est en fait un nombre compris entre zéro et 255. Les étoiles occupent l'espace d'adressage de 16 bits, et les planètes l'espace d'adressage de 32 bits.

Votre nom est généré pour vous comme une solution au [triangle de Zooko](https://en.wikipedia.org/wiki/Zooko%27s_triangle), qui stipule grosso modo que les noms sur un protocole réseau ne peuvent être que deux (i) humain-significatif, (ii) sécurisé, et (iii) décentralisé. Urbit choisit (ii) et (iii), tandis que DNS choisit (i) et (ii).

Quoi qu'il en soit, vous pouvez toujours choisir de définir votre pseudonyme dans Landscape, ainsi si vous souhaitez qu'un nom différent soit affiché, vous avez la liberté de le faire.

## Puis-je changer mon @p ?

Non. Il y a une correspondance 1:1 entre le nom et l'identité. Pensez à votre `@p` comme un numéro de téléphone. C'est juste un nom synthétique aléatoire qui ne divulgue aucune information personnelle sur vous.

## Comment puis-je obtenir une identité ?

Le plus simple est de trouver un ami qui peut vous en donner une. Elles sont dispersées dans l’univers, il suffit de demander autour. Vous aurez de fortes chances d'en rencontrer un en rejoignant Urbit Community, le groupe par défaut pour les nouveaux [vaisseaux](https://developers.urbit.org/reference/glossary/ship) sur `~bitbet-bolbel/urbit-community`, en tant que [comète](https://developers.urbit.org/reference/glossary/comet) et en contribuant agréablement à la conversation.

Ou, si vous le devez, essayez un échange ERC-721 (NFT) (Google ou Twitter devrait vous y aider). Cela impliquera probablement un achat et un transfert vers une adresse Ethereum que vous possédez. Nous vous recommandons d'utiliser [Bridge](https://developers.urbit.org/reference/glossary/bridge), disponible à l'adresse [https://bridge.urbit.org](https://bridge.urbit.org/), pour accéder à l'adresse à laquelle l'identité est transférée.

## Comment puis-je transférer une identité à quelqu'un d'autre ?

Accédez à l'adresse Ethereum contenant l'identité que vous souhaitez transférer via [Bridge](https://bridge.urbit.org/).

## Quelle est la meilleure façon d'accéder à mon Urbit ID ?

Nous avons recommandé d'utiliser [Bridge](https://bridge.urbit.org/) pour toutes les opérations liées à Urbit ID. Il est idéal pour gérer vos identités, ainsi que pour afficher des informations sur les identités que vous ne possédez pas.

Soyez prudent lorsque vous utilisez des versions en ligne de Bridge qui ne sont pas hébergées sur [urbit.org](http://urbit.org/). Étant donné que Bridge est en contact avec vos clés privées, il peut aussi les voler.

## Why aren't there more planets?

Urbit est conçu pour être aussi simple que possible. L’arborescence des parrains pour Urbit ID s'agrandit simplement en quadrillant la taille du dernier niveau. Autrement dit, il y a <span class="mono">2^8^ (256)</span> [galaxies](https://developers.urbit.org/reference/glossary/galaxy), <span class="mono">(2^8^)^2^ = 2^16^ (~65K)</span> [étoiles](https://developers.urbit.org/reference/glossary/star), <span class="mono">(2^16^)^2^ = 2^32^ (~4B)</span> [planètes](https://developers.urbit.org/reference/glossary/planet). Il y a <span class="mono">2^64^</span> [lunes](https://developers.urbit.org/reference/glossary/moon), mais les lunes sont liées à leur planète, contrairement aux étoiles et aux planètes.

Ce modèle existe parce que c’est un moyen simple d’imposer la rareté des adresses et de construire un réseau convivial. Lorsqu'un niveau de l'espace d'adresse commence à être rempli, nous commençons à remplir le niveau suivant. Quand Urbit approchera de la limite des <span class="mono">2^32^ (4B)</span> planètes (4B), nous trouverons un moyen de peupler les <span class="mono">2^64^</span> lunes. Les galaxies qui régissent les contrats Urbit ID peuvent toujours voter pour les améliorer et nous nous attendons à ce qu'elles le fassent.

Le problème avec le fait de peupler des lunes est que <span class="mono">2^64^</span> est _un nombre vraiment, vraiment grand_. Nous aurons besoin d'un moyen pour différencier les humains et leurs dispositifs (pour empêcher les dispositifs de se transformer en botnets malveillants). Mais c’est un problème difficile, et nous préférons commencer par la solution la plus simple possible avant de résoudre des problèmes difficiles. Le système actuel fonctionne. Une fois que nous avons besoin de le mettre à jour, nous le résoudrons.

Le nombre d'adresses se trouve dans une sorte de "zone Goldilocks" afin d’éviter le spam. Trop d'adresses les rendront très bon marché et donc les spammeurs pourraient en acquérir plus une fois qu'elles seraient bloquées. Trop peu d'adresses et elles finissent par coûter trop cher pour l'utilisateur moyen. Le terme technique pour que l'espace d'adressage fini confère au réseau est la [résistance de Sybil](https://en.wikipedia.org/wiki/Sybil_attack), c’est une propriété très importante pour tout réseau décentralisé.

Il est également intéressant de noter que, bien qu'il y ait presque 8 milliard personnes sur Terre, l’intégralité, soit 8 milliard, ne sont pas des utilisateurs d'Internet. Facebook a environ 2.5 milliard utilisateurs, Apple a environ 1 milliard. Urbit a un long chemin à parcourir avant d'être près de <span class="mono">2^32^</span>.

(Pour plus d'informations sur la raison pour laquelle Urbit ID est tel qu'il est, lisez [ceci](https://urbit.org/understanding-urbit/urbit-id/).)

## J'ai une galaxie ou une étoile avec des conditions de verrouillage. Comment cela fonctionne-t-il ?

Il existe deux types de mécanismes pour libérer des actifs verrouillés : linéaire et conditionnelle.

Que ce soit dans l’un de ses deux schémas, vous commencez par être capable de sortir d’une étoile vérouillé, indépendamment des termes fixés autour du verrouillage dans son ensemble. De cette façon, vous pouvez participer avec une étoile tout de suite. Allez faire quelque chose de cool !

Si vous avez verrouillé une [galaxie](https://developers.urbit.org/reference/glossary/galaxy), toutes ses [étoiles](https://developers.urbit.org/reference/glossary/star) seront verrouillées, mais vous aurez le contrôle immédiat et sans verrouillage de la galaxie. Vous en aurez probablement besoin pour utiliser cette étoile.

Notez que le "déblocage" des étoiles signifie simplement qu'elles deviennent disponibles pour vous et que vous pouvez par conséquent les réclamer. Elles ne vous sont pas automatiquement transférées ; vous devez les retirer du contrat qui leur est attribué.

La libération linéaire est la plus simple : vos étoiles seront libérées linéairement sur une période donnée. Il s'agit le plus souvent d'une période de quatre ans. Si vous avez quatre étoiles en réserve, cela signifie que vous pourrez retirer une étoile par an. Dans de nombreux cas, il y a aussi une période initiale de blocage avant que le mécanisme de la libération linéaire ne s’exécute. Cette période est généralement de un an. Dans ce cas, comme il s’est écoulé une année depuis le lancement d'Azimuth en janvier 2019, on peut déduire que la diffusion linéaire a débuté en janvier 2020.

La libération conditionnelle est un peu plus compliquée. Si vos étoiles sont en verrouillage conditionnelle, elles sont probablement divisées en trois tranches. Chacune d'entre elles ne se déverrouille qu'après qu'une condition unique soit remplie. Comme il est difficile de vérifier des choses sur le monde réel à l'aide d’un contrats intelligents, le [Sénat Galactique](https://developers.urbit.org/reference/glossary/senate) vérifie qu'elles ont été respectées. Une fois que le Sénat marque une condition pour une tranche comme étant accomplie, le sénat commence à libérer linéairement sur une période d'un an.
