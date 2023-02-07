+++
title = "Proxies"
weight = 8
template = "doc.html"
+++

Les adresses proxy vous permettent d'exécuter des actions non liées à la propriété comme la création d'identités enfantées, le vote, et la mise en place de clés de réseau sans pour autant mettre en danger les clés que vous avez désignées avec des droits de propriété. La définition des droits de proxy est facultative, mais elle est recommandée pour les actions sur la chaîne que vous exécuterez plus fréquemment.

La définition de procurations est une bonne pratique de sécurité. Par exemple, vous pouvez conserver votre adresse de propriété dans un stockage à froid, tandis que votre proxy de gestion est conservé dans Metamask.

Le portefeuille [Urbit HD Wallet](https://developers.urbit.org/reference/glossary/hdwallet) définit automatiquement les proxies pour votre Urbit ID.

### Types de proxies

Il existe trois principaux types de proxies : gestion, génération/création, et vote. Leurs capacités sont détaillées dans ce chapitre. En outre, chaque proxy est capable de se transférer à une autre adresse, par exemple, le proxy de gestion peut définir une nouvelle adresse avec laquelle il sera le proxy de gestion.

- **Proxy de gestion**

  Peut configurer ou définir les clés de mise en réseau d'Arvo, lancer une [réinitialisation d’usine](https://operators.urbit.org/manual/id/guide-to-resets) et effectuer des opérations liées au parrainage. Les planètes, les étoiles et les galaxies peuvent toutes définir un proxy de gestion.

- **Proxy de génération**

  Disponible uniquement pour les étoiles et les galaxies. Peut créer de nouvelles identités enfants.

- **Proxy de vote**

  Uniquement pour les galaxies. Les galaxies font partie du [Sénat galactique](https://developers.urbit.org/reference/glossary/senate), ce qui signifie qu'elles peuvent voter sur les nouvelles propositions, y compris les modifications de l'écliptique.

### Proxy de transfert

Il existe également un quatrième type de proxy, appelé proxyde transfert, qui est considéré comme étant d'un type différent des trois autres, puisqu'il n'est généralement établi que sur une base temporaire afin de rendre le transfert de propriété moins sensible aux erreurs, et qu'il est effacé une fois le transfert terminé.

L'adresse détenant le proxy de transfert peut transférer la propriété de l'ID à l'adresse du proxy de transfert. Ceci est utilisé pour faire du transfert un processus en deux étapes : utiliser l'adresse de propriété pour définir le proxy de transfert, puis utiliser le proxy de transfert pour terminer la transaction. Il est possible de transférer la propriété en une seule étape, mais cela est risqué et non recommandé. Bridge ne supporte pas nativement les transferts en une étape, vous devez utiliser un outil avancé comme [%claz](https://developers.urbit.org/reference/azimuth/advanced-azimuth-tools) pour générer manuellement une telle transaction.
