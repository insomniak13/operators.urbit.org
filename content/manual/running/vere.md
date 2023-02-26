+++
title = "Référence du runtime"
template = "doc.html"
weight = 0
+++

Le runtime d'Urbit s'appelle Vere. C'est l'exécutable que vous utilisez pour exécutez votre vaisseau (`urbit` sur Linux et MacOS, `urbit.exe` sur Windows). Vere gère le [ponton](https://urbit.org/docs/glossary/pier) de votre vaisseau, gère les événements, et exécute la machine virtuelle Nock qui effectue les calculs de votre vaisseau.

Avant la version 1.9, Vere était divisé en deux exécutables distincts : L'`urbit` "king"/"urth" responsable des I/O et de la persistance des événements, et l'`urbit-worker` "serf"/"mars" responsable des calculs et de la persistance des états. Depuis la version 1.9, ils ont été fusionnés en un seul exécutable `urbit` (ou `urbit.exe`), bien que sous le capot il y ait toujours deux processus séparés. Le King alternatif écrit en Haskell, `urbit-king`, a également été déprécié, il n'y a donc plus qu'un seul exécutable.

La version 1.9 a introduit quelques nouvelles fonctionnalités. La première est le concept d'"amarrage". Lorsqu'un nouveau vaisseau est initialisé, Vere se copie automatiquement dans le ponton, à `[pier]/.bin/[pace]/vere-v[version]-[architecture]`. Il crée également un lien vers ce fichier situé dans `[pier]/.run`. Cela signifie qu'après l’initialisation , le ponton est autonome et peut être exécuté avec `[pier]/.run`, rendant inutile l’exécutable séparé. Pour les vaisseaux plus anciens qui ont été initialisés par un exécutable précédent, la v1.9 ou une version ultérieure n'effectuera pas automatiquement cette étape, elle doit donc être effectuée avec l'utilitaire `dock` ([voir ci-dessous](#dock)).

Le `pace` mentionné dans le chemin ci-dessus est une nouvelle fonctionnalité, et représente un canal de sortie. Au moment de la rédaction de ce document, `pace` par défaut est "`live`, ce qui correspond aux versions standard et stables. D'autres canaux de publication seront introduits à l'avenir, pour des choses comme les tests de pré-version, les dernières modifications automatisés, etc. Le `pace` est spécifié dans un fichier texte dans `[pier]/.bin/pace`.

En plus de l’amarrage, une fonctionnalité de mise à jour de l’exécutable a également été introduite. Si vous exécutez l'utilitaire `next` ([décrit ci-dessous](#next)), Vere vérifiera s'il existe une version exécutable plus récente disponible pour le `pace` actuel. Si c'est le cas, elle sera automatiquement téléchargée et installée. Cela signifie qu'il n'est plus nécessaire d'aller télécharger manuellement les nouveaux exécutables et de les échanger; tout est géré par Vere à l'intérieur du ponton.

## Usage courant

### Initialiser une comète

Une comète est un type de vaisseau qui peut être rapidement généré par n'importe qui et dont la disponibilité est virtuellement illimitée. Elles sont utiles comme identités gratuites pour les gens souhaitant essayer rapidement Urbit.

Pour initialiser une comète, il suffit d'utiliser l'argument `-c` et de spécifier le nom du ponton (le ponton est un dossier contenant l'état du vaisseau et le journal des événements) :

```
urbit -c nom-de-la-pierre
```

Il faudra quelques minutes pour initialiser. Une fois terminé, vous serez en mesure d'interagir avec l'invite Dojo et d'accéder à l'interface web dans un navigateur.

Lorsque vous éteindrez le vaisseau, l’exécutable se copiera dans le ponton, de sorte qu'à l'avenir vous pourrez l'exécuter avec `/path/to/pier/.run`.

### Initialiser un vaisseau

Pour initialiser une lune, une planète, une étoile ou une galaxie, vous devez utiliser deux arguments :

- `-w` - le nom du vaisseau (sans le début `~`).
- `-k` - le chemin vers le fichier clé que vous avez téléchargé depuis Bridge (ou obtenu depuis la planète mère et collé dans un fichier dans le cas d'une lune).

```
urbit -w sampel-palnet -k /path/to/my.key
```

Cela prendra quelques minutes pour démarrer. Une fois terminé, vous serez en mesure d'interagir avec l'invite Dojo et d'accéder à l'interface web dans un navigateur.

Si vous voulez, vous pouvez utiliser une option supplémentaire `-c` pour spécifier un nom pour le ponton . Sans `-c`, le ponton sera nommé de la même manière que votre vaisseau. Notez qu'il est possible d'utiliser `-G` au lieu de `-k` et de coller la clé privée directement en argument. Cela peut être plus pratique dans le cas d'une lune.

Lorsque vous arrêtez le vaisseau, l’exécutable se copie dans le ponton, donc à l'avenir vous pourrez l'exécuter en faisant `/path/to/pier/.run`.

### Exécuter un vaisseau

Si un vaisseau a déjà été initialisé, vous pouvez l'exécuter en spécifiant simplement le ponton :

```
urbit /path/to/pier
```

Alternativement, si le ponton a été initialisé par la version 1.9 ou une version plus récente de l’exécutable, ou si vous avez précédemment exécuté `dock` à partir du ponton, vous n'avez pas besoin de l’exécutable urbit séparé et pouvez simplement exécuter `/path/to/pier/.run` pour démarrer le vaisseau.

### Initialiser un faux vaisseau

Le développement est souvent effectué sur un "faux" vaisseau plutôt que sur un vrai. Un faux vaisseau n'a aucune connexion au réseau réel et utilise de fausses clés comme vous n’avez pas besoin de le posséder. Un faux vaisseau ne peut parler qu'à d'autres faux vaisseaux sur la même machine locale.

Pour en créer un, il suffit d'utiliser l'option `-F` et de spécifier le nom d'un vaisseau (généralement une galaxie) :

```
urbit -F zod
```

### État compact

**Notez que le vaisseau doit être arrêté avant d'utiliser l'un des utilitaires décrits ci-dessous.**

Les vaisseaux ont actuellement une limite stricte de 2Go quant à la taille de leur état. Parfois, l'état des vaisseaux qui fonctionnent depuis longtemps et qui sont très utilisés peut dépasser la limite de 2 Go et se bloquer avec une erreur de type `bail : meme`. Pour résoudre ce problème, il existe plusieurs façons de réduire la taille de l'état du vaisseau.

La première est l'utilitaire `pack`, qui défragmente la capture instantanée du vaisseau. Cette opération ne compacte généralement que légèrement l'état, mais elle est rapide et utilise peu de mémoire.

Pour exécuter `pack`, vous pouvez faire soit `urbit pack /path/to/pier` ou `/path/to/pier/.run pack` s'il a été amarré au ponton.

La deuxième option est `meld`, qui déduplique la capture instantanée du vaisseau. Cela peut réduire la taille de manière beaucoup plus significative, parfois jusqu'à la moitié. Par contre, cette opération peut utiliser beaucoup de mémoire, parfois jusqu'à 8Go, donc si vous n'avez pas beaucoup de mémoire sur votre machine, vous pouvez avoir besoin de mapper de l'espace *swap*.

Pour exécuter `meld`, vous pouvez soit faire `urbit meld /path/to/pier` ou `/path/to/pier/.run meld` s'il a été amarré au ponton.

Si le meld réussit, il affichera le résultat du rapport de mémoire et quittera la session. S'il échoue avec `KILLED`, cela signifie qu'il a manqué de mémoire et que la fusion a été abandonnée.

### Amarrer l’exécutable

À partir de la version 1.9 de l’exécutable, les vaisseaux nouvellement initialisés auront leur exécutable automatiquement copié dans leurs ponton, de sorte qu'ils peuvent être exécutés en faisant `/path/to/pier/.run`. Cela signifie qu'un exécutable séparé n'est pas nécessaire puisque tout est contenu dans le ponton. Pour les vaisseaux existants ayant été initialisé avant la v1.9, vous devez exécuter manuellement la commande suivante si vous souhaitez bénéficier de cette fonctionnalité :

```
urbit dock /path/to/pier
```

Ensuite, vous pourrez simplement faire `/path/to/pier/.run` et supprimer l’exécutable `urbit` séparé.

### Mettre à jour l’exécutable

À partir de la version 1.9 de l’exécutable, il existe un mécanisme permettant de mettre à jour l’exécutable sans avoir à le télécharger soi-même. Exécutez simplement `urbit next /path/to/pier` ou `/path/to/pier/.run next` si vous êtes connecté. Il vérifiera si des exécutables plus récents sont disponibles pour votre canal de diffusion et s'il y en a, il téléchargera automatiquement le nouvel exécutable et l'installera dans le ponton.

## Utilitaires

Ces utilitaires ne sont pas utilisés pour exécuter les vaisseaux, mais effectuent des opérations sur les pontons, affichent des informations sur les pontons, ou font d'autres choses utiles. Notez que le vaisseau doit être arrêté pour exécuter l'un de ces utilitaires sur un ponton. Certains d'entre eux sont des utilitaires de l'ancien `urbit-worker`.

### `cram`

Jam (brouille) l'état d'un vaisseau. Le fichier jam sera enregistré dans `[pier]/.urb/roc/[current-event-number].jam`. Cela crée une sauvegarde portable instantanée.

Sans amarrage : `urbit cram [pier]`
Amarré : `[pier]/.run cram`

### `dock`

Copier l’exécutable urbit dans le ponton cible. Il sera lui-même copié dans `[pier]/.bin/[pace]/vere-v[version]-[architecture]`. Le `pace` est un canal de version. Le `pace` par défaut est `live`, pour les versions stables ordinaires. Le rythme sera également enregistré dans un fichier texte sous `[pier]/.bin/pace`. De plus, un lien vers l’exécutable actuel sera créé dans `[pier]/.run`, ce qui vous permettra de démarrer un vaisseau en appelant `[pier]/.run`.

Lorsqu'un vaisseau est nouvellement initialisé par un runtime à partir de la v1.9, il sera automatiquement amarré. Pour les vaisseaux existants, cela doit être fait explicitement avec cette commande.

- Pas amarré : `urbit dock [pier]`
- Amarré : `[pier]/.run dock`

Notez que le comportement d'amarrage automatique lors de l’initialisation de nouveaux vaisseaux peut être désactivé avec l'option `--no-dock`.

### `eval`

Évaluer une expression hoon sans initialiser de vaisseau.

L'expression à évaluer est donnée dans une chaîne via stdin, et le résultat est affiché dans le terminal. Notez que vous n'avez pas besoin d’initialiser un vaisseau pour exécuter ceci, le runtime peut le faire lui-même.

- Pas amarré : `echo [expression] | urbit eval`
- Amarré : `echo [expression] | [pier]/.run eval`

Cela fonctionnera comme suit :

```
> echo "(turn (limo 1 2 3 4 5 ~) succ)" | urbit eval
loom: mapped 2048MB
lite: arvo formula 11a9e7fe
lite: core 38d4ad4d
lite: final state 38d4ad4d
eval:
~[2 3 4 5 6]
```

### `grab`

Analyser l'utilisation de la mémoire d'un vaisseau. Le résultat sera imprimé dans le terminal. Il s'agit de la même sortie produite que lorsque vous exécutez `|mass` dans le Dojo.

- Pas amarré : `urbit grab [pier]`
- Amarré : `[pier]/.run grab`

### `info`

Afficher les informations sur le ponton.

- Pas amarré : `urbit info [pier]`
- Amarré : `[jetée]/.run info`

```
> urbit info zod
loom: mapped 2048MB
boot: protected loom
live: loaded: MB/268.173.312
boot: installed 351 jets
urbit: zod at event 256133
  disk: live=&, event=256133
lmdb info:
  map size: 1099511627776
  page size: 4096
  max pages: 268435456
  number of pages used: 1506786
  last transaction ID: 255733
  max readers: 126
  number of readers used: 0
  file size (page): 6171795456
  file size (stat): 6171795456
```

### `meld`

Dupliquer l'état du vaisseau. Cela peut réduire de manière significative l'utilisation de la mémoire pour les vaisseaux avec de grands états. C'est une solution courante lorsque les vaisseaux utilisent toute la mémoire mappée disponible (actuellement 2 Go) et se plantent avec, en résultante, le code `bail : meme`.

Notez que cette commande peut utiliser une grande quantité de mémoire pendant son exécution, jusqu'à environ 8 Go, en fonction de la taille de l'état du vaisseau et d'autres facteurs. Si vous n'avez pas assez de mémoire pour l'exécuter, vous devrez peut-être allouer un peu de swap.

Si le meld réussit, il afficheraun rapport d'utilisation de la mémoire. S'il échoue avec un message `KILLED`, cela signifie qu'il a manqué de mémoire et que l'opération a été abandonnée.

- Pas amarré: `urbit meld [pier]`
- Amarré : `[pier]/.run meld`

### `pack`

Défragmenter l'état d'un vaisseau. Cela réduira la taille de l'état d'un vaisseau beaucoup moins que la fusion, mais il est beaucoup plus rapide et nécessite beaucoup moins de mémoire pour terminer.

- Pas amarré : `pack urbit [pier]`.
- Amarré : `[pier]/.run pack`

### `prep`

Préparer un ponton pour une mise à niveau. Cet utilitaire est conçu pour être un mécanisme général de compatibilité avec l'avenir. L'action (si elle est prise) dépend de l'ancienne et de la nouvelle version. Actuellement, il s'assure simplement que la capture instantanée est entièrement à jour.

- Pas amarré : `urbit prep [pier]`
- Amarré : `[pier]/.run prep`

### `next`

Demander une mise à jour du runtime. Si votre exécutable est déjà mis à jour et correspond à la dernière version, aucune action ne sera entreprise. Si un nouvel exécutable est disponible, il sera mis à jour.

- Pas amarré : `urbit next [pier]`
- Amarré : `[pier]/.run next`

### `queu AT-EVENT`

Charger un fichier jam instantané. `AT-EVENT` est un numéro d'événement. Il doit y avoir une capture instantanée correspondante dans `[pier]/.urb/roc/[AT-EVENT].jam` qui a été créée précédemment avec `cram` ou `-n`.

- Pas amarré : `urbit queu [pier] 10000`
- Amarré : `[pier]/.run queu 10000`

### `vere ARGS DIR`

Télécharger un exécutable. `DIR` est un répertoire de sortie (il doit déjà exister) et les `ARGS` sont :

- `a, --arch ARCH` - architecture, `ARCH` peut être l'un de `x86_64-linux`, `x86_64-darwin`, `x86_64-windows` et `aarch64-linux`, mais d'autres peuvent être ajoutés dans le futur.
- `-v`, `--version VER` - numéro de version, `VER` est par exemple 1.9.
- `-p, --pace` - canal de diffusion, par exemple `live`.

Exemple d'utilisation :

- Pas amarré : `urbit vere -a x86_64-linux -v 1.9 -p live` .

### `vile`

Exporter le fichier de clés.

Les clés privées des vaisseaux du ponton spécifié seront affichées sur le terminal.

- Pas amarré: `urbit vile [pier]`
- Amarré : `[jetée]/.run vile`

### `serf ARGS`

Exécution en tant que `serf` (comme s'il s'agissait du `urbit-worker` précédemment séparé).

Notez que cet utilitaire est destiné au développement du noyau et a une interface programmable, il n'a pas d'interface utilisateur.

- Pas amarré : `urbit serf [pier] [key] [flags] [cache-size] [at-event]`

## Options

Ci-dessous vous trouverez toutes les options/flags/arguments qui peuvent être fournis au runtime urbit.

### `-A, --arvo DIR`

Lors de l’initialisation d'un nouveau vaisseau, utilisez le répertoire `DIR` pour la synchronisation initiale du bureau `%base`, plutôt que celui de la pilule.

```
urbit -w sampel-palnet -k /path/to/my.key -A /path/to/arvo
```

### `-b, --http-ip IP`

Lier le serveur HTTP à l'adresse `IP`.

- Pas amarré : `urbit -b 192.168.1.10 [pier]`
- Amarré : `[pier]/.run -b 192.168.1.10`

```
> ss -tlnp | grep urbit
LISTEN 0      16         127.0.0.1:12321      0.0.0.0:*    users:(("urbit",pid=15689,fd=29))
LISTEN 0      16      192.168.1.10:8080       0.0.0.0:*    users:(("urbit",pid=15689,fd=28))
```

### `-B, --bootstrap PILL`

Lorsque vous initialisez un nouveau vaisseau, utilisez le fichier `PILL` pour la pilule, plutôt que le fichier par défaut récupéré sur https://bootstrap.urbit.org

```
urbit -w sampel-palnet -k /path/to/my.key -B /path/to/the.pill
```

### `-c, --pier PIER`

Lors de l’initialisation d'un vaisseau, nommez son ponton comme `PIER` plutôt que l'habituel `@p`.

- Pas amarré : `urbit -w sampel-palnet -k /path/to/my.key -c foobar`

Le dossier du ponton sera nommé `foobar` à la suite de la commande ci-dessus.

### `-c, --memo-cache-limit LIMIT`

Ceci définit le nombre maximum d'entrées pour le cache de mémorisation (utilisé par `~+` et quelques autres choses). Zéro signifie non plafonné, sinon le nombre d'entrées est spécifié.

- Pas amarré : `urbit -C 50000 [pier]`
- Amarré : `[pier]/.run -C 50000`

### `-d, --daemon`

Exécuter le vaisseau en mode *daemon*. Le processus sera détaché du terminal (ce qui implique `-t`).

- Pas amarré : `urbit -d [pier]`
- Amarré : `[pier]/.run -d`

### `-e, --ethereum URL`

Utiliser la pont Ethereum à `l'URL` plutôt que la valeur par défaut.

- Pas amarré : `urbit -e [https://the.url](https://the.url/) [pier]`
- Amarré : `[pier]/.run -e [https://the.url](https://the.url/)`

### `-F, --fake SHIP`

Initialiser un nouveau faux vaisseau pour le développement. Le réseau réel est désactivé, et le faux vaisseau ne peut communiquer qu'avec d'autres faux vaisseaux sur la machine locale. Cela fonctionne pour toutes les classes de vaisseaux sauf les comètes.

```
urbit -F zod
```

### `-g, --gc`

Activer l'indicateur GC, en vidant les journaux du récupération de mémoire sur stdout. Ceci exécute une passe GC à la fin de chaque calcul virtualisé. Il s'agit d'un outil de développement et d'assurance qualité pour la vérification des calculs de référence. Actuellement, cela ne fonctionne que si l’exécutable a été construit avec `MEMORY_DEBUG` (qui change les structures d'allocation et produit des captures instantanées qui sont incompatibles).

- Pas amarré : `urbit -g [pier]`
- Amarré : `[pier]/.run -g`

### `-G --key-string STRING`

Initialiser un nouveau vaisseau avec la clé privée `STRING`. La clé privée est au format `@uw`. Voir `-k` pour une alternative.

- Pas amarré : `urbit -w sampel-palnet -G 0w50w.642KA.glYh8.RvaRp.6TA35.3XRYN.ULCI6.UmcsZ.5rGvG.3dvFt.E6rMF.mZnd~.3O6QB.7LZ1f.-ukYN.z2fcY.Ecviv.LiZEg.8w0sp`

### `--http-port PORT`

Définir le port HTTP comme `PORT`. Il s'agit du port sur lequel vous accédez à Landscape de manière non sécurisée. Notez que ceci est uniquement pour le HTTP non sécurisé, voir `--https-port` pour le HTTPS.

- Pas amarré : `urbit --http-port 8085 [pier]`
- Amarré : `[pier]/.run --http-port 8085`

### `--https-port PORT`

Définir le port HTTPS sur `PORT`. Il s'agit du port sur lequel vous accédez à Landscape en toute sécurité. Notez que cela nécessite la configuration d'un certificat SSL, consultez le guide [Configurer SSL](https://operators.urbit.org/manual/os/basics#configuring-ssl) pour plus de détails. Notez que si votre vaisseau se trouve derrière un proxy inverse (nginx, Caddy, etc.) et qu'un certificat SSL y est configuré, vous n'activerez généralement pas HTTPS sur le vaisseau lui-même.

Notez que ceci est pour le HTTPS sécurisé seulement, voir `--http-port` pour le HTTP non sécurisé.

- Pas amarré : `urbit --https-port 8443 [pier]`
- Amarré : `[pier]/.run --https-port 8443`

### `-I, -injecter FICHIER`

Injecter l'événement stocké dans le fichier `FILE` jamfile.

Notez que ceci a des "privilèges complets" et peut faire n'importe quoi à votre vaisseau. `-I` est pour la personnalisation dans les environnements d'hébergement, et la récupération d'urgence pour les vaisseau qui sont siphonnés. A ne lancer qu'à partir de sources de confiance.

- Pas amarré : `urbit -I /path/to/file.jam [pier]`
- Amarré: `[pier]/.run -I /path/to/file.jam`

### `-j, --json-trace`

Créer des fichiers de suivi JSON dans `[pier]/.urb/put/trace`.

Ceci exécute un profileur de traçage, et produit une sortie JSON compatible avec `chrome://tracing`.

- Pas amarré : `urbit -j [pier]`
- Amarré : `[pier]/.run urbit -j`

### `-J, --ivory-pill PILL`

Ceci spécifie une pilule Ivory alternative à utiliser. Une pilule Ivory est une pilule compilée dans l’exécutable et utilisée pour le code de support d'exécution. Vous ne l'utiliserez typiquement pas à moins que vous ne fassiez du développement du noyau ou d'exécution.

- Pas amarré : `urbit -J /path/to/ivory.pill [pier]`
- Amarré : `[pier]/.run -J /path/to/ivory.pill`

### `-k, --key-file KEYS`

Initialiser un nouveau vaisseau avec le fichier de clé privée `KEY`. Voir `-G` pour une alternative.

- Pas amarré : `urbit -w sampel-palnet -k /path/to/my.key`

### `-L, --local`

Exécuter un vaisseau sur un réseau local uniquement. Cela désactivera le réseau Ames, de sorte que le vaisseau ne sera pas en mesure de communiquer avec d'autres vaisseaux. HTTP(S) continuera à fonctionner normalement.

- Pas amarré : `urbit -L [pier]`
- Amarré : `[pier]/.run -L`

### `--loom SIZE`

Spécifier la taille du loom (utilisation maximale de la mémoire).

La taille est spécifiée en exposant de 2. La valeur par défaut est 32 (2Go), le minimum est 20 (1Mo), et le maximum est 32 (4Go).

- Pas amarré : `urbit --loom [size] [pier]`
- Amarré : `[pier]/.run --loom [size]`

Ceci peut également être utilisé avec des utilitaires comme [`pack`](#pack) et [`meld`](#meld). Notez qu'elle doit être spécifiée après l'utilitaire comme `urbit pack --loom 32 ~/piers/zod`.

### `-n, --replay-to NUMBER`

Rejouer jusqu'à l'événement `NUMBER` spécifié.

- Pas amarré : `urbit -n 10000 [pier]`
- Amarré : `[jetée]/.run -n 1000`

Une capture instantanée sera sauvegardée dans un fichier jam à `[pier]/.urb/roc/[NUMERO].jam`.

### `--no-conn`

Désactiver le socket unix du panneau de contrôle.

- Pas amarré : `urbit --no-conn [pier]`
- Amarré : `[pier]/.run --no-conn`

### `--no-dock`

A partir de la v1.9, lorsqu'un nouveau vaisseau est initialisé, l’exécutable urbit se copie par défaut dans le nouveau ponton créé (voir la section [`dock`](#dock) pour plus de détails). Pour éviter que cela ne se produise, l'option `--no-dock` peut être utilisée.

- Pas amarré : `urbit --no-dock -w sampel-palnet -k /path/to/my.key`

### `-p, --ames-port PORT`

Définir le port UDP de Ames à `PORT`. Il s'agit du port utilisé pour les communications inter-vaisseaux.

- Pas amarré : `urbit -p 33333 [pier]`
- Amarré : `[pier]/.run -p 33333`

### `-P, --profile`

Activer la création de profils. Les profils seront enregistrés dans `[pier]/.urb/put/profile/[now].txt.` Ceci est utile pour la résolution de bugs et le développement. Les compteurs d'occurrences de profilage dans le code Hoon spécifié avec `~$` seront enregistrés ici.

Ceci exécute un profileur d'échantillonnage et produit une sortie personnalisée. Les mesures de coût d'exécution ne sont calculées que si l’exécutable a été construit avec `CPU_DEBUG`.

- Pas amarré : `urbit -P [pier]`
- Amarré `[pier]/.run -P`

### `-q, --quiet`

Exécuter un vaisseau sans dialogue. Cela désactive la sortie que la commande `|verb` fait basculer. C'est l'inverse de `-v`. La verbosité peut être réactivée en exécutant `|verb`.

- Pas amarré : `urbit -q [pier]`
- Amarré : `[pier]/.run -q`

### `-r, --replay-from NUMBER`

Charger la capture instantanée et le lier à l'événement `NUMBER`, ne rejouez qu'après cet événement. Cela vous permet de reprendre une lecture partiellement terminée. Pour le `NUMBER` donné, il doit y avoir une capture instantanée correspondante dans `[pier]/.urb/roc/[NUMERO].jam`, créé par `cram` ou `-n`.

- Pas amarré : `urbit -r 10000 [pier]`
- Amarré : `[pier]/.run -r 10000`

### `-r, --versions`

Afficher les informations relatives à la mouture Vere.

```
> urbit -R
urbit 1.9
gmp: 6.2.1
sigsegv: 2.14
openssl: OpenSSL 1.1.1n  15 Mar 2022
libuv: 1.43.0
libh2o: 0.13.6
lmdb: 0.9.29
curl: 7.81.0
```

- Pas amarré : `urbit -R [pier]`
- Amarré : `[pier]/.run -R`

### `-t, --no-tty`

Désactiver les hypothèses de terminal/TTY. Avec ce paramètre, il n'y aura pas d’invitation Dojo, et vous ne verrez que les messages de débuggage du runtime. Ceci est similaire au mode daemon (voir `-d`), mais le processus restera attaché au terminal dans lequel il a été exécuté.

- Pas amarré : `urbit -t [pier]`
- Amarré : `[pier]/.run -t`

### `-u, --bootstrap-url URL`

Initialiser un nouveau vaisseau, en utilisant la pilule récupérée depuis l'URL plutôt que celle fournie par défaut.

- Pas amarré : `urbit -w sampel-palnet -k /path/to/my.key -u [http://example.com/the.pill](http://example.com/the.pill)`

### `--urth-loom SIZE`

Spécifie la taille du loom (utilisation maximale de la mémoire) du processus "king"/"urth".

La taille est spécifiée en exposant de 2. Il est peu probable que vous ayez besoin d'utiliser cette option car le processus "king"/"urth" n'a pas d'état persistant et n'a pas besoin de beaucoup de mémoire. L'option [`--loom`](#--loom-size), qui fixe la taille de la mémoire de "serf"/"mars", est beaucoup plus utile.

- Pas amarré : `urbit --urth-loom [size] [pier]`
- Amarré : `[pier]/.run --urth-loom [size]`

### `-v, --verbose`

Exécuter un vaisseau avec une sortie textuelle. C'est la même chose que ce que vous obtenez lorsque vous exécutez `|verb`, et ceci peut être désactivé en exécutant `|verb`. C'est l'opposé de `-q`.

- Pas amarré : `urbit -v [pier]`
- Amarré : `[pier]/.run -v`

### `-w, --name NOM`

Initialiser un nouveau vaisseau avec une Urbit ID définit comme `NAME`. Le `NAME`est le format ordinaire `@p` mais sans le `~` de tête, donc `~sampel-palnet` est spécifié comme `sampel-palnet`. Ceci est typiquement utilisé en conjonction avec `-k` lors de l’initialisation d'un nouveau vaisseau.

- Pas amarré : `urbit -w sampel-palnet -k /path/to/my.key`

### `-x, --exit`

Exécuter un vaisseau immédiatement après son démarrage.

- Pas amarré : `urbit -x [pier]`
- Amarré : `[pier]/.run -x`

### `-X, --scry PATH`

Lire l'état d'un vaisseau à travers le chemin scry `PATH`, brouille ensuite le résultat et le sauvegarde dans `[pier]/.urb/put/[PATH].jam`. Le chemin scry est au format `/[care]/[path]`, sans les éléments ship et case. Par exemple, `/cx/~zod/base/~2022.6.2..11.27.40..8f56/gen/code/hoon serait /cx/base/gen/code/hoon`.

- Pas amarré : `urbit -X /cx/base/gen/code/hoon [pier]`
- Amarré : `[quai]/.run -X /cx/base/gen/code/hoon`

### `-Y, --scry-info FILE`

Nom optionnel pour le fichier produit par un scry effectué avec `-X`, plutôt que le chemin du scry.

- Pas amarré : `urbit -X /cx/base/gen/code/hoon -Y foobar [pier]`
- Amarré : `[pier]/.run -X /cx/base/gen/code/hoon -Y foobar`

### `-Z, --scry-format FORMAT`

Spécifier de manière optionnelle  le format de sortie pour le fichier produit par un scry `-X`. Le format peut être brouillé pour produire un fichier `jam`, ou bien une aura. Si c'est une aura, le `@` de tête est omis, donc `@ud` est spécifié comme `ud`. Si une aura est spécifiée, l'atome résultant est encodé dans un fichier texte avec le formatage de cette aura. Si une aura est spécifiée, le point final de scry doit produire un atome, et non une cellule.

- Pas amarré : `urbit -X /cx/base/gen/code/hoon -Z ud [pier]`
- Amarré : `[pier]/.run -X /cx/base/gen/code/hoon -Z ud`
