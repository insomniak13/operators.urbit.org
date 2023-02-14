+++
title = "Mises à jour"
description = "Comment fonctionnent les mises à jour sur Urbit"
template = "doc.html"
weight = 2
+++

Le système d’exploitation (OS/noyau) d'Urbit s'appelle Arvo. Arvo s’exécute au sein d’une machine virtuelle appelée Vere, à travers l’exécutable `urbit` que vous exécutez dans le terminal. Vous pouvez également installer un certain nombre d'applications dans l’espace utilisateur telles que Groupes, Bitcoin, Studio, Pals, etc. Chacune de ces couches (Vere, Arvo et apps) reçoivent des mises à jour. Dans ce guide, nous verrons comment gérer ces mises à jour. Nous verrons aussi la signification des notifications de mise à jour que vous recevrez dans Landscape et comment ces couches interagissent.

## Brève Introduction

{% table %}
* Name
* Description
* Example version
* Depends on
* Behavior
---
* Vere
* Le runtime alias l'exécutable `urbit` 
* `v1.10`
* Rien
* Vere est normalement rétro compatible avec les anciennes versions d'Arvo. Vere peut être mise à jour soit en exécutant la commande `next`, soit en téléchargeant une nouvelle version et en les remplaçant. Le vaisseau doit être mis hors service avant d'effectuer l'une ou l'autre de ces opérations
---
* Arvo
* Le noyau et les bibliothèques principales
* `[%zuse 418]`
* Vere
* Arvo dépend de Vere. Si Vere est incompatible, l’initialisation échouera. Arvo vit dans le bureau `%base` et reçoit des mises à jour en direct, généralement de la part de votre parrain. Si une mise à jour nécessite une nouvelle version de Vere, la mise à jour sera mise en file d'attente jusqu'à ce q’Arvo utilise la *version kelvin*, ce qui signifie que son numéro de version est un compte à rebours vers zéro (donc 418 est plus récent que 419). Les applications peuvent également bloquer les mises à jour Arvo si elles sont incompatibles. Une mise à jour Arvo bloquée peut être forcée en suspendant les applications bloquantes.
---
* Apps
* Groups, Bitcoin, Studio, Pals, etc
* `v1.0.14`
* Arvo
* Les applications dépendent d'Arvo. Chaque application spécifie avec quelle version d'Arvo elle est compatible. Les applications reçoivent des mises à jour en direct de leur éditeur. Si vous essayez d'installer une application qui nécessite une version plus récente d'Arvo, l'installation échouera. Si une application existante reçoit une mise à jour nécessitant une version plus récente d'Arvo, cette mise à jour sera mise en file d’attente jusqu'à la mise à jour d'Arvo.
{% /table %}

## Notifications des mises à jour

Les notifications des mises à jour seront affichées dans la zone des notifications dans Landscape. Vous pouvez voir l’un de ces trois messages :

#### Les (n) applications suivantes bloquent une mise à jour système

![apply system update
screenshot](https://media.urbit.org/operators/manual/os/updates/apply-system-update.png)

Cela signifie que vous avez reçu une mise à jour du noyau en direct, par exemple une mise à jour de `[%zuse 419]` à `[%zuse 418]`. La mise à jour n'a pas pu être appliquée, le nouveau noyau n’est pas compatible avec ces applications, ni avec les mises à jour potentielles de ces applications. Si vous cliquez sur “Archive (n) apps and Apply System Update”, les applications bloquantes seront suspendues et la mise à jour du noyau sera appliquée. Une fois que les applications concernées reçoivent des mises à jour compatibles, elles seront automatiquement mises à jour et ne seront plus suspendues.

Si les applications bloquées sont importantes pour vous et que vous ne voulez pas les suspendre, vous pouvez retarder l'application de la mise à jour du noyau et attendre de recevoir les mises à jour pour ces applications. Vous pouvez également vérifier que les mises à jour automatiques sont  activées pour les applications données. Voir la section [Mises à jour](https://operators.urbit.org/manual/os/updates#app-updates) des applications ci-dessous pour plus de détails

#### App: "abc" is blocked from upgrading

![app blocking messages
screenshot](https://media.urbit.org/operators/manual/os/updates/app-blocked-messages.png)

Ces messages se produisent lorsqu'une application a reçu une mise à jour, mais qu’il s'agit d'une version de noyau plus récente que celle que vous avez actuellement et qu’elle ne peut donc pas être installée. La mise à jour sera mise en file d'attente jusqu'à la mise à jour du noyau, après quoi elle sera automatiquement appliquée.

Les mises à jour peuvent être bloquées pour les raisons suivantes :

1. Vous n'avez pas encore reçu la nouvelle mise à jour du noyau
2. Vous avez reçu la mise à jour du noyau, mais toutes les applications n'ont pas reçu de mises à jour pour les rendre compatibles. Si c'est le cas, vous verrez également la notification vue précédemment: "The follow (n) apps...”
3. Vous avez reçu la mise à jour du noyau et toutes les applications ont reçu des mises à jour pour les rendre compatibles, mais l'exécution est obsolète et bloque la mise à jour du noyau. Si c'est le cas, vous verrez aussi "L'exécution bloquée..." message comme indiqué dans la capture d'écran suivante.

Ces types de messages ne nécessitent en général pas d'action. Les développeurs d'applications enverront généralement des mises à jour d'applications avant la publication de la mise à jour du noyau, vous verrez donc ces messages dans les jours précédant la publication.

#### Le runtime bloque une Mise à jour Système

![runtime blocked system update
screenshot](https://media.urbit.org/operators/manual/os/updates/runtime-blocked-update.png)

Cela signifie que vous avez essayé d'appliquer une mise à jour du noyau, mais l'exécution (l’exécutable urbit) n'est pas compatible avec la nouvelle version du noyau. Dans ce cas, vous devrez mettre à jour l'environnement d'exécution. Consultez la section [Mises à jour du runtime](#runtime-updates) ci-dessous pour savoir comment procéder.

## Mise à jour du runtime

Depuis la version 1.9, l'environnement d'exécution dispose d'un mécanisme de mise à jour intégré. D'abord, fermez votre vaisseau. Ensuite, lancez soit urbit suivant `urbit next /path/to/your/pier` ou `./votre/pier/.run next`, selon qu'il soit amarré ou non. Lors de l'exécution `next`, il vérifiera la mise à jour, la téléchargera et l'appliquera. Vous pouvez alors redémarrer votre vaisseau. Si la mise à jour échoue, vérifiez que `/your/pier/.bin/pace` contient `live`. Si `once` est présent, modifiez-le pour lui faire dire `live` et essayez d'exécuter `next` à nouveau. Une fois que vous avez initialisé le vaisseau après la mise à jour de l'environnement d'exécution, vous devrez peut-être exécuter`|bump` dans le dojo pour appliquer les mises à jour du noyau en attente.

Si vous exécutez toujours l’exécutable antérieur à la version 1.9, vous devrez :

1. Fermez votre navire avec `Ctrl+d` ou en tapant `|exit` dans le dojo.
2. Téléchargez le nouvel exécutable avec la commande donnée pour votre système d'exploitation dans le [guide d'installation en ligne de commande](https://urbit.org/getting-started/cli).
3. Démarrez votre vaisseau avec le nouvel exécutable `urbit` que vous avez téléchargé.
4. Si vous avez une mise à jour du noyau qui a été bloquée, exécutez `|bump` dans le dojo pour l'appliquer

Afin de vérifier la version actuelle du runtime, il faut consulter la première ligne qui s’affiche quand vous démarrez un vaisseau. Elle devrait dire quelque chose comme `urbit 1.10`. Si vous exécutez l’exécutable `urbit` sans spécifier le ponton (*pier*) ou d'autres paramètres, il indiquera aussi sa version en haut du résultat de la commande.

## Mises à jour du noyau

Les mises à jour du noyau sont livrées en OTA (mise à jour en direct). Pour tout ce qui n'est pas une comète, cela devrait être configuré automatiquement avec votre parrain en tant que source. Si vous exécutez une comète, vous devrez peut-être lancer `|ota (sein:title our now our)` pour les activer.

Arvo (le noyau) utilise *la version kelvin*, ce qui signifie que les numéros de version sont un compte à rebours vers zéro (donc 418 est plus récent que 419). La version de la bibliothèque `Zuse` est utilisée pour représenter la version du noyau dans son ensemble. Vous pouvez vérifier la version actuelle en tapant `zuse` dans le dojo.

Le noyau nécessite que le runtime (l’exécutable `urbit`) soit compatible avec sa version actuelle. L'environnement d'exécution est habituellement rétro compatible avec les anciennes versions du noyau, mais pas avec les nouvelles. Cela signifie que si vous utilisez une ancienne version de l'environnement d'exécution, il bloquera les mises à jour du noyau.

Toutes les applications que vous installez (telles que Groups, Studio, Pals, etc.) spécifient la version du noyau avec laquelle elles sont compatibles. Si des applications n'ont pas reçu de mises à jour pour la nouvelle version du noyau, elles empêcheront la mise à jour de celui-ci.

Cela signifie que le runtime et toutes les applications doivent être à jour pour appliquer une mise à jour du noyau. Si l'une ou l'autre de ces conditions n'est pas remplie, vous recevrez une notification dans Landscape comme décrit dans la section [mise à jour des notifications](https://operators.urbit.org/manual/os/updates#update-notifications) ci-dessus, et vous devrez prendre les mesures décrites.

Si vous avez des applications installées qui ne disposent tout simplement pas de mises à jour compatibles avec le noyau, vous pouvez forcer la mise à jour du noyau en cliquant sur le bouton dans la notification [décrite ci-dessus](https://operators.urbit.org/manual/os/updates#update-notifications), ou en exécutant `|bump, =force &` dans le dojo. Cela suspendra les applications incompatibles jusqu'à ce qu'elles reçoivent des mises à jour compatibles.

Si la mise à jour du noyau a été bloquée par un runtime obsolète et que vous l'avez mis à jour depuis, vous pouvez lui dire d’essayer d’appliquer la mise à jour à nouveau en exécutant `|bump` dans le dojo.

Pour vérifier si vous avez des mises à jour du noyau non appliquées, vous pouvez lancer `+vat %base` dans le dojo (ou `+vats` si cela ne fonctionne pas, cherchez l'entrée `%base`). Vous verrez une sortie comme ceci :

```
%base
  /sys/kelvin:      [%zuse 418]
  base hash:        0vu.fptbs.6f05p.c9ghb.qfh7e.sbhum.vfnnr.osfs7.vv1i1.qveva.dfvli
  %cz hash:         0vu.fptbs.6f05p.c9ghb.qfh7e.sbhum.vfnnr.osfs7.vv1i1.qveva.dfvli
  app status:       running
  force on:         ~
  force off:        ~
  publishing ship:  ~
  updates:          tracking
  source ship:      ~marzod
  source desk:      %kids
  source aeon:      8
  pending updates:  ~
::
```

L'entrée `updates` indique si les mises à jour automatiques sont activées. S'il ne dit pas `tracking`, vous pouvez lancer `|ota (sein:title our now our)` pour les activer. La section `pending update` bloque toutes les mises à jour; elle ressemblera à `~[[%zuse 417]]. La ligne /sys/kelvin` indiquant la version actuellement utilisée.

## Mises à jour d’Application

Les applications (telles que Groups, Studio, Pals, etc.) reçoivent des mises à jour OTA (en direct) de leurs éditeurs respectifs. Les mises à jour automatiques pour chaque application doivent être activées par défaut lorsque vous les installez. Les mises à jour normales (celles sans rapport avec une mise à jour du noyau) ne devraient nécessiter aucune action de l'utilisateur. Si vous voyez la notification de mise à jour dans Landscape, c’est que cette manipulation a déjà été faite.

En cas de mise à jour du noyau, les développeurs d'applications sont encouragés à pousser les mises à jour de leurs applications avant le déploiement de la mise à jour du noyau elle-même. Cela signifie que vous verrez probablement des notifications concernant les mises à jour d'applications bloquées par le bureau  `base` dans les jours précédant la mise à jour du noyau. Vous n'avez pas à vous en préoccuper; les mises à jour seront mises en file d'attente et automatiquement appliquées lorsque la mise à jour du noyau arrivera.

Parfois, les développeurs d'applications peuvent ne pas mettre à disposition une mise à jour compatible avec le noyau à temps, ou bien ils ont simplement cessé de mettre à jour l'application. Dans ce cas, ces applications bloqueront les mises à jour du noyau, et vous verrez la notification “Les (n) applications suivantes ont bloqué une mise à jour système” [décrite ci-dessus](https://operators.urbit.org/manual/os/updates#update-notifications). Dans ce cas, l'application devra être suspendue pour que la mise à jour du noyau se termine. Vous pouvez le faire soit en cliquant sur le bouton dans cette notification, soit en exécutant `|bump, =force &` dans le dojo. Vous ne devez pas suspendre manuellement les applications via le menu quadrillé ou la commande `|suspend`, car elles ne seront pas automatiquement réactivées si elles reçoivent ultérieurement une mise à jour compatible avec le noyau.

Les mises à jour automatiques des applications peuvent être interrompues avec la commande `|pause %the-desk` dans le dojo, et reprises avec la commande `|resume %the-desk`. Le nom du bureau peut différer d’un nom d’application à l’autre, vous pouvez trouver le nom du bureau en cliquant sur "App Info" dans le menu quadrillé de l'application et en recherchant l'entrée "Installer dans".

Pour vérifier l'état de mise à jour d'une application, vous pouvez lancer la commande `+vat %the-desk` dans le dojo (ou `+vats` si cela ne fonctionne pas et chercher l'entrée correspondant au nom du bureau). Il vous donnera une résultat comme ceci :

```
> +vat %docs
%docs
  /sys/kelvin:      [%zuse 418]
  base hash:        0vu.moe96.kmq1d.a0nen.76vf6.t5qbc.aokqv.89fg5.avctv.pvq08.pdio0
  %cz hash:         0vu.moe96.kmq1d.a0nen.76vf6.t5qbc.aokqv.89fg5.avctv.pvq08.pdio0
  app status:       running
  force on:         ~
  force off:        ~
  publishing ship:  ~
  updates:          tracking
  source ship:      ~pocwet
  source desk:      %docs
  source aeon:      30
  pending updates:  ~
::
```

S'il y a des `pending updates`, cela signifie généralement que les développeurs attendent une mise à jour du noyau avant de pouvoir les appliquer. L'entrée `updates` vous indique si les mises à jour automatiques sont activées ou non. Si `tracking` n'est pas indiqué, vous pouvez exécuter `|resume %the-desk` pour les réactiver, ou exécuter `|install ~the-publishing-ship %the-desk`.

## Further reading

- [Runtime Reference](https://operators.urbit.org/manual/running/vere) - ceci documente toutes les options et utilités l’exécutable `urbit`, comme `next`.
- [Dojo Tools](https://operators.urbit.org/manual/os/dojo-tools) - ceci inclut la documentation de nombreuses mises à jour et des commandes dojo liées au bureau.
