+++
title = "Dépannage des vaisseaux"
weight = 8
template = "doc.html"
aliases = ["docs/using/ship-troubleshooting/"]
+++

Urbit est toujours en phase de développement, donc il y a une chance que votre vaisseau ne démarre pas, ou cesse de fonctionner correctement lorsque vous l’exécuté. Ce n'est pas grave! Ce document est destiné à vous aider à résoudre ce problème.

Cette page contient les solutions à la plupart des problèmes les plus fréquemment rencontrés. Si votre problème n'est pas couvert ici, veuillez consulter notre [Base de Connaissance pour le Dépannage](https://github.com/urbit/support/wiki).

## Table des matières

- Bonnes pratiques
- Problèmes de fonctionnement
- Problèmes de connectivité
- Problèmes de d'initilisation
- Problèmes de plantage

## Bonnes pratiques {% #bonnes-pratiques %}

Une once de prévention vaut mieux qu'une tonne de remèdes, alors passons d'abord en revue quelques bonnes pratiques pour garder votre vaisseau en état de marche.

### N'initialisez votre vaisseau qu'une seule fois

Une fois que votre vaisseau a été initialisé (avec la variante `-w` de la commande `./urbit`), vous ne devez jamais le faire une seconde fois. Si vous l'initialisez à nouveau sans prendre de mesures particulières, vous aurez des difficultés à communiquer avec les vaisseaux du réseau avec lesquels vous aviez parlé auparavant.

Si vous l'avez accidentellement fait une deuxième fois, ou si vous voulez intentionnellement repartir à zéro, vous devez effectuer une [réinitialisation d'usine](https://operators.urbit.org/manual/os/ship-troubleshooting#factory-reset), ce qui est expliqué dans la section suivante.

### Ne supprimez pas votre ponton (*pier*)

Urbit est étatique, ce qui signifie qu'il a besoin de conserver toutes vos données. Si vous supprimez votre ponton et démarrez votre vaisseau à nouveau, vous ne serez pas en mesure de parler à quelque vaisseau que ce soit, même avec ceux que vous aviez contacté auparavant. La seule solution à ce problème est d'effectuer une [réinitialisation d'usine](https://operators.urbit.org/manual/os/ship-troubleshooting#factory-reset).

### Gardez une trace du répertoire dans lequel vous placez votre vaisseau

Lorsque vous démarrez votre vaisseau pour la première fois, assurez-vous de le placer à un endroit où vous pourrez le retrouver et où il ne sera pas supprimé accidentellement.

### Gardez les versions que vous utilisés à jour

Vérifiez la dernière version d'Urbit sur https://github.com/urbit/urbit/releases. Si vous êtes en retard, mettez à jour en utilisant [ce guide](https://urbit.org/getting-started/cli#updating).

### `|hi` **votre étoile pour voir si vous êtes connectés**

Découvrez qui est propriétaire de votre étoile en exécutant (`sein:title our now our`) dans le Dojo. Ensuite, exécutez `|hi ~star`, où `~star` est le nom de l’étoile, et si les choses fonctionnent correctement, vous devriez obtenir le message `hi ~star successful`. Il peut également être utile d'utiliser `|hi` pour vérifier la connectivité avec `~zod` ou une autre planète avec qui vous partagez un canal de discussion.

### Éteignez et rallumez votre vaisseau

Utilisez `ctrl-d` pour quitter gracieusement votre vaisseau, puis redémarrer le. Cela peut résoudre de nombreux problèmes.

### Utilisez la commande`|knob` pour personnaliser vos messages d'erreur

Les messages d'erreur peuvent être accablants, la commande`|knob` est destinée à y remédier. Elle est utilisée pour faire taire les erreurs qui ne sont pas importantes.

La commande prend deux arguments, et se présente sous la forme de `|knob %error-tag %level`.

`%error-tag` est le nom de l'erreur en question. Il est généralement affiché en haut de la stack, comme dans `crud : %hole event failed` -- `%hole` voici un exemple de balise d'erreur.

`%level` détermine le nombre d'erreurs que vous verrez avec `%error-tag` que vous avez choisi. Il existe trois niveaux :

- `%hush` : aucun affichage.
- `%soft` : une ligne affichée, contenant uniquement la balise d'erreur.
- `%loud` : liste complète affichée.

Ainsi, par exemple, pour faire taire toutes les erreurs liées aux paquets Ames, essayez `|knob %hole %hush`.

### Effectuez une réinitialisation d'usine. {% #réinitialisation-d'usine %}

Une réinitialisation d'usine consiste à demander au reste du réseau de traiter le vaisseau comme s'il venait de démarrer pour la première fois. Toute communication en cours ou en suspens est oubliée et les connexions sont rétablies à partir de zéro.

Les réinitialisations d'usine permettent souvent de résoudre les problèmes de connectivité, mais elles ne doivent être utilisées qu'en dernier recours. Pour savoir comment effectuer une réinitialisation d'usine, consultez notre [Guide des réinitialisations d'usine](https://operators.urbit.org/manual/id/guide-to-resets). Avant de prendre une mesure aussi radicale, essayez les autres méthodes proposées dans ce guide. Vous pouvez également demander de l'aide sur le canal d'aide du groupe Urbit Community que vous trouverez sur `~bitbet-bolbel/urbit-community`.

### Réinitialiser le `+code`

**ATTENTION** : Ne réinitialisez pas votre `+code` si vous utilisez un vaisseau hébergé. Vous serez bloqué. Veuillez contacter votre hébergeur pour plus d'informations.

Vous vous connectez à Landscape en utilisant la phrase en majuscules obtenue à partir du dojo en entrant `+code`. Pour des raisons de sécurité, il est concevable que vous souhaitiez changer ce code régulièrement. Vous pouvez le faire en entrant `|code %reset` dans le dojo. Cela empêchera [Bridge](https://developers.urbit.org/reference/glossary/bridge) de dériver votre code, ce qui signifie que vous ne pourrez le vérifier qu'à partir du dojo à l'avenir.

## Problèmes de fonctionnement {% #Problèmes-de-fonctionnement %}

### Mon urbit est gelé

Cela se produit parfois si vous traitez un événement très important, ou si vous êtes dans une boucle infinie, ou pour une variété d'autres raisons.

Avant de faire quoi que ce soit, essayez d'attendre une minute : un événement pourrait finir d'être traité. Si la situation ne s'améliore pas, utilisez la commande kill d'Unix, `ctrl-z`, pour terminer le processus de votre vaisseau. Redémarrez ensuite votre vaisseau.

### Lorsque j'essaie de saisir du texte dans le Dojo, il affiche `%dy-edit-busy` ou `%dy-no-prompt`.

Cela se produit lorsque votre Dojo est en attente d'une requête, telle qu'une requête HTTP. Vous pouvez résoudre ce problème en entrant `backspace` ou (`delete` sur Mac).

### Mon vaisseau ne reconnaît pas les changements de fichiers que je fais à mon ponton (pier)

Depuis la version `0.8.0`, les modifications ne sont plus automatiquement synchronisées entre le côté Unix (votre ponton) et votre vaisseau. Pour synchroniser vos modifications de fichiers, vous devez exécuter `|commit %desk` dans votre Dojo. `%desk` étant le bureau que vous souhaitez synchroniser.

## Problèmes de connectivité {% #problèmes-de-connectivité %}

### Je n’arrive à communiquer avec personne

Vous avez peut-être démarré votre vaisseau deux fois, ou l'avez exécuté en utilisant d'anciens fichiers. Si c'est le cas, vous devez effectuer une [réinitialisation d'usine](https://operators.urbit.org/manual/os/ship-troubleshooting#factory-reset).

### Je n'ai pas la dernière version de la mise à jour à distance (OTA)

Vous pouvez vérifier sur quelle version se trouve votre vaisseau en entrant `+trouble` dans dojo et en lisant l’encodage `%base`. Si cela ne correspond pas au dernier encodage publié dans la liste de diffusion `urbit-dev`, vous êtes en retard.

Votre parrain peut simplement être à la traîne, donc parfois cela se résoudra tout seul avec de la patience. Sinon, essayez la procédure décrite [ici](https://github.com/urbit/support/wiki/Missing-OTA).

### Je continue à obtenir une erreur liée à la trace d’appel`Ames`

Vous pouvez voir un message comme celui-ci : `/~zod/base/~2019.7.22..18.55.46..83a3/sys/vane/ames:<[colonne de ligne].[colonne de ligne]>`. Il s'agit d'un chemin d'accès Clay à un fichier Hoon, pointant vers la ligne et la colonne où une expression qui a causée l’arrêt du système. Ce type d'erreur peut être accompagné d'un message `crud`.

Cela signifie qu'un autre vaisseau vous envoie des paquets invalides. Cela peut être dû au fait que l'un des vaisseaux n'a pas mis à jour le "rift number" de l'autre vaisseau, qui est le numéro qui commence à un et s'incrémente chaque fois que ce vaisseau effectue une réinitialisation d'usine.

Cela peut se produire si leurs cles, ou les vôtres, ne correspondent pas. Vous pouvez déterminer qui a les mauvaises clés en exécutant la commande `scry` dans votre dojo : `.^(* %j /=life=/shipname)`, où shipname qui est le nom de l'autre vaisseau. Sauvegardez cette information. Ensuite, allez dans le [contrat Azimut sur Etherscan](https://etherscan.io/address/0x223c067f8cf28ae173ee5cafea60ca44c335fecb#readContract), faites défiler jusqu'à `32. points`, et entrez la représentation hexadécimale de `@p` de l'autre vaisseau. Vous pouvez trouver la représentation hexadécimale en exécutant ...

```
@ux~sampel-palnet
```

... dans le Dojo, où `~sampel-palnet` est le nom de l'autre vaisseau. Ensuite, comparez-le aux informations scry que vous avez sauvegardé. Si ces informations correspondent, cela signifie que l'autre vaisseau est le problème. Si elles ne correspondent pas, votre vaisseau contient des informations erronées sur l'autre vaisseau. Dans ce cas, vous pouvez y remédier en exécutant :

```
`:azimuth-tracker|listen ~ %app %azimuth-tracker`
```


La dernière ligne ci-dessus synchronise à partir d'un nœud Ethereum *tous* les vaisseaux sur le réseau. Si vous ne voulez vous synchroniser qu'avec certains vaisseaux, exécutez :

```

`:azimuth-tracker|listen ~[~sampel-palnet ~zod ~marzod] %app %azimuth-tracker
```

`~sampel-palnet ~zod ~marzod` sont des exemples de noms de vaisseaux; remplacez-les par n'importe quel nombre de noms de vaisseaux souhaités.

Les commandes ci-dessus fonctionnent si vous avez les mauvaises clés des autres vaisseaux. Si d'autres vaisseaux ont les mêmes clés que vous, vous devez leur demander d'une manière ou d'une autre d'exécuter une telle commande.

### Je peux parler à certains vaisseaux, mais je ne peux pas parler à mon parrain et à certains autres vaisseaux.

C'est généralement le résultat de la suppression de votre ponton et du redémarrage de votre vaisseau. Pour résoudre ce problème, vous devez effectuer une [réinitialisation d'usine](https://operators.urbit.org/manual/os/ship-troubleshooting#factory-reset).

## Problèmes d’initialisation {% #problèmes-de-d'initilisation %}

### Mon vaisseau a été initialisé pour la première fois, mais il s'est transformé en comète au lieu de ma planète ou de mon étoile.

Vous avez peut-être utilisé les mauvais arguments lors de l’initialisation de votre vaisseau. Supprimez cette comète et réessayez.

### Mon vaisseau de développement ("fakezod") reçoit un message `boot : malformed` échec

Cela signifie que vous avez donné à votre vaisseau de développement un `@p` invalide. Vous obtiendrez donc cette erreur si vous écrivez, par exemple, `urbit -F zodzod` au lieu de `urbit -F zod`.

## Problèmes de Plantage {% #problème-de-plantage %}

### J'ai eu une erreur `bail` et mon vaisseau s'est planté

Essayez de le remettre en marche; il se remettra souvent à fonctionner correctement de lui même.

Toutefois, si vous obtenez à nouveau une erreur `bail`, c’est qu’il s'agit d'un problème grave qui doit être signalé (voir ci-dessous). Il est conseillé de conserver les anciens fichiers pour faciliter la recherche de problèmes. Si vous souhaitez vous reconnecter au réseau immédiatement, vous pouvez effectuer une [réinitialisation d'usine](https://operators.urbit.org/manual/os/ship-troubleshooting#factory-reset).

### Créer une requête GitHub à partir de votre `bail`

Vous pouvez obtenir de l'aide pour résoudre votre problème en créant une requête sur [github.com/urbit/urbit](http://github.com/urbit/urbit). Mais pour créer une bonne requête, vous devez inclure certaines informations.

Lorsque votre urbit plante avec une alerte `bail`, vous obtiendrez probablement une copie de l’état système (*core dump*), qui est un fichier qui contient l'état du programme de votre urbit lorsqu'il s'est planté. Sur Mac, les les copies de l’état système  peuvent être trouvés dans `/cores`. Sous Linux, les fichiers peuvent souvent être trouvés dans `/var/crash`, ou dans le répertoire personnel.

Naviguez vers le dossier contenant vos copies de l’état système Trouvez les copies de l’état système  le plus récent en regardant les dates après avoir exécuté `ls -l`. Puis `lldb -c <corename>`. Une fois le chargement effectué, vous serez conduit à une console (`lldb`) ; tapez `bt` dans la fenêtre de commande. Cela créera une stack qui ressemblera à ceci :

```
(lldb) bt
* thread #1, stop reason = signal SIGSTOP
  * frame #0: 0x000000010583d871 urbit`_box_free + 17
    frame #1: 0x0000000105845ee6 urbit`u3j_boot + 182
    frame #2: 0x000000010584d1f9 urbit`u3m_boot + 89
    frame #3: 0x000000010583d15d urbit`main + 2765
    frame #4: 0x00007fff75cb83d5 libdyld.dylib`start + 1
(lldb)
```

Copiez la trace de cette stack et incluez la dans votre requête GitHub.

### Mon vaisseau s'est planté avec une erreur `bail : meme`

Cela signifie que votre vaisseau a manqué de mémoire.

1. Assurez-vous que vous exécutez le dernier exécutable si vous n'êtes pas déjà dessus.

2. Redémarrez votre vaisseau. S’il ne se plante pas à nouveau, tout est peut-être rentré dans l’ordre.

3. Si votre vaisseau **se** plante de nouveau, essayez d'exécuter ce qui suit après que votre vaisseau se soit éteint : `./urbit-worker meld your-ship` (en remplaçant `your-ship` par le nom/répertoire de votre vaisseau.) Cela tentera de compacter la mémoire de votre vaisseau. Notez que cela peut utiliser une grande quantité de mémoire sur la machine sur laquelle vous l'exécutez, et sera très lent si la machine a peu de mémoire disponible.

4. Si l'opération ci-dessus réussit, mais que vous obtenez toujours `bail : meme` immédiatement, ou après un certain temps d'exécution, veuillez [signaler le problème](https://github.com/urbit/urbit/issues). Si vous le pouvez, exécutez `|mass` et partagez le résultat qui s’affiche.

5. En dernier recours, vous pouvez effectuer une [réinitialisation d'usine](https://operators.urbit.org/manual/os/ship-troubleshooting#factory-reset).

### Mon vaisseau s'est planté avec une erreur `bail : oops`

Redémarrez votre vaisseau. Ces problèmes disparaissent souvent d'eux-mêmes. Si cette erreur se répète après un redémarrage deux fois ou plus, postez les messages dans une requête sur [github.com/urbit/urbit](http://github.com/urbit/urbit).

Cette même erreur peut également apparaître avec un message du type `Assertion '0'`.

### Mon vaisseau s'est planté et affiche une erreur `pier : work error`

Cela signifie que le processus de travail Urbit s'est arrêté pour une raison ou une autre. Redémarrez simplement votre vaisseau ; ce n'est pas une erreur notable ou à signaler.
