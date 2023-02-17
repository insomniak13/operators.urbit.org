+++
title = "HD Wallet (Master Ticket)"
weight = 11
template = "doc.html"
+++

Ce document explique ce qu'est [Urbit HD wallet](https://developers.urbit.org/reference/glossary/hdwallet) et comment l'utiliser.

### Qu'est-ce que le Portefeuille HD d'Urbit ? {% #portefeuille-hd-urbit %}

Le [Urbit Hierarchical Deterministic (HD) Wallet](https://developers.urbit.org/reference/glossary/hdwallet) est un portefeuille Ethereum personnalisé basé sur les BIP39 et BIP44, la même technologie sous-jacente utilisée par les fournisseurs de portefeuilles comme Ledger, Trezor, Metamask et MyEtherWallet. Vous pouvez considérer le portefeuille Urbit HD comme un portefeuille de portefeuille. Il vous permet de conserver une seule phrase de sécurité pour toutes vos clés Urbit ID. Urbit ID utilise plusieurs clés avec des capacités différentes, un peu comme les permissions. Ainsi, vous pouvez garder les clés les plus précieuses via un stockage hors-ligne, tout en gardant les clés moins précieuses, utilisées pour les opérations quotidiennes, plus facilement accessibles. Si vous n'exploitez qu'une planète, vous ne devriez pas avoir à vous soucier de cela : vous pouvez simplement penser à votre "*Master Ticket*" comme le mot de passe de votre Urbit ID. Si vous opérez une étoile ou une galaxie, le portefeuille Urbit HD vous permet de mettre en œuvre un système de conservation de clés à plusieurs niveaux.

Si vous êtes intéressé, vous pouvez lire les spécifications ici : [Urbit HD Wallet Spec (UP 8)](https://github.com/urbit/proposals/blob/master/008-urbit-hd-wallet.md).

### Qu'est-ce qu'un *Master Ticket* ?{% #master-ticket %}

Le "Master Ticket" est la phrase mnémonique cryptographique à partir de laquelle vos autres clés Urbit ID sont dérivées. Il doit être traité comme le mot de passe principal : vous ne devez jamais le partager avec qui que ce soit, et vous devez le stocker de manière très sécurisée (voir les bonnes pratiques ci-dessous). Ce ticket est utilisé pour dériver le portefeuille Ethereum contenant vos clés de propriété, votre clé [Urbit OS](https://operators.urbit.org/manual/id/hd-wallet#what-is-arvo), utilisée pour initialiser votre Urbit et les autres clés associées à votre identité. Vous aurez un *Master Ticket* si vous avez utilisé le générateur de portefeuille Urbit ou réclamé un [vaisseau](https://developers.urbit.org/reference/glossary/ship) sur notre version hébergée de Bridge.

Si vous exploitez une planète, vous pouvez utiliser votre *Master Ticket* pour vous authentifier avec Bridge.

### Qu'est-ce qu'une adresse de propriété ?

Une adresse de propriété est une adresse Ethereum qui possède une ou plusieurs de vos identités Urbit. Le générateur de portefeuille Urbit crée un [portefeuille Urbit HD](https://developers.urbit.org/reference/glossary/hdwallet) et les adresses associées pour chacune de vos identités. En utilisant la clé de propriété associée à votre adresse de propriété, vous pouvez transférer des identités à d'autres personnes, ce qui signifie qu'il est très important de la stocker en toute sécurité.

### Que sont les proxies ? {% #proxies %}

Voir : [Proxies](https://operators.urbit.org/manual/id/proxies)

### Que sont les phrases mnémoniques ? {% #phrase-mnémonique %}

Toutes les paires de clés Ethereum dans le système de portefeuille Urbit, y compris les proxies, sont produites par des valeurs cryptographiques aléatoires de 128 bits appelées phrases mnémoniques. Ces graines sont l'équivalent de la mnémonique BIP39 d'un portefeuille Ethereum et sont les vôtres uniquement. Une paire de clés de propriété est dérivée d'une graine de propriété et, de même, les diverses paires de clés de proxy sont générées à partir de leurs graines de proxy respectives.

Pour des informations détaillées, voir le [Urbit HD Wallet Spec (UP 8)](https://github.com/urbit/proposals/blob/master/008-urbit-hd-wallet.md).

### Que signifie "définir des clés publiques" ? {% #définir-des-clés-publiques %}

Cela signifie enregistrer les clés publiques des paires de clés de cryptage et d'authentification de votre identité (connues ensemble sous le nom de "clés de réseau") avec Urbit ID / [Azimuth,](https://developers.urbit.org/reference/glossary/azimuth) afin que d'autres puissent les découvrir. Les clés privées correspondantes peuvent alors être utilisées, par exemple, pour faire fonctionner un vaisseau sur le réseau [Urbit OS](https://operators.urbit.org/manual/id/hd-wallet#what-is-arvo).

Vous voudrez réinitialiser ces clés si elles sont compromises, ou si votre vaisseau a coulé. Cela a peu d'importance pratique aujourd'hui, mais la réinitialisation de vos clés de réseau réinitialise également votre relation avec les autres vaisseaux sur le réseau.

### Que dois-je faire si je veux posséder plusieurs identités ? {% #plusieurs-identités %}

Nous vous recommandons d'utiliser un portefeuille HD différent pour chaque identité que vous souhaitez. Vous pouvez cependant attribuer un nombre quelconque d'identités à une seule adresse Ethereum, puisqu'il s'agit simplement de jetons ERC-721.

### Comment dois-je prendre soin de mon portefeuille Urbit HD ? {% #custody %}

Les ID Urbit s'accompagnent de problématiques sécuritaires doivent être prises au sérieux. La responsabilité de garder les actifs cryptographiques en sécurité incombe entièrement à la partie (vous-même) qui les possède.

La nature de la décentralisation est telle qu'il n'y a généralement aucune autorité qui a le pouvoir de restaurer un portefeuille perdu ou volé. Les portefeuilles dits “[à récupération sociale](https://vitalik.ca/general/2021/01/11/recovery.html)” constituent l'exception à cette règle. Le portefeuille HD ne prend pas encore en charge la récupération sociale, mais il est possible de l'utiliser avec un autre portefeuille tel qu'[Argent](https://www.argent.xyz/).

Personne ne peut vous obliger à suivre les bonnes pratiques de sécurité. Tout au plus, les différents acteurs peuvent vous donner des recommandations. N'oubliez pas : si des éléments essentiels, tels que votre clé de propriété, sont perdus ou compromis, vos actifs sont probablement perdus à jamais.

Nous énumérons ci-dessous quelques bonnes pratiques de stockage des clés, les plus strictes en premier. Les biens de plus grande valeur doivent être sécurisés par des mesures plus strictes.

### Niveau de sécurité 1 : stockage hors ligne

Le stockage hors ligne désigne toute méthode par laquelle des secrets sont stockés d'une manière qui n'est accessible à aucun réseau. Les clés stockées hors ligne ne devraient être générées que hors ligne.

Options de stockage hors ligne :

- Imprimer le secret sur un morceau de papier. Cependant, les portefeuilles en papier sont vulnérables à diverses formes de dommages physiques, comme la pourriture, les dégâts des eaux, la fumée ou le feu. La plastification du papier peut atténuer certains de ces risques, mais la plastification peut potentiellement retenir l'humidité. Assurez-vous que vous faites confiance à l'imprimante ; certaines ont une mémoire et des connexions réseau.
- Stocker le secret sur une clé USB ou un disque dur tout neuf qui n'a jamais été connecté à une machine en réseau.
- Stocker le secret sur un portefeuille matériel comme Ledger ou Trezor.
- Graver le secret sur une bande d'acier inoxydable. Ce support résiste aux dommages causés par l'eau et le feu.

Des endroits où stocker vos supports de stockage hors ligne :

- Un coffre-fort caché dans votre maison
- Un coffre-fort dans une banque

C’est une bonne idée de stocker vos clés de manière redondante, par exemple sur une clé USB et sur une feuille de papier dans le coffre, au cas où l'une de ces méthodes viendrait à être détruite. Si vous estimez qu'une clé est suffisamment précieuse, vous pouvez la diviser en trois (ou autres) et stocker chaque tiers dans des endroits sûrs et géographiquement répartis. Les portefeuilles Urbit HD pour les galaxies fournissent automatiquement un *Master Ticket* en trois parties (partagés).

### Niveau de sécurité 2 : Portefeuille matériel ou portefeuille papier

Un portefeuille matériel est un dispositif de stockage numérique spécialement conçu pour stocker des secrets cryptographiques. Il n'est pas affecté par les logiciels malveillants typiques de vol de clés et possède des mécanismes de sécurité intégrés qui font défaut aux autres dispositifs numériques. Faites vos recherches et assurez-vous que vous achetez un dispositif authentique, fabriqué par des experts en sécurité dignes de confiance, techniquement compétents et jouissant d'une bonne réputation. Trezor et Ledger sont deux marques populaires de portefeuilles matériels.

Un "portefeuille papier" est un support physique imprimé ou gravé d'un secret. Ils résistent aux attaques de réseau, mais l'inconvénient est que le secret doit être saisi manuellement dans un ordinateur, ce qui expose l'utilisateur aux attaques de logiciels et de personnes malveillantes.

### Niveau de sécurité 3 : Sur votre ordinateur

Ce niveau comprend toute méthode où les secrets sont stockés sur une plate-forme informatique classique. Voici quelques exemples de ces méthodes :

- Des PDF cryptés contenant un secret sur le disque de votre ordinateur de bureau
- Stockage de secrets sur un compte cloud protégé par une authentification multifactorielle
- Stockage de secrets dans un gestionnaire de mots de passe

Cette méthode est risquée pour plusieurs raisons. Les ordinateurs en réseau peuvent contenir des logiciels malveillants. Les ordinateurs couramment utilisés sont également sujets aux pannes et aux pertes de données. Le stockage de secrets sur des comptes cloud atténue le risque de destruction de données, mais expose une surface d'attaque beaucoup plus grande aux acteurs malveillants.

Pour toutes ces raisons, si vous utilisez des méthodes de niveau 3, ne les utilisez que pour le stockage de secrets de faible valeur.
