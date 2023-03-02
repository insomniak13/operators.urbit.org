+++
title = "Système de fichiers"
template = "doc.html"
weight = 5
+++

Urbit a son propre système de fichiers contrôlé par révision, Clay. Clay est un espace de noms typé, global, transparent par rapport aux références. Une façon simple d'y penser est de le considérer comme l’équivalent de `git` .

La façon la plus commune d'utiliser Clay est de monter un nœud Clay dans un répertoire Unix. Le répertoire monté est toujours à la racine de votre répertoire ponton (*pier)*.

Pour plus d'informations sur Clay, consultez [l'aperçu](https://developers.urbit.org/reference/arvo/clay/clay), et obtenez des informations supplémentaires sur [l'utilisation de Clay](https://developers.urbit.org/reference/arvo/clay/using).

#### Démarrage rapide

Ce guide de démarrage rapide vous guidera à travers quelques commandes courantes. Suivez-le en utilisant votre Dojo. Lorsque vous obtenez un message `>=` après avoir entré une commande, cela signifie que la commande a réussi.

Un [`desk`](https://developers.urbit.org/reference/glossary/desk) est en quelque sorte une branche indépendante du système de fichiers de votre urbit, dont la révision est contrôlée. Les fichiers système de votre urbit se trouvent dans le bureau `%base`.

Il est important de noter qu'à chaque fois que vous souhaitez synchroniser les changements de votre répertoire Unix vers votre vaisseau, vous devez utiliser la commande `|commit %desk`, où `%desk` est le `desk` vers lequel vous souhaitez vous synchroniser.

Lorsque vous codez, il est préférable d'utiliser un `desk` séparé. Crée un `%sandbox desk` basé sur le `%base` `desk` (`our` génère le nom de votre vaisseau): 

```
~zod:dojo> |merge %sandbox our %base
```

La plupart du temps, vous voudrez utiliser Clay depuis Unix. Montez tout le contenu de votre bureau `%sandbox` sur Unix :

```
~zod:dojo> |mount %sandbox
```

Pour explorer le système de fichiers depuis Urbit, `+ls` et `+cat` sont utiles. `+ls` affiche les fichiers dans le répertoire courant, et `+cat` affiche le contenu d'un fichier.

Nous utilisons `%` pour signifier "répertoire actuel". Le résultat de la commande ci-dessous est exactement comme l'utilisation de `ls` dans un terminal Unix.

```
~zod:dojo> +ls %
```

Vous remarquerez que `+cat %` fait la même chose. C'est parce que tout dans Clay, y compris les répertoires, est un fichier.

Synchronisation du bureau `%experiment` de votre ami `~bus` vers votre bureau `%sandbox` :

```
~zod:dojo> |sync %sandbox ~bus %experiment
```

Si et quand votre synchronisation est réussie, vous recevrez un message :

```
kiln : sync succeeded from %experiment on ~bus to %sandbox
```

Le vaisseau à partir duquel vous vous synchronisez recevra son propre message indiquant que vous êtes tous deux connectés en tant que voisins.

```
; ~zod est votre voisin.
```

---

### Manuel de Clay

Ce qui suit constitue une explication des commandes pratiques que la plupart des pilotes Urbit voudront connaître à un moment donné. La lecture de cette section vous permettra de naviguer dans le système de fichiers, de vous synchroniser avec Unix, de fusionner votre bureau, et d’effectuer d'autres tâches de base familières aux utilisateurs novices du terminal Unix.

#### Chemins d'accès

Un chemin d'accès dans Clay est une liste de textes sécurisés pour les URL, limités aux caractères `[a z]`, `[0 9]`, `.`, `-`, `_` et `~`. Ce chemin est une liste de chaînes de caractères précédées chacune de `/.` En d'autres termes, les chemins sont exprimés sous la forme `/foo/bar/baz`. Les extensions de fichiers sont séparées des noms de fichiers par `/`, et non par `.`. Les extensions sont syntaxiquement identiques aux sous-répertoires, sauf qu'elles doivent terminer le chemin.

Les chemins commencent par trois chaînes indiquant le vaisseau, le bureau et la révision, et peuvent ressembler à `/~dozbud-namsep/base/11`.

Le premier composant est `ship`, qui est, comme vous l’aurez deviner, le nom d'un vaisseau Urbit. Le deuxième composant est le `desk`, qui est un espace de travail destiné à contenir d'autres répertoires ; le `desk` par défaut est `%base`. Le troisième composant est la révision, qui représente les informations de version de différentes manières : date et heure ; une séquence de version, qui est une valeur incrémentée de un à chaque fois qu'un fichier sur le `desk` donné est modifié ; ou une étiquette arbitraire en texte clair.

Vous pouvez trouver quel est votre vaisseau, votre bureau et votre révision à tout moment en tapant `%` dans le Dojo et en regardant les trois premiers résultats. Cela s'affichera sous la forme d'une cellule plutôt que d'un chemin, comme par exemple:

```
[~.~zod ~.base ~.~2021.3.19..16.11.20..0c60]
```

Ici, nous voyons que la révision consiste en la date, l'heure et un hachage court.

Nous utilisons ce format car, contrairement à l'internet actuel, le réseau Urbit utilise un espace de noms global. Cela signifie qu'un fichier nommé `example.hoon` dans le répertoire `/gen` sur le bureau `%base` de votre vaisseau `~lodleb-ritrul` aurait une adresse universelle pour toute autre personne sur le réseau : `/~lodleb-ritrul/base/186/gen/exemple/hoon`. Bien sûr, cela ne signifie pas que tout le monde sur le réseau a les privilèges pour accéder à ce chemin. Mais étant donné la nature immuable et à révision contrôlée d'Urbit, cela signifie que si le fichier demandé est disponible, il sera toujours le même. Cela signifie que si un Urbit dessert une page web, cette version-ci sera toujours récupérable (en supposant que vous en ayez l’accès).

#### Chemins relatifs

La commande `%`, que nous avons évoquée dans la section précédente, représente le chemin relatif, c'est-à-dire le chemin où vous travaillez actuellement.

Les `%` peuvent être empilés pour indiquer un niveau plus haut dans la hiérarchie pour chaque `%` supplémentaire. Essayez la commande suivante :

```
~zod:dojo> %%%
```

Vous remarquerez qu'elle ne contient que votre nom de vaisseau et que la liste vide. Les deux `%` supplémentaires ont abandonné la révision et les informations du `desk` en remontant deux fois dans la hiérarchie.

Il n'y a pas de chemins relatifs locaux. /`foo/bar` doit être écrit comme `%/foo/bar`.

#### Substitution

Vous n'avez pas besoin d'écrire le chemin explicite chaque fois que vous voulez faire référence à un endroit situé en dehors de votre répertoire de travail. Vous pouvez substituer `=` aux segments d'un chemin.

Rappelez-vous qu'une adresse complète dans l'espace de nom Urbit est de la forme `/ship/desk/case/path`. Pour passer au bureau `%sandbox`, vous devez entrer

```
~sampel-palnet:dojo> =dir /=sandbox=
```

`=dir` est utilisé pour changer le répertoire de travail, nous nous pencherons plus dessus [ci-dessous](https://operators.urbit.org/manual/os/filesystem#changing-directories).

La commande ci-dessus utilise la substitution pour utiliser votre `ship` et votre révision actuels ; seul l'argument `desk`, qui est situé entre les deux autres, reçoit quelque chose de nouveau. Sans substitution, vous devriez écrire :

```
~sampel-palnet:dojo> =dir /~sampel-palnet/sandbox/85
```

Les substitutions fonctionnent de la même manière dans le cas `ship/desk/case` et les chemins. Par exemple, si vous êtes dans le répertoire `/gen`, vous pouvez référencer un fichier dans le répertoire `/app` comme ci-dessous. (`+cat` affiche le contenu d'un fichier).

```
~sampel-palnet:dojo> =dir %/gen
~sampel-palnet:dojo/=/=/~2021.3.19..16.11.20..0c60/gen> +cat /===/app/curl/hoon
```

Notez ce qui a été substitué, et notez que nous n'avons pas besoin de séparer `=` par `/`.

Si nous changeons notre répertoire de travail en quelque chose appelé `/gen/gmail`, nous pouvons accéder à un fichier appelé

```
~sampel-palnet:dojo/=/=/~2021.3.19..16.11.20..0c60/gen> =dir %/gmail
~sampel-palnet:dojo/=/=/~2021.3.19..16.11.20..0c60/gen/gmail> +cat /===/app/=/split/hoon
``` 

Parce que les deux chemins partagent un répertoire nommé `/gmail` à la même position dans la hiérarchie des adresses `-` qui, si vous vous souvenez, est juste une liste `-` la commande ci-dessus fonctionne !

Nous pouvons faire la même chose entre les bureaux. Si `%sandbox` a été fusionné avec `%base`, la commande suivante produira les mêmes résultats que la commande ci-dessus.

```
~sampel-palnet:dojo/=/=/~2021.3.19..16.11.20..0c60/gen/gmail> +cat /=sandbox=/app/=/split/hoon
```

Le plus souvent, ceci est utilisé pour éviter d'avoir à connaître le numéro de révision actuel dans le `dojo` : `/~lodleb-ritrul/base/~2021.3.19..16.11.20..0c60/gen/exemple/hoon`

#### Changer de répertoire

Changez le répertoire de travail avec `=dir`. C'est notre équivalent du `cd` d'Unix.

Par exemple, la syntaxe pour naviguer vers /`base/gen/ask` est :

```
`~sampel-palnet:dojo> =dir /=base=/gen/ask`
```

Cette commande transformera votre invitation en quelque chose comme ceci :

```
`~sampel-palnet:dojo/=/=/~2021.3.19..16.11.20..0c60/gen/ask>`
```

Utiliser `=dir` sans rien d'autre utilise le chemin nul, qui vous renvoie à votre bureau de base.

```
`~sampel-palnet:dojo/=/=/~2021.3.19..16.11.20..0c60/gen/ask> =dir`
```

Votre invitation dojo redeviendra `~sampel-palnet:dojo>`.

Pour remonter les niveaux dans la hiérarchie des chemins, rappelez-vous l'expression de chemin relatif `%`. Les empiler représente un autre niveau plus haut dans la hiérarchie que le répertoire de travail actuel pour chaque `%` au-delà de l'initial. La commande ci-dessous vous fait remonter d'un niveau :

```
~sampel-palnet:dojo> =dir %/gen
~sampel-palnet:dojo/=/=/~2021.3.19..16.11.20..0c60/gen> =dir %%
```

### Contrôle de révision

#### Mount

Syntaxe : `|mount %/clay/path %mount-point`

Monte le `/clay/path` au point de montage Unix `mount-point` avec votre ponton comme répertoire racine.

**Exemples :**

```
|mount %/gen %generators
```

Monte `%/gen` dans `/generators` à l'intérieur de votre répertoire ponton.

### Unmount

```
`|unmount %mount-point`
```

Démonte le point de montage sous Unix.

**Exemples :**

```
|unmount %foo
```

Démonte le chemin Unix `/foo`.

#### Merge

```
|merge %target-desk ~source-ship %source-desk
```

Permet de fusionner un bureau source dans un bureau cible.

Cela peut éventuellement inclure une [stratégie de fusion](https://developers.urbit.org/reference/arvo/clay/using#merging) :

```
|merge %target-desk ~source-ship %source-desk, =gem %strategy
```

Vous pouvez également fusionner un chemin Clay sur votre propre vaisseau vers un `desk`, ainsi qu'une stratégie optionnelle.

```
|merge %target-get %/clay/path, =gem %strategy
```

**Exemples :**

```
|merge %examples ~wacbex-ribmex %examples
```

Fusionner le bureau `%examples` de `~waxbex-ribmex`

```
|fusionner %work /=base=, =gem %fine
```

Fusionne `/=base=` dans `%work` en utilisant la stratégie de fusion `%fine`.

#### Sync

```
|sync %target-desk ~source-ship %target-desk
```

S’abonner aux mises à jours en continues d’un `desk` à distance ou d’un `desk` local

**Exemples :**

```
`|sync %foo ~dozbud %kids`
```

#### Unsync

```
|unsync %target-desk ~source-ship %source-desk
```

Se désabonner aux mises à jour du `desk` distant sur le `desk` local. Les arguments doivent correspondre à la commande `|sync` originale.

Exemple :

```
|unsync %foo ~dozbud %kids
```

### Manipulation

#### `+cat`

Syntaxe : `+cat path [path ...]`

Similaire à Unix `cat`. `+cat` prend un ou plusieurs `path`, et affiche leur contenu. Si le `path` est un fichier, le contenu du fichier est affiché. Si le `path` se termine par un répertoire, la liste des noms de ce chemin est produite.

####`+ls`

Syntaxe : `+ls path`

Similaire à Unix `ls`. `+ls` prend un seul `path`.

Il produit une liste de noms dans le `path`.

```
~sampel-palnet:dojo> +cat %/notre/base/gen/curl/hoon
```

#### `|rm`

Syntaxe : `|rm path`

Supprime les données de `path`. Le chemin doit être un `path` vers le nœud actuel, pas un 'répertoire'.

#### `|cp`

Syntaxe : `|cp to from`

Copie le fichier de `from` dans le chemin `to`.

#### `|mv`

Syntaxe : `|mv to from`

Déplace le fichier situé à partir de `from` le chemin `to` .

Dans Clay, `|mv` est juste un raccourci pour `|cp` puis `|rm`. Le `|rm` n'a lieu que si le `|cp` réussit.
