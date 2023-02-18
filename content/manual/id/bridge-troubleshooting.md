+++
title = "Dépannage de Bridge"
template = "doc.html"
description = "Dépanner Bridge si vous avez exécuté des erreurs"
weight = 20
+++

Cette page couvre les problèmes les plus fréquemment rencontrés avec l'application [Bridge](https://bridge.urbit.org).

### Problèmes liés à Canvas

Bridge utilise l'élément HTML appelé Canvas pour créer vos portefeuilles. Malheureusement, les sites Web malveillants peuvent utiliser Canvas pour identifier et traquer les utilisateurs. Par conséquent, certains navigateurs et extensions anti-traquage peuvent interférer avec la capacité de Bridge à générer des portefeuilles.

S'il n'y a pas d'instructions pour votre navigateur, ou si les instructions ne fonctionnent pas, veuillez remplir un ticket sur le [traqueur de problèmes](https://github.com/urbit/bridge/issues).

#### Utilisateurs de Brave

Pour résoudre les problèmes liés à Canvas sur Brave :

- Cliquez sur le logo Brave sur le bord droit de votre barre d'URL.
- Cliquez sur `Advanced View`
- Réglez le menu déroulant du bas sur `Cross-site device recognition blocked` (Reconnaissance interdite des appareils)
- Cliquez sur Retry dans Bridge

La boîte d'avertissement devrait disparaître.

#### Utilisateurs de Firefox

Pour résoudre les problèmes liés à Canvas sur Brave :

- Cliquez sur l'icône d'une image dans votre barre d'URL, à gauche de `https://bridge.urbit.org` 
- Cliquez sur `Allow data Access`
- Cliquez sur Retry dans Bridge

La boîte d'avertissement devrait disparaître.

