+++
title = "Principes de base"
description = "Comment faire fonctionner votre vaisseau, y compris l'utilisation du système de fichiers et des applications de messagerie de votre vaisseau, le démarrage d'une lune, ou la demande d'une entrée DNS."
template = "doc.html"
weight = 1
[extra]
hidetitle = "true"
+++

Ce document porte sur comment :

- Exécuter un vaisseau Urbit avec un temps d'exécution normal [depuis la ligne de commande](https://urbit.org/getting-started/cli).
- Configuration de base, configuration et utilisation dans l’interface système shell d'Urbit appelé `dojo`.

## Arrêt

Vous pouvez éteindre votre instance Urbit avec `Ctrl-d` à partir des invitations de commande Chat ou Dojo.

Vous pouvez forcer l’arrêt de votre Urbit avec `Ctrl-z` de n'importe où.

## Redémarrer 

Pour redémarrer votre Urbit, utilisez simplement le nom de votre ponton (pier) :
```sh
$ ./urbit some-planet
```

ou

```sh
$ ./urbit comet
```

## Journalisation

Pour journaliser la sortie de la ligne de commande d’Urbit dans un fichier, utilisez le `script` :

```sh
$ script urbit.log ./urbit your-urbit
```

## Déplacer votre ponton

Les pontons (pier) sont conçus pour être portables, mais cela _doit_ être fait pendant que l'Urbit ne s'exécute pas. Le réseau urbit est conscient de son propre état, ainsi, vous ne pouvez pas exécuter deux copies du même urbit à deux endroits différents.

Pour déplacer un ponton, il suffit de déplacer le contenu du répertoire dans lequel il vit. Pour garder ces fichiers aussi petits que possible, nous utilisons habituellement l'option `--sparse` de `tar`. Avec un ponton`your-urbit/`, quelque chose comme ceci devrait fonctionner :

```sh
tar -Scvzf ~/your-urbit.tar.gz ~/your-urbit/
scp your-old-server:~/your-urbit.tar.gz your-new-server:~
```

Ensuite, pour le décompresser, sur votre autre serveur Unix, exécutez :
```sh
tar xfvz your-urbit.tar.gz
```

Supprimez le fichier tar, après avoir installé Urbit sur votre nouveau serveur. Redémarrez votre sauvegarde Urbit avec :

```sh
./urbit your-urbit
```

## Prérequis en matière de matériel

Urbit peut s’exécuter sur n'importe quel ordinateur x86 (des [exécutables ARM](https://botter-nidnul.github.io/AArch64_Urbit_Static_Binaries.html) non officiels et non supportés sont également disponibles), idéalement avec au moins 2Go de RAM.

Urbit tient un registre persistant de journalisation de votre vaisseau. Finalement, cette journalisation sera automatiquement réduite si nécessaire, mais pour l'instant, elle ne fait qu'augmenter en taille. Une planète utilisée activement consomme 5 et 50Go d'espace de stockage par année de fonctionnement.

## Interface de Commandes

Votre terminal Urbit est séparé en deux parties : l'invite de commande (la ligne du bas) et l'enregistrement (tout au-dessus). L'enregistrement est partagé ; toutes les sorties de toutes les applications de votre ensemble de commandes y apparaissent. L'invitation est multiplexée.

Dans CLI, les applications Urbit peuvent traiter votre saisie avant que vous ne cliquiez sur retour. Pour voir cela en action, essayez d'entrer `)` comme premier caractère dans l'invitation de commande Dojo. Puisqu'il n'y a pas de commande Dojo ou d'expression Hoon commençant par ')', le Dojo la rejette.

`Ctrl-x` - Changer l’invitation de commande entre les applications de la console en cours d'exécution

`Ctrl-c` - Crash de l'évènement en cours. Traitement au niveau de la couche Unix et impression d'une trace de la stack.

`Ctrl-d` - Arrête votre processus Urbit depuis Chat ou Dojo.

`Ctrl-z` - Arrête le processus Urbit de n'*importe où*.

`↑ / ↓` - Historique de navigation

Les combinaisons de touches de style emacs suivantes sont disponibles :

```
Ctrl-a    Cursor to beginning of the line (Home)
Ctrl-b    Cursor one character backward (left-arrow)
Ctrl-e    Cursor to the end of the line (End)
Ctrl-f    Cursor one character forward (right-arrow)
Ctrl-g    Beep; cancel reverse-search
Ctrl-k    Kill to end of line
Ctrl-l    Clear the screen
Ctrl-n    Next line in history (down-arrow)
Ctrl-p    Previous line in history (up-arrow)
Ctrl-r    Reverse-search
Ctrl-t    Transpose characters
Ctrl-u    Kill to beginning of line
Ctrl-y    Yank from kill buffer
```

## Mises à jour

Par défaut, votre `%base` [bureau](https://developers.urbit.org/reference/glossary/desk) (contenant le noyau [Arvo](https://developers.urbit.org/reference/glossary/arvo) et les applications centrales) reçoit les mises à jour ([OTA](https://developers.urbit.org/reference/glossary/ota-updates)) de votre parrain. Les autres bureaux recevront des mises à jour de leurs éditeurs respectifs. Pour vérifier la source OTA de chaque bureau, exécutez `+vats` dans le [dojo](https://developers.urbit.org/reference/glossary/dojo). L’affichage des résultats pour chaque bureau sera dans le champ `source` indiquant à partir de quel bureau sont reçues les mises à jour et le champ `updates`montre le `tracking` si les mises à jour automatiques sont activées.

Si, pour une raison quelconque, les mises à jour ne sont pas activées ou si la source actuelle n'est pas en ligne ou à jour, vous pouvez activer les mises à jour ou changer de source avec la commande `|install`.

`|install (sein:title our now our) %landscape` activera les mises à jour vers le bureau `%landscape` depuis votre parrain. `|install ~some-ship %landscape` activera les mises à jour vers le bureau Landscape depuis le vaisseau spécifié à la place de `~some-ship`. Pour les applications tierces, assurez-vous d'indiquer correctement le vaisseau de l'éditeur. Les mises à jour de chaque bureau sont gérées séparément, vous devrez donc les exécuter séparément pour chaque bureau. Pour le bureau `%base` en particulier, vous synchronisez depuis `%kids` au lieu de `%base` sur le vaisseau à distance, vous devez donc le spécifier comme `|install (sein:title our now our) %kids`, `=local %base`.

#### Dépannage supplémentaire OTA

Veuillez consulter le Wiki de support pour d'autres dépannage OTA, tels que : **[OTA 1.0.71 failed](https://github.com/urbit/support/wiki/OTA-1.0.71-failed)**, **[Missing OTA](https://github.com/urbit/support/wiki/Missing-OTA)**, **[Stuck flow preventing planets from receiving OTAs](https://github.com/urbit/support/wiki/Stuck-flow-preventing-planets-from-receiving-OTAs)**, et **[No content shows in Links page after OTA](https://github.com/urbit/support/wiki/No-content-shows-in-Links-page-after-OTA)**

## Interface Web

Au démarrage, Urbit essaie de se connecter via `localhost:80`. Si vous exécutez déjà quelque chose sur le port 80, ou si votre système d'exploitation hôte ne permet pas à Urbit de lier le port `80`, Urbit essaiera `8080`, puis `8081`, `8082`, et ainsi de suite. Pour les planètes seulement, nous fournissons également gratuitement des sous-domaines via arvo.network. Toute planète `~your-urbit` se trouve aussi sur votre `-urbit.arvo.network`, mais seulement après avoir [configuré le DNS](https://operators.urbit.org/manual/os/basics#dns-setup).

Une fois exécuté, vous pouvez vous connecter à l'interface web de votre vaisseau depuis `http://localhost` (si lié au port `80`), `http://localhost:8080` (si lié au port 8080), ou `https://your-urbit.arvo.network` si vous avez configuré le DNS.

## Lunes {% #lunes %}

Les planètes peuvent générer des lunes, qui sont conceptuellement destinées à des systèmes connectés : téléphones, téléviseurs intelligents, thermostats numériques. L'idée de base est que votre planète tourne en permanence dans une database quelque part, tandis que les lunes tournent sur tous vos appareils. Chaque planète peut émettre ~4 milliards (2^32) de lunes.

Pour générer une lune aléatoirement à partir de votre planète, exécutez :

```
~sampel-palnet:dojo> |moon
moon: ~faswep-navred-sampel-palnet
0w5cT5t.wCO6i.~e1xg.Oz0qb.QNO6I.3Kt2T.h9M9F.U3vU~.X3Qu0.gtb19.IYTkY.80kWZ.SIEUE.DXa8i.TiDof.o3-1C.RHLKS.k81M0.ecz5o.ic0Bg.600g1
```

La partie de la commande après `moon:` est le nom de la lune, dans ce cas `~faswep-navred-sampel-palnet`. La ligne suivante commençant par `0w5...` représente la clé privée nécessaire à l’initialisation.

Vous pouvez simplement copier la clé (qui dans ce cas serait la partie `0w5[...]600g1`) dans le bloc note, ou la sauvegarder dans un fichier `.key`, par exemple `faswep-navred-sampel-palnet.key`.

Vous pouvez utiliser la clé et le nom de la lune dans le même flux d'installation depuis le guide [d'installation en ligne de commande](https://urbit.org/getting-started/cli), suivant le même schéma que pour l’initialisation d'une planète. Via ce schéma :

```sh
$ ./urbit -w <moon-name> -G <key> -c <pier-name>
```

ou

```sh
$ ./urbit -w <moon-name> -k <key-file> -c <pier-name>
```

Notez que `<moon-name>` exclut `~` dans la commande. L'argument `-c <piername>` n'est pas obligatoire, mais il est recommandé; sinon, le répertoire résultant est un nom de lune plutôt lourd. Les lunes sont automatiquement synchronisées avec leur bureau parent `%kids`, et peuvent contrôler les applications de leur planète parente en utilisant `|link`.

Pour réinitialiser une lune, c'est-à-dire pour réinitialiser sa présence sur le réseau afin qu'elle soit traitée comme un vaisseau fraîchement créé par les autres. Lancez l'opération suivante depuis le vaisseau parent :

```
|moon-breach ~faswep-navred-sampel-palnet
```

Pour faire défiler les clés d’une lune sans réinitialisation d’usine, exécuter :

```
|moon-cycle-keys ~faswep-navred-sampel-palnet
```

Vous pouvez ensuite exécuter |rekey sur la lune avec la clé donnée par la commande ci-dessus comme argument

### Maintenir les lunes à travers une réinitialisation {% #maintenir-les-lunes %}

Les lunes sont [toujours subordonnées au vaisseau qui les a émises.](https://developers.urbit.org/reference/glossary/moon). Leurs clés privées sont envoyées à travers le réseau par leur planète/étoile/galaxie mère. Ainsi, si la planète/l'étoile/la galaxie mère d'une lune est sujette à une réinitialisation, les autres urbits du réseau n’étant pas conscient de la réinitialisation, et donc du changement de clé privée, ne pourront pas atteindre l’ancienne lune. Les lunes peuvent, cependant, être préservées à travers une réinitialisation de leurs parrains et réajoutées à `jael`. Le guide suivant suppose que vous êtes sur `[life=n rift=1]` où `n` peut être n'importe quel nombre de vie #. Si vous avez déjà réinitialisé votre lune et souhaitez la préserver, vous devrez modifier les instructions pour inclure le réglage approprié en utilisant `|moon-breach` depuis l'invite de commande `hood`.

Pour ajouter une lune existante à `jael` sur une planète réinitialisée, vous aurez besoin de ce qui suit :

- La vie actuelle de votre lune # `+keys ~sampel-monler-dozzod-dozzod` (exécuté sur la lune)
- La compréhension de l’état actuel de votre lune par son parrain (même commande, exécutée sur le parrain).
- Le fichier ou la chaîne de clés existants de votre lune (`@uw`) _ou_ le résultat de `pub:ex :(nol:nu:crub:crypto .^(@uv %j /=vein=/<numéro de vie de la lune, par lune, ici>))`
- La compréhension par le parrain de votre lune sur l’existence de votre clé publique de lune `pass:.^([@ud pass=@uw ~] %j /=deed=/~sampel-monler-dozzod-dozzod/<life # of moon per sponsor here>)`
- Si vous ne disposez que du fichier ou d’une chaîne de clés provenant de la dernière initialisation de votre lune, vous devrez dériver la valeur `pass` à partir de ce fichier ou de cette chaîne à l'aide de la méthode suivante.

```
pub:ex:(nol:nu:crub:crypto key:(seed:jael:l (cue <your @uw keyfile contents or key-string contents here>)))
```

Cela devrait produire `@ud`.

Une fois que vous avez tous les éléments nécessaires, vous pouvez effectuer les opérations suivantes sur le parrain de la lune :
```
|moon-cycle-keys ~sampel-monler-dozzod-dozzod, =life <life # of moon, per moon, here>, =public-key <result of the existing keyfile conversion to pass or the result of scrying jael on your moon, found above>
```

Finalement, les clés privées se propagent à travers le réseau w/ via le numéro vie (*life*) correct, en reconnectant votre lune précédemment orpheline. Vous pouvez accélérer cela en utilisant `|hi ~zod` et `|hi ~sampel-monler-dozzod-dozzod`-ing provenant respectivement de la lune et du parrain (remplacez par les noms de vaisseaux appropriés)


## Se libérer d’un parrain {% #Se libérer %}

Pour utiliser le réseau en tant que planète ou étoile, vous devez être sponsorisé respectivement par une étoile ou une galaxie active. Si votre parrain ne correspond pas à vos besoins, vous pouvez passer à un autre. Cela peut être fait avec [Bridge](https://bridge.urbit.org/) en suivant les instructions [sur cette page](https://operators.urbit.org/manual/id/using-bridge#escaping-your-sponsor).

## Life and rift number

Vous pouvez vérifier la vie (_life_) de votre vaisseau et le numéro de réinitialisation (_rift_) en exécutant `+keys our` dans le dojo. Vous pouvez vérifier la vie et le numéro de réinitialisation d'un autre vaisseau en exécutant `+keys ~sampel-palnet`. Pour en savoir plus sur la vie et le rift, voir [Vie et réinitialisations](https://developers.urbit.org/reference/azimuth/life-and-rift).

## Configuration DNS {% #Configuration-DNS %}

Nous avons un système qui vous permet de demander un nom de domaine pour votre vaisseau sous la forme suivante : `ship.arvo.network`, où `ship` est le nom de votre vaisseau sans le `~`. Cela permet aux utilisateurs d'accéder à leurs vaisseaux à distance en utilisant Landscape depuis notre interface web. Les étoiles et les planètes suivent le même processus de demande DNS, et les galaxies ont leurs propres besoins. Les lunes et les comètes ne sont pas supportées.

Pour que la requête DNS d'une planète ou d'une étoile soit faite et satisfaite, elle doit héberger son vaisseau quelque part avec une adresse IP publique, et son serveur HTTP doit être à l'écoute sur le port 80.

Pour initier une requête DNS, exécutez le *thread* suivant dans le dojo de votre vaisseau, en passant l'adresse IP comme argument avec la syntaxe .0.0.0.0 (`@if`). À titre d'exemple :

```
-dns-address [%if .1.2.3.4]
```

Le thread `%dns-address`, exécuté localement, lancera une requête HTTP à cette adresse IP sur le port 80 pour confirmer qu'il est lui-même disponible sur cette adresse IP et à ce port. Si cela échoue, vous recevrez un message `couldn't access ship on port 80` dans le terminal; cette demande sera réessayée plusieurs fois. Si l'auto-vérification réussit, la requête est relayée à `~deg`, et vous recevrez un message disant, `request for DNS sent to ~deg`. Une fois que `~deg` a accusé réception de la demande, le thread `%dns-address` affichera un message dans le terminal indiquant `awaiting response from ~deg`

La requête prendra un peu de temps à être exécutée, mais finalement l'enregistrement DNS `ship.arvo.network` sera défini à l'adresse IP donnée. Une fois cela configuré, `~deg` notifiera votre vaisseau. Votre vaisseau va maintenant essayer de vérifier qu'il peut se joindre lui-même sur `ship.arvo.network` via le port 80. S'il ne peut pas, il enverra un message disant, `unable to access via ship.arvo.network`. S'il le peut, il se configurera avec ce domaine et dira `confirmed access via ship.arvo.network`.

Parfait ! Vous êtes maintenant configuré. Essayez d'accéder à `ship.arvo.network` dans votre navigateur afin d’utiliser Landscape; nous vous recommandons Chrome ou Brave.

### Configuration de SSL

Pour activer SSL sur votre vaisseau, vous devez faire appel à l'agent `%acme` avec le domaine encodé dans un chemin et il demandera un certificat. Le format du chemin est `/tld/your_domain/your_subdomain`, donc si votre domaine est `sampel-palnet.arvo.network`, vous l'utiliserez comme ceci :

```
:acme &path /network/arvo/sampel-palnet
```

### Galaxies

Les galaxies doivent déjà avoir une entrée DNS distincte sur galaxy.urbit.org. Il n'y a pas de processus automatisé pour obtenir cette liaison, donc si vous êtes un détenteur de galaxie, contactez-nous à support@urbit.org.

Il y a une commande pour les galaxies qui essaieront de réutiliser leur entrée DNS Ames déjà nécessaire pour HTTPS:

```
> -dns-auto
```

Cela lancera des requêtes HTTP pour vérifier automatiquement la disponibilité `galaxy.$AMES-DOMAIN` (actuellement galaxy.urbit.org), où `galaxy` est le nom de la galaxie sans le `~`.

Sinon, `-dns-auto` fonctionne de la même manière que `-dns-address` avec les étoiles et les planètes.

### Ports

La logique intégrée pour écouter sur le port 80 est d'essayer de se lier au port 80 ; si cela n'est pas possible, essayer 8080, puis incrémenter jusqu'à ce qu'il puisse se lier à un port. Le port 80 est disponible pour les processus sans privilèges sur les versions récentes de macOS. Sinon, le processus doit être exécuté en tant que super utilisateur ou avoir une permission spéciale (`sudo setcap 'cap_net_bind_service=+ep' /path/to/urbit/binary` sous Linux).
