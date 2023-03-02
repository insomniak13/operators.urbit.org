+++
title = "Star and Galaxy Operations"
description = "Informations supplémentaires et suggestions d'étiquette pour les propriétaires de Star et Galaxy."
weight = 6
aliases = ["/docs/using/operating-a-star/"]
template = "doc.html"
+++

Pour initialiser votre galaxie ou votre étoile, suivez [nos instructions d'installation](https://urbit.org/getting-started/).

### Hébergement de votre étoile

Si vous envisagez de distribuer des planètes de quelque manière que ce soit, nous vous demandons de maintenir votre étoile en exécution. Si vous ne le faites pas, ces planètes deviendront des orphelines incapables de communiquer avec le réseau, à moins qu'elles ne soient transférées vers une nouvelle étoile.

Consultez nos [instructions d'hébergement sur un cloud](https://operators.urbit.org/manual/running/hosting) pour savoir comment configurer un droplet Digital Ocean.

### Distribuer des planètes

Vous pouvez distribuer des planètes depuis votre étoile via [Bridge](https://bridge.urbit.org/). Pour rappel, si vous distribuez des planètes, veuillez démarrer et exécuter votre étoile sur le réseau Arvo, sinon ces planètes ne pourront pas se connecter, ce qui a un effet négatif sur le réseau dans son ensemble, car les planètes orphelines se retrouvent avec des fonctionnalités très limitées.

### Mises à jour logicielles

Par défaut, votre étoile accepte les mises à jour logicielles de sa galaxie et les achemine vers ses planètes. Vous pouvez utiliser ce mécanisme pour envoyer des logiciels personnalisés à vos planètes. Gardez à l'esprit que les planètes attendent des mises à jour logicielles fonctionnelles, sans rupture, et qu'elles souhaitent généralement pouvoir communiquer avec les planètes parrainées par d'autres étoiles.

### Code de conduite du propriétaire de l'étoile

- Si vous distribuez des planètes, initialisez et exécutez votre étoile sur le réseau Arvo, sinon les planètes ne pourront s’initialiser pour la première fois où se connecter, à moins qu'elles ne soient transférées vers une autre étoile.
- Une étoile est une infrastructure réseau. C'est pourquoi la machine qui exécute votre étoile ou galaxie doit disposer d'une bande passante, d'un espace de stockage, et d'une puissance de traitement suffisant pour les planètes qui en dépendent. Jusqu'à ce que l'élagage des journaux d'événements soit mis en œuvre, attendez-vous à ce que les vaisseaux consomment plus d'espace disque chaque année ; les étoiles qui cherchent à faire tourner une centaine de planètes devront s'assurer d'un espace d'environ 50 Go par année d’exécution.
- Lorsque vous envoyez des messages à d'autres personnes, n'utilisez votre étoile qu'à titre officiel/infrastructurel. Sinon, utilisez votre planète personnelle.

### Taxes

L'espace d'adressage Urbit a une valeur, ce qui signifie que la distribution de l'espace d'adressage à des implications fiscales. Vous devriez parler de ces implications avec votre conseiller fiscal.
