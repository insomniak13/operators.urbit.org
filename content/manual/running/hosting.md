+++
title = "Hébergement sur un cloud"
description = "Comment héberger votre vaisseau dans le cloud pour pouvoir y accéder depuis n'importe quel appareil."
template = "doc.html"
weight = 2
[extra]
hidetitle = "true"
+++

Le but de ce guide est d'avoir un ensemble de bonnes pratiques claires et faciles à suivre pour déployer un nœud Urbit sur un serveur que vous contrôlez sur un cloud. Le déploiement dans le cloud vous permet d'accéder à votre Urbit depuis n'importe quel appareil.

La plupart des utilisateurs d'Urbit commencent par exécuter leur vaisseau localement sur une machine afin de jouer avec, mais cela signifie que lorsque votre machine est hors ligne, votre nœud Urbit est hors ligne aussi (et ne peut pas obtenir de mises à jour). Vous ne pouvez également accéder à votre Urbit qu'à partir de cette seule machine.

Ce guide utilise Digital Ocean comme fournisseur de cloud, mais d'autres peuvent être utilisés. Si vous utilisez un autre fournisseur, le script d'installation fourni et les autres instructions de configuration du serveur peuvent devoir être modifiés ou effectués manuellement.

## 1. Créer un Droplet

Créez un compte sur [Digital Ocean](https://digitalocean.com/). Une fois que vous avez créé un compte, choisissez "*Deploy a virtual machine*".

Vous devriez voir la page ci-dessous où vous pouvez créer votre *Droplet*, c'est-à-dire votre machine virtuelle :

![do screenshot](https://media.urbit.org/operators/manual/running/hosting/do-screenshot.png)

Remplissez les options comme suit :

#### Image

Ubuntu 22.04 x64

#### Plan

- CPU partagé : Basique
- Options de CPU : Régulier avec SSD
- 2Go / 1 CPU ($12/m)

Vous pouvez choisir une option plus puissante si vous le souhaitez mais l'option à 12$ devrait être suffisante. Notez que Urbit a besoin de 2Go de mémoire; il est possible de choisir une option moins chère et de le faire fonctionner avec moins de mémoire en utilisant le *swap* mais cela aura un impact sur les performances.

#### Ajouter un bloc de stockage

Le plan à 12$ comprend 50Go, ce qui devrait être suffisant pour un certain temps. Vous pouvez donc ignorer cette étape.

#### Région du datacenter

Choisissez la région la plus proche de chez vous.

#### Réseau VPC

Laissez cette option par défaut.

#### Authentification

Dans le champ "Authentication", sélectionnez "SSH Keys" et cliquez sur "New SSH key". Exécutez la commande suivante dans le terminal de votre machine locale, en remplaçant `riclen-tinlyr` par le nom de votre vaisseau (sans le signe `~`) :

```bash {% copy=true %}
SHIP="riclen-tinlyr" bash -c 'ssh-keygen -q -N "" -C $SHIP -f ~/.ssh/$SHIP && cat ~/.ssh/$SHIP.pub'
```

Il devrait en résulter une longue chaîne de lettres et de chiffres commençant par `ssh-rsa` et se terminant par le nom de votre vaisseau. Copiez le tout et collez-le dans le champ "SSH key content" sur Digital Ocean. Dans le champ "Name", entrez le nom de votre vaisseau.

#### Options supplémentaires

Cliquez sur "User data" et collez le script ci-dessous dans le champ prévu à cet effet. Cela permettra de configurer automatiquement le serveur et d'installer les logiciels nécessaires.

```bash {% copy=true %}
#!/bin/bash

# configure swap
fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo "/swapfile swap swap defaults 0 0" >> /etc/fstab

# setup firewall
ufw allow OpenSSH
ufw allow www
ufw allow https
ufw allow 34543/udp
ufw enable

# create and configure user
useradd -s /bin/bash -d /home/urbit -m -G sudo urbit
passwd -d urbit
echo "urbit ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

# configure ssh keys for user
mkdir -p /home/urbit/.ssh
chmod 700 /home/urbit/.ssh
cp /root/.ssh/authorized_keys /home/urbit/.ssh/authorized_keys
chmod 600 /home/urbit/.ssh/authorized_keys
chown -R urbit:urbit /home/urbit/.ssh

# configure sshd
mkdir -p /etc/ssh/sshd_config.d
cat > /etc/ssh/sshd_config.d/override.conf <<EOF
PermitRootLogin no
PubkeyAuthentication yes
PasswordAuthentication no
EOF

# fetch and extract urbit binary
curl -L https://urbit.org/install/linux-x86_64/latest | tar xzk --transform='s/.*/urbit/g' -C /home/urbit/
chown urbit:urbit /home/urbit/urbit

# install tmux
apt -y update
apt install -y tmux

# reboot
systemctl reboot
```

#### Combien de Droplet ?

1

#### Choisissez un nom d'hôte

Il s'agit du nom que le serveur utilisera localement. Vous pouvez mettre ce que vous voulez. Le nom de votre planète est un bon choix.

#### Ajouter des tags

Laissez vide.

#### Sélectionner un projet

Laissez le projet par défaut.

#### Créer le droplet

Cliquez sur ce bouton pour créer le droplet.

## 2. Préparer le téléchargement

{% callout %}

**À noter:**

Cette étape est nécessaire si vous avez déjà un navire fonctionnant localement et que vous souhaitez le déplacer vers le cloud. Si vous ne l'avez pas, vous pouvez sauter cette étape.

{% callout %}

Dans le Dojo, utilisez "`CTRL + D`" ou `|exit` pour arrêter votre vaisseau.

Archivez votre ponton (*pier*) en exécutant `tar cvzf riclen-tinlyr.tar.gz ~/path/to/your/pier` (remplacez votre propre nom de vaisseau et l'emplacement du ponton).

## 3. Se connecter au serveur

Pour faciliter la connexion, vous pouvez ajouter un alias à `~/.ssh/config` sur votre machine locale. Ouvrez `~/.ssh/config` dans un éditeur (vous devrez peut-être le créer si le fichier n'existe pas), et ajoutez ce qui suit au bas du fichier (en remplaçant le nom du vaisseau par le vôtre et l'adresse IP par celle de votre droplet) :

```
Host riclen-tinlyr
  HostName 161.35.148.247
  User urbit
  IdentityFile ~/.ssh/riclen-tinlyr
  IdentitiesOnly yes
```

{% tabs %}

{% tab label="Si vous avez un ponton existant" %}


Copiez le ponton archivé sur le serveur en utilisant la commande suivante (en subsituant le nom du vaisseau et l’hébergeur):

```bash {% copy=true %}
scp riclen-tinlyr.tar.gz riclen-tinlyr:
```

L’opération peut prendre du temps si votre ponton est large ou si votre internet est lent.

{% /tab %}

{% tab label="Si vous avez un fichier clé" %}

Si vous avez obtenu une planète et que vous souhaitez l’initialiser pour la première fois, vous devez télécharger son fichier clé sur le serveur. Ces instructions supposent que vous avez reçu une invitation. Si vous avez obtenu une planète par une autre méthode, vous pouvez également vous connecter à [Bridge](https://bridge.urbit.org/) et télécharger le fichier clé à partir de là.

Si vous avez reçu une invitation pour une planète par courrier électronique ou par un lien de réclamation comme `https://bridge.urbit.org/#labfur-batteg-dapnex-binsup-riclen-tinlyr](https://bridge.urbit.org/#labfur-batteg-dapnex-binsup-riclen-tinlyr`, ouvrez-le dans un navigateur et vous devriez voir une page comme la suivante :

![claim planet screenshot](https://media.urbit.org/operators/manual/running/hosting/claim-planet.png)

Si vous cliquez sur "Claim", çeci vous amènera ici :

![download passport
screenshot](https://media.urbit.org/operators/manual/running/hosting/download-passport.png)

Cliquez sur "Download Backup (Passport)" et vous devrez télécharger un fichier nommé `riclen-tinlyr-passport.zip`.

Décompressez le fichier avec :

```bash {% copy=true %}
unzip ~/path/to/download/folder/riclen-tinlyr-passport.zip
```

Cela va créer un dossier appelé `riclen-tinlyr-passport` qui contiendra trois fichiers :

- `riclen-tinlyr-1.key`
- `riclen-tinlyr-Management Proxy.png`
- `riclen-tinlyr-Master Ticket.png`

Vous pouvez imprimer physiquement les deux fichiers `.png` et les stocker dans un endroit sûr et sécurisé. Il est important que vous vous assuriez que le *Master Ticket* (qui ressemblera à quelque chose comme `~tarnes-pilryd-dassed-sogsul`) soit stocké de manière sûre et sécurisée. Si quelqu'un a accès au *Master Ticket*, il aura la propriété et le contrôle de votre Urbit ID, et si vous le perdez, vous perdrez irréversiblement la propriété et le contrôle de votre Urbit ID.

L'écran suivant de la page de récupération vous demandera de saisir à nouveau le *Master Ticket* pour vous assurer que vous l'avez enregistré correctement, puis la procédure de demande sera terminée. Une fois que vous avez sauvegardé physiquement et en toute sécurité le *Master Ticket* et les passeports `.png`, il est conseillé de supprimer le fichier `riclen-tinlyr-passport.zip` et les deux fichiers `.png`, de sorte que si quelqu'un accède à votre ordinateur, votre Urbit ID sera hors de leur portée.

Il ne restera que le fichier `riclen-tinlyr-1.key`. Le fichier clé contient les clés privées de votre planète, qui sont nécessaires pour la première initialisation. Vous devrez copier ce fichier sur le serveur avec la commande suivante (en remplaçant `riclen-tinlyr` par votre propre vaisseau et votre hôte) :

```bash {% copy=true %}
scp riclen-tinlyr-passport/riclen-tinlyr-1.key riclen-tinlyr:
```

À noter : vous devriez conserver le fichier `riclen-tinlyr-1.key` jusqu'à ce que vous ayez terminé ce guide et que votre vaisseau soit initialiser pour être sûr qu'il ait été copié avec succès, mais après vous devriez également supprimer ce fichier par sécurité.

{% /tab %}

{% /tabs %}

Une fois que vous avez soit téléchargé votre ponton, ou votre fichier clé, vous pouvez vous connecter à votre serveur avec :

```bash {% copy=true %}
ssh riclen-tinlyr
```

Vous serez dirigé vers le shell de votre serveur.



## 5. Initialisez votre vaisseau

{% tabs %}

{% tab label="Si vous avez un ponton existant" %}


Dans la section précédente, vous vous êtes connecté au serveur par ssh. Dans la même session ssh, extrayez l'archive ponton que vous avez précédemment téléchargée, puis supprimez l'archive :

```bash {% copy=true %}
tar xvzf riclen-tinlyr.tar.gz && rm riclen-tinlyr.tar.gz
```

Vous aurez maintenant un dossier appelé `riclen-tinlyr`, qui est votre ponton. Urbit est mieux exécuté dans une session tmux ou screen afin qu'il soit facile de le garder en marche lorsque vous vous déconnectez. Dans ce cas, nous utiliserons tmux, qui a déjà été installé par le script d'installation.

Exécutez tmux :

```bash {% copy=true %}
tmux
```

Vous devriez maintenant être dans tmux. D'abord, amarrez votre vaisseau :

```bash {% copy=true %}
./urbit dock riclen-tinlyr
```

Cela copiera le runtime `urbit` à l'intérieur du ponton, donc vous pouvez maintenant supprimer l’exécutable avec :

```bash {% copy=true %}
rm urbit
```

{% /tab %}

{% tab label="Si vous avez un fichier clé" %}

Dans la section précédente, vous vous êtes connecté au serveur par ssh. Dans la même session ssh, exécutez tmux

```bash {% copy=true}
tmux
```

Vous devriez maintenant être dans tmux. Initialisez un nouveau vaisseau avec la commande suivante, en spécifiant le nom du vaisseau et le fichier clé, ainsi que le port Ames qui a été précédemment ouvert dans le pare-feu par le script d'installation :

```bash {% copy=true %}
./urbit -w riclen-tinlyr -k riclen-tinlyr-1.key -p 34543
```

L’initialisation d’un nouveau vaisseau peut prendre plusieurs minutes. Finalement, il vous amènera au Dojo (le shell d'Urbit) et affichera une commande de la forme ~riclen-tinlyr:dojo>. Une fois initialisé, éteignez le vaisseau en tapant |exit dans le Dojo. Après qu'il se soit éteint, il devrait afficher quelque chose comme "docked successfully", ce qui signifie que l’exécutable a été copié dans le ponton. Cela signifie que vous pouvez supprimer l’exécutable :

```bash {% copy=true %}
rm urbit
```

Le fichier clé n'est nécessaire que lorsque vous initialisez le vaisseau pour la première fois, donc c'est une bonne pratique de le supprimer après la première initialisation :

```bash {% copy=true %}
rm riclen-tinlyr-1.key
```

{% /tab %}

{% /tabs %}

Exécutez ce qui suit pour permettre au runtime de lier les ports 80 et 443 :

```bash {% copy=true %}
sudo setcap 'cap_net_bind_service=+ep' riclen-tinlyr/.run
```

Maintenant vous pouvez démarrer votre vaisseau avec ce qui suit :

```bash {% copy=true %}
./riclen-tinlyr/.run -p 34543
```

Après quelques instants, il affichera l'invite Dojo sous la forme `~riclen-tinlyr:dojo>`.


## 6. Obtenez un domaine

Pour faciliter l'accès à l'interface web, vous devez demander un nom de domaine `arvo.network`. Pour ce faire, exécutez la commande suivante dans le Dojo, en remplaçant l'adresse IP par celle de votre droplet :

``` {% copy=true %}
-dns-address [%if .161.35.148.247]
```

Ceci demandera un sous-domaine de votre vaisseau ressemblant à `riclen-tinlyr.arvo.network`.

Le domaine devrait être enregistré presque instantanément, mais il faut parfois un certain temps pour qu'il se propage aux autres serveurs DNS. Vous pouvez donc voir ce qui suit :

```
> -dns-address [%if .161.35.148.247]
dns: request for DNS sent to ~deg
dns: awaiting response from ~deg
http: fail (13, 504): unknown node or service
http: fail (14, 504): unknown node or service
http: fail (15, 504): unknown node or service
http: fail (16, 504): unknown node or service
http: fail (17, 504): unknown node or service
dns: unable to access via riclen-tinlyr.arvo.network
XX confirm port 80
XX check via nslookup
0
```

Si cela se produit, attendez entre 5 et 10 minutes et réessayez. Vous devriez éventuellement voir :

```
> -dns-address [%if .161.35.148.247]
dns: request for DNS sent to ~deg
dns: awaiting response from ~deg
[%key iter=0 width=2.047]
[%key iter=1 width=2.047]
[%key iter=2 width=2.047]
[%key iter=3 width=2.047]
acme: requesting an https certificate for riclen-tinlyr.arvo.network
dns: confirmed access via riclen-tinlyr.arvo.network
0
acme: received https certificate for riclen-tinlyr.arvo.network
http: restarting servers to apply configuration
http: web interface live on https://localhost:443
http: web interface live on http://localhost:80
http: loopback live on http://localhost:12321
```

Cela signifie que le domaine a été enregistré et qu'un certificat SSL a été installé, de sorte que vous pouvez accéder à l'interface web en toute sécurité avec HTTPS.

## 7. Se connecter à Landscape

Afin de vous connecter à l'interface web, vous devez obtenir le code de connexion web. Exécutez ce qui suit dans le Dojo :

``` {% copy=true %}
+code
```

Vous obtiendrez quelque chose ressemblant à `ropnys-batwyd-nossyt-mapwet`. C'est votre code de connexion web. Vous pouvez le copier et le sauvegarder dans un gestionnaire de mot de passe ou quelque chose de similaire. Notez que le code de connexion web est séparé du *Master Ticket*.

La configuration du serveur devrait maintenant être terminée, et vous pouvez accéder à Landscape dans le navigateur. Naviguez vers le domaine que vous avez configuré précédemment, dans ce cas `riclen-tinlyr.arvo.network`. Vous devriez voir l'écran de connexion de Landscape :

![landscape login screen](https://media.urbit.org/operators/manual/running/hosting/landscape-login.png)

Saisissez le code de connexion Web et vous serez dirigé vers l'écran d'accueil de votre vaisseau. Votre vaisseau fonctionne maintenant dans le cloudet vous pouvez y accéder depuis n'importe quel appareil en visitant son URL.

## 8. Déconnexion

Vous pouvez maintenant vous déconnecter de la session tmux en appuyant sur `CTRL+b d` (c'est-à-dire que vous appuyez sur `CTRL+b`, vous le relâchez, puis vous appuyez sur `d`). Vous reviendrez au shell ordinaire, mais le vaisseau continuera de tourner en arrière-plan. Si vous voulez revenir au Dojo, vous pouvez rattacher la session tmux avec :

```bash {% copy=true %}
tmux a
```

Enfin, vous pouvez vous déconnecter complètement de la session ssh en appuyant sur `CTRL+d`.

## 9. Nettoyage

Si vous avez initialisez un nouveau vaisseau en téléchargeant un fichier clé, c'est une bonne idée de supprimer maintenant le fichier clé sur votre machine locale.

Si vous avez téléchargé un ponton existant, vous devriez supprimer l'ancienne copie du répertoire du ponton et de l'archive `.tar.gz` situé sur votre machine locale. Vous pourriez être tenté de conserver l'une de ces copies comme sauvegarde, mais notez que **vous ne devez plus jamais initialiser l'ancienne copie sur le réseau**. Cela créerait des problèmes de réseau impossibles à résoudre et vous obligerait à effectuer une réinitialisation d'usine via le Bridge, ce qui effacerait les données de votre vaisseau. Nous vous recommandons donc de ne pas conserver de copies de votre ponton.
