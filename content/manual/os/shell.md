+++
title = "Shell"
template = "doc.html"
weight = 4
+++

Le Dojo est notre shell ; il traite les commandes du système et renvoie des informations. C'est un bon endroit pour expérimenter rapidement avec Urbit. En surface, le Dojo est juste un Hoon REPL. À l'intérieur, le Dojo est un système pour opérer sûr et transformer les données dans Urbit.

#### Démarrage rapide

Vous pouvez utiliser le Dojo pour exécuter un code Hoon arbitraire, ainsi que des commandes système non Hoon.

#### Maths

Évaluer une expression Hoon (les espaces sont importants) :

```
~votre-urbit:dojo> (add 2 2)
~votre-urbit:dojo> %+ add 2 2
```

Un grand format Hoon peut nécessiter plusieurs lignes :

```
~votre-urbit:dojo> %+ add
~votre-urbit:dojo< 2
~votre-urbit:dojo< 2
```

Hoon utilise un élément appelé [le sujet](https://developers.urbit.org/reference/glossary/subject) (*subject*). Le Dojo a son propre sujet et c'est là que l'équivalent des variables de Hoon, appelées faces, sont stockées.

Utilisez `=var` pour enregistrer les faces dans le sujet du Dojo.

```
~your-urbit:dojo> =foo (add 2 2)
```

À noter cependant, `=var` est une syntaxe Dojo, pas une syntaxe Hoon. Vous ne pouvez pas lier une face dans un fichier `.hoon`de cette manière.

#### Commandes système

Utilisez `=dir` pour définir le répertoire de travail actuel :

```
~your-urbit:dojo> =dir %/gen
```

(`%` représente votre répertoire actuel. Pour une explication complète sur les chemins urbit, voir la section sur le [système de fichiers](https://operators.urbit.org/manual/os/shell#filesystem)).

Les générateurs (fichiers dans `/gen`) sont exécutés avec `+` :

```
~votre-urbit:dojo> +hello 'world'
```

Sauvegarder la sortie dans un fichier dans `%clay` avec `*` :

```
~your-urbit:dojo> *some/file/path/hoon 'hello world’
```

Exécutez les commandes système depuis `:hood`, comme `reload`, en utilisant `|` :

```
~your-urbit:dojo> |reload %eyre
```

### Générateurs

Les générateurs sont des scripts Hoon courts, enregistrés sous forme de fichiers `.hoon` dans le répertoire `/gen`. Beaucoup de commandes de Dojo existent sous la forme de générateurs. La syntaxe pour exécuter un générateur est `+genname` pour un générateur enregistré sous `genname.hoon` dans le bureau `%base`. Pour les générateurs sur d'autres bureaux, vous pouvez utiliser la syntaxe `+desk!genname`.

#### `+cat`

Accepte un chemin et affiche le fichier. Similaire à Unix `cat`.

```
~your-urbit:dojo> +cat %/gen/curl/hoon
```

#### `+Code`

Génère un code qui est utilisé pour se connecter à distance à votre vaisseau. Pas d'arguments.

```
~your-urbit:dojo> +code
```

Vous pouvez changer votre code pour un nouveau code généré aléatoirement en entrant `|code %reset`. Veuillez noter que cela empêchera [Bridge](https://developers.urbit.org/reference/glossary/bridge) de pouvoir dériver votre code à l'avenir.

#### `ls`

Similaire à Unix `ls`. Accepte un chemin.

```
~your-urbit:dojo> +ls %/gen
~your-urbit:dojo> +ls /~talsur-todres/base/2/gen/program
```

#### `+solid`

Compile l'état actuel du shell et crée un nom. Habituellement téléchargé dans un fichier sous Unix. Ce générateur prend en argument une série de bureaux à inclure. Le premier bureau doit être le bureau de base qui contient le shell Arvo, la bibliothèque standard et les fichiers associés, typiquement `%base`.

```
~your-urbit:dojo> .urbit/pill +solid %base %garden %landscape %webterm %bitcoin
```

#### `+tree`

Génère une liste récursive de répertoires. Il prend un chemin.

```
~your-urbit:dojo> +tree %/sys
```

### Hood

Hood est le processus système. Voir `gen/hood` et `app/hood`.

`|hi` - Envoie un message direct. Un peu comme Unix `write`. Accepte un identifiant Urbit (`@p`) et une chaîne (`tape`, qui est du texte enveloppé de guillemets doubles).

```
~your-urbit:dojo> |hi ~binzod "are you here ?"
```

`|link` / `|unlink` - Lier / délier une application CLI - peut ou non s’exécuter à distante. Elle accepte un nom de vaisseau facultatif et un nom d'application obligatoire.

```
~your-urbit:dojo> |lien ~talsur-todres %octo
~your-urbit:dojo> |lien %chat-cli
```

`|mass` - Affiche l'utilisation actuelle de la mémoire de tous les modules du shell. Aucun argument nécessaire.

```
~your-urbit:dojo> |mass
```

`|breload` - Recharge un module du shell (*vane*) à partir de la source. Accepte un nombre quelconque de noms de vane.

```
~your-urbit:dojo> |breload %clay %eyre
```

---

### Manuel du dojo

#### Sources et Siphon

Une commande Dojo est soit une **source**, soit un **Siphon**. Une source est juste quelque chose qui peut être imprimé sur votre console ou le résultat d'un calcul. Un Siphon est un **effet** : un changement dans le système de fichiers, un message réseau, un changement dans votre environnement ou un message tapé à destination d’une application.

Les sources peuvent être enchaînées, mais on ne peut produire qu'un seul effet par commande.

#### Sinks

#### `=` - Définir une variable

Définit n'importe quelle variable d'environnement :

```
~your-urbit:dojo> =foo 42
~your-urbit:dojo> (ajouter 2 foo)

44
```

Notez bien que `=var` est la syntaxe Dojo, et non la syntaxe Hoon. Vous ne pouvez pas lier une variable dans un fichier `.hoon` de cette manière.

#### Variables spéciales

Il y a quelques variables spéciales que le Dojo maintient.

#### `:`- Envoyer à l'application

`:app` va à une application locale, 

`:~ship/app` va à l'application sur `~ship`.

Envoyer un message `helm-hi` dans `hood` :

```
~your-urbit:dojo> :hood &helm-hi 'hi' (hi)
```

Les applications attendent généralement des données marquées, donc `&` est souvent utilisé ici.

#### `*` - Enregistrer dans `%clay`

Sauvegarde un nouveau fichier `.hoon` dans `gen` :

```
~your-urbit:dojo> *%/gen/foo/hoon '# hello'
```

Le dernier composant du chemin est censé être la marque (ou le type de mime).

### `.` - Exporter vers Unix

Exportez un nom vers unix avec `.` :

```
~your-urbit:dojo> .foo/bar/baz (add 2 2)
```

Cette commande crée un fichier dans `pier/.urb/put/foo/bar.baz`.

Cette commande est souvent utilisée avec `+solid`:

```
~your-urbit:dojo> .urbit/pill +solid
```

Générant un nouveau `urbit.pill` dans `pier/.urb/put/urbit.pill`

### Sources

`_` - Exécuter une fonction
Utilisez `_` pour exécuter une porte (ou une fonction) :

Écrivez une fonction arbitraire et passez-lui des données :

```
~your-urbit:dojo> _|=([a=@] (mul a 3)) 3
9
```

Utilisez une fonction pour obtenir le code d'état d'une requête http :

```
~your-urbit:dojo> _|=([p=@ud q=* r=*] p) +http://google.com
301
```

`**+` et `-` - Demandes HTTP**
`+http[s]://exemple.com - envoie une requête GET`

`+http[s]://exemple.com &json [%s 'hi']` - envoie une requête POST avec le JSON `"hi"` dans le texte.

`http[s]://example.com &json [%s 'hi']` - envoie une requête PUT avec le JSON `"hi"` dans le texte.

Notez que le premier de ces éléments est une source tandis que les deux derniers sont des siphons.

#### `+` - Générateurs

Les générateurs sont de simples scripts Hoon chargés depuis le système de fichiers. Ils vivent dans `gen/`.

Un exemple de générateur qui est intégré dans votre urbit est `+code`. Il produit le code nécessaire pour se connecter à votre vaisseau à distance.

```
~your-urbit:dojo> +code
fintyr-haldet-fassev-solhex
```

Les générateurs présents sur les bureaux autres que %base peuvent être lancés avec la syntaxe `+desk!generator`.

### Variables

Vous pouvez utiliser `=` pour définir une variable d'environnement dans Dojo, mais il y a quelques noms réservés qui ont des utilisations spéciales.

#### `dir`

Répertoire de travail actuel de `%clay` et révision. Lecture / écriture.

**Exemples :**

```
~your-urbit:dojo> =dir %/gen
~your-urbit:dojo> +ls %
404/hoon docs/ dojo/hoon lib/ listen/hoon md static/udon talk/ testing/udon tree/main/ unmark/ womb/
```

#### `now`

Actuellement (128 bits `@da`). En lecture seule.

**Exemple :**

```
~your-urbit:dojo> now
~2016.3.21..21.10.57..429a
```

#### `our`

Le vaisseau urbit actuel. En lecture seule.

**Exemple :**

```
~your-urbit:dojo> notre
~your-urbit
```

#### `eny`

512 bits d'entropie. En lecture seule.

Exemple :

```
~your-urbit:dojo> eny
0v27k.n4atp.fovm6.f7ggm.jdkn5.elct5.11tna.4qtid.g4so7.a1h6g.grp7u.qml4i.0ed1v.sl0r0.97d4b.6aepr.6v6qm.ls5ve.60kgb.j6521.2fqcb
```

#### Dépannage

Si vous rencontrez `%dy-edit-busy` lors de la saisie de commandes, c'est que votre Dojo est bloqué sur un timer ou une requête HTTP. Tapez backspace et votre Dojo terminera la commande bloquée.
