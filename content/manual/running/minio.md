+++
title = "Stockage S3 auto-hébergé avec MinIO"
description = "Comment configurer et auto-héberger le stockage MinIO S3"
template = "doc.html"
weight = 2
[extra]
hidetitle = "true"
+++

L'ajout de stockage [S3](https://aws.amazon.com/s3/) à Urbit débloque quelques nouvelles fonctionnalités, comme la possibilité de télécharger et de poster vos propres médias dans les chats directement depuis votre propre machine, et de télécharger des avatars personnalisés. Ceci est un guide pour l'auto-hébergement de [MinIO](https://min.io/), une solution de stockage en bloc compatible S3.

Vous pouvez en savoir plus sur S3 dans [Configurer le stockage S3](https://operators.urbit.org/manual/os/s3).

Les fournisseurs de services sur le cloud offrent des solutions S3 prêtes à l'emploi que vous pouvez utiliser presque immédiatement. Toutefois, si vous ne souhaitez pas leur confier vos fichiers téléchargés, vous pouvez héberger vous-même une solution S3.

Ce processus nécessite une connaissance pratique des lignes de commande Linux et des technologies Web telles que DNS et TLS.

Le processus d'auto-hébergement est quasiment exactement le même, que vous hébergiez sur votre propre matériel ou que vous louiez un VPS auprès d'un fournisseur de services cloud+ comme DigitalOcean ou AWS. Dans tous les cas, tout ce dont vous avez besoin, c'est d'une machine fonctionnant sous Linux et d'un domaine, dans le cadre de ce guide, `exemple.com` sera utilisé à la place de votre domaine personnalisé. Vous devez substituer votre propre domaine partout où le domaine exemple est utilisé dans ce guide ; par exemple :

- `exemple.com` doit devenir `yourdomain.tld`,
- `s3.exemple.com` doit devenir`s3.yourdomain.tld,`

et ainsi de suite.

Idéalement, MinIO devrait être installé sur la même machine que celle où est hébergée votre planète Urbit, et fonctionner en parallèle sans coût supplémentaire, bien qu'il puisse tout aussi bien être hébergé sur une machine séparée.

## Étapes

### (facultatif) Installer Docker

Héberger MinIO via Docker est l'option la plus simple. Pour installer le serveur Docker, suivez le guide [ici](https://docs.docker.com/engine/install/#server).

Si vous ne souhaitez pas installer Docker, MinIO propose des exécutables indépendants. Le processus pour les exécuter devrait être similaire, mais l'étape suivante suppose que vous utilisez Docker.

### Installer MinIO

Une fois que Docker est installé, nous pouvons installer et exécuter MinIO en suivant les étapes [suivantes](https://docs.min.io/docs/minio-docker-quickstart-guide.html).

Vous ne devriez avoir besoin que d'une seule commande, du type :

```
docker run -d \
  -p 9000:9000 \
  -p 9001:9001 \
  --name minio-urbit \
  -v /mnt/data:/data \
  -e "MINIO_ROOT_USER=<username>" \
  -e "MINIO_ROOT_PASSWORD=<password>" \
  -e "MINIO_DOMAIN=s3.example.com" \
  -e "MINIO_SERVER_URL=https://s3.example.com" \
  minio/minio server /data --console-address ":9001"
```

Les ports 9000 et 9001 sont exposés pour donner accès à l'interface S3 de MinIO et à l'administration web de MinIO respectivement. `/mnt/data` est le chemin où vos données téléchargées seront stockées sur votre machine hôte, vous pouvez le modifier si nécessaire.

Assurez-vous d'ajouter la variable d'environnement `MINIO_DOMAIN` ; elle indique à MinIO d'accepter les URLs de style hôte virtuel (`BUCKET.s3.example.com`(http://bucket.s3.example.com/) plutôt que `s3.example.com/BUCKET`(http://s3.example.com/BUCKET)), qui sont nécessaires pour la compatibilité avec Urbit.

Votre nom d'utilisateur et votre mot de passe peuvent être ce que vous voulez, assurez-vous qu'ils sont sécurisés ! Votre nom d'utilisateur doit être composé d'au moins 4 caractères et votre mot de passe d'au moins 8 caractères.

### Créer des enregistrements DNS

Maintenant, vous devez faire pointer votre propre domaine vers votre installation MinIO. Via les paramètres DNS de votre domaine (généralement configurés sur le registre par lequel vous avez acheté votre domaine), créez trois enregistrements `A` :

- `s3.example.com`(http://s3.example.com/),
- `console.s3.example.com`(http://console.s3.example.com/), et
- `BUCKET.s3.example.com`(http://bucket.s3.example.com/), où BUCKET est un nom de conteneur de votre choix, `media` ou `uploads` sont de bons exemples.

Ces trois adresses doivent pointer vers l'adresse IP de votre machine hôte. Si vous hébergez sur votre propre matériel, cela peut nécessiter une redirection de port via votre routeur afin que votre machine hôte soit accessible depuis l'extérieur de votre réseau domestique, et éventuellement l'utilisation d'un service DNS dynamique pour mettre à jour vos enregistrements DNS si l'adresse IP de votre domicile n'est pas statique.

Les enregistrements DNS peuvent mettre un peu de temps à se propager, alors ne vous inquiétez pas si vous entrez votre nouvelle URL dans votre navigateur et que vous ne voyez rien pendant un moment.

_Remarque : si vous prévoyez de créer plusieurs conteneurs, vous aurez besoin d'un enregistrement DNS pour chacun. Alternativement, vous pouvez utiliser un enregistrement de domaine wildcard, mais pour l'utilisation avec Urbit, un seul conteneur est nécessaire._

### Configurer le proxy reverse

La mise en place d'un proxy *reverse* en face de MinIO nous permet de configurer les noms de domaine et TLS. Dans ce guide, nous utilisons caddy, un serveur web incroyablement simple. Si vous avez de l'expérience avec d'autres serveurs web, vous pouvez également les utiliser à la place de caddy.

Pour installer caddy, suivez les instructions [ici](https://caddyserver.com/docs/install).

Caddy gère automatiquement TLS, nous n'avons donc pas besoin de nous soucier de sa configuration. Tout ce que nous devons faire est de créer un fichier Caddy qui ressemble à quelque chose comme ceci :

```
console.s3.example.com {
  reverse_proxy localhost:9001
}
s3.example.com BUCKET.s3.example.com {
  reverse_proxy localhost:9000
}
```

N'oubliez pas de remplacer BUCKET par le nom de votre choix, puis exécutez `caddy start` dans le même répertoire que le *Caddyfile*.

### Créer un conteneur S3

Naviguez vers votre point de terminaison d'administration MinIO (`https://console.s3.example.com`) dans un navigateur et connectez-vous en utilisant le nom d'utilisateur et le mot de passe que vous avez saisis à l'étape 1.

Choisissez `buckets` dans le menu de gauche, puis `create bucket` en haut de la page. Saisissez le nom de votre conteneur (bucket) (il DOIT correspondre au nom figurant dans votre enregistrement DNS, par exemple `media`).

Ensuite, vous devez vous assurer que votre conteneur est accessible au public, afin que d'autres personnes puissent voir les médias que vous avez téléchargés. Pour ce faire, cliquez sur `manage` sur votre conteneur nouvellement créé, puis naviguez jusqu'à `Access Rules`. Cliquez sur `add access rule`, entrez `*` comme préfixe et définissez l'accès comme étant `readonly`.

### Configurez votre vaisseau

Allez sur Landscape et naviguez jusqu'à la page de configuration du stockage S3 dans Préférences système > Stockage à distance, et entrez votre domaine (avec le protocole) sous le point de terminaison, par exemple [https://s3.example.com](https://s3.example.com/). Entrez votre nom d'utilisateur et votre mot de passe de l'étape 1 sous clé d'accès et secret, puis entrez le nom du conteneur. Lorsque le nom du conteneur est combiné avec le point de terminaison, vous obtenez l'URL de votre conteneur, par exemple `https://media.s3.example.com`.

Vous pouvez également configurer ces paramètres via dojo comme indiqué [ici](https://operators.urbit.org/manual/os/s3).

### Voilà, c'est fait !

Vous devriez maintenant être en mesure de télécharger du contenu en utilisant votre installation MinIO auto-hébergée.

Une fois votre configuration S3 ajoutée, vous devriez voir une icône en forme de trombone à côté de la saisie des messages dans vos chats. Les médias peuvent être téléchargés et postés en cliquant dessus.

## Dépannage

Le chat de Landscape échoue silencieusement s'il ne peut pas se connecter à votre point de terminaison S3 pour télécharger des médias. Pour avoir une idée de ce qui ne va pas, ouvrez l'onglet réseau des outils de développement de votre navigateur et observez la requête lorsque vous essayez de télécharger des médias. Vous devriez voir une requête échouée, avec un code d'erreur ou la raison de l'échec.

- Si vous voyez l’erreur `mixed-content`, cela signifie que toutes les parties de la configuration n'utilisent pas TLS. La plupart des navigateurs refusent de charger du contenu non-HTTPS à partir d'une page sécurisée.
- Si vous voyez l’erreur `502 Bad Gateway`, caddy est incapable d'atteindre votre installation MinIO. Vérifiez que MinIO est en cours d'exécution et que les URLs de votre `reverse_proxy` sont correctes.
- Si vous obtenez l’erreur `Permission denied`, il est probable que le point de terminaison de votre conteneur soit incorrect. Assurez-vous que vous avez passé la variable `MINIO_DOMAIN` lors de l'exécution de MinIO, sinon il utilisera par défaut le format URL path, qu'Urbit ne supporte pas.

Une bonne façon de tester votre configuration est d’utiliser `curl` sur votre point de terminaison de conteneur S3 (pas votre point de terminaison S3 racine) et voir quelle réponse vous obtenez. Par exemple, si nous avons un conteneur nommé `media` :

```
curl [https://media.s3.example.com](https://media.s3.example.com/)
```

Vous devriez obtenir une réponse XML énumérant ce qui se trouve dans votre conteneur.

## Exécuter MinIO et Urbit sur la même machine


Vous pouvez vous demander comment il est possible de faire tourner Urbit à côté de notre installation MinIO si les deux ont besoin des ports 80/443. La réponse est de proxyer Urbit à travers caddy, exactement de la même manière que MinIO. Vous pouvez créer autant de directives dans votre Caddyfile que nécessaire, chacune pointant vers un port différent.

Par exemple, vous pourriez avoir 3 domaines :

- `ship-name.example.com` - proxy vers le port 8080 où Urbit s'exécute,
- `console.s3.example.com` - proxy vers le port 9001 où votre administrateur MinIO fonctionne,
- `media.s3.example.com` - proxy vers le port 9000 où votre conteneur MinIO est accessible.

Pour le moment, il n'y a aucun moyen de spécifier le port HTTP sur lequel Landscape s'exécute (sauf si vous exécutez l’exécutable `urbit-king`), mais si 80 n'est pas disponible au démarrage, il essaiera ensuite 8080. Donc, démarrez d'abord caddy, et lorsque vous initialisez votre vaisseau, il devrait détecter que le port 80 est utilisé et utiliser 8080 à la place.

Si vous utilisez l’exécutable `urbit-king`, vous pouvez spécifier le port HTTP avec l'option `--http-port`.
