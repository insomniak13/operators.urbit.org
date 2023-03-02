+++
title = "Guide de l'opérateur Coturn"
description = "Instructions pour exécuter un serveur coturn sur votre étoile."
weight = 4
template = "doc.html"
+++

Pour effectuer des appels vocaux et vidéo via urbit, nous utilisons un protocole appelé WebRTC qui permet aux vaisseaux de se connecter directement les uns aux autres. La plupart du temps, l'un ou les deux vaisseaux sont derrière des NATs et des pare-feu et sont souvent incapables de se connecter. Pour contourner ce problème, au lieu de se connecter directement les uns aux autres, les vaisseaux peuvent tous se connecter à un serveur TURN (*Transversal Using Relays around NATs*) qui relaiera toutes les données entre tous les participants. Comme il s'agit de relayer un grand nombre de données, il n'existe pas de serveurs TURN gratuits sur Internet. C'est pourquoi une étoile peut offrir un service intéressant en gérant un serveur TURN et en permettant aux planètes qu'elle parraine de l'utiliser. Ce guide vous montrera comment en mettre un en place.

Le serveur que vous souhaitez utiliser s'appelle [coturn](https://github.com/coturn/coturn).

Coturn nécessite un serveur, un domaine et un certificat. Il peut fonctionner sur la même machine que votre étoile ou sur une machine séparée.

## Obtenir un serveur, un domaine et un certificat

Si vous avez besoin d'un serveur ou d'un domaine, suivez [le guide de l'hébergement sur le cloud](https://urbit.org/using/running/hosting) jusqu'à la section ‘Installation d'Urbit’. Arrêtez-vous là, car vous n'avez pas besoin d'installer Urbit sur la machine coturn. Suivez [ce guide](https://www.digitalocean.com/community/tutorials/how-to-acquire-a-let-s-encrypt-certificate-using-dns-validation-with-certbot-dns-digitalocean-on-ubuntu-20-04) pour installer certbot et l'utiliser pour obtenir un certificat.

Notez que les instructions ci-dessous supposent que vous opérez depuis un serveur Ubuntu. Si votre serveur fonctionne avec une distribution différente, vous devrez peut-être remplacer `apt-get` et `ufw` par le gestionnaire de paquets et le pare-feu de votre distribution.

## Installation de docker

Nous allons installer docker et exécuter le conteneur docker coturn avec notre propre certificat et fichier de configuration.

Installez Docker avec ces commandes tirées de [ce guide](https://docs.docker.com/engine/install/ubuntu/#installation-methods) :

```
$ sudo apt-get update
$ sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
$ sudo mkdir -p /etc/apt/keyrings
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
$ echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
$ sudo apt-get update
$ sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

Vérifiez que Docker est installé correctement avec cette commande :

```
$ sudo docker run hello-world
```

## Configurer le pare-feu pour ouvrir les ports de Coturn

Coturn nécessite les ports 3478 et 5349 pour communiquer, ainsi que les ports 49152-65535 pour relayer les données. (Je sais que c'est un nombre important de ports, mais c'est un serveur de relais).

```
$ sudo ufw allow 3478
$ sudo ufw allow 5349
$ sudo ufw allow 49152:65535/udp
```

Allumez le pare-feu :

```
$ sudo ufw enable 
```

- Vérifier le statut
``` 
$ sudo ufw status
```

## Installez Coturn
- Créez un dossier pour Coturn

```
$ mkdir ~/coturn
```

- Copiez votre certification dans le dossier pour que Coturn puisse l’utiliser

```
$ mkdir ~/coturn/certs
$ sudo cp /etc/letsencrypt/live/<YOUR-DOMAIN>/cert.pem /etc/letsencrypt/live/<YOUR-DOMAIN>/privkey.pem ~/coturn/certs
```

- Générez un secret qui sera partagé entre Coturn et l’agent uturn gall

```
$ sudo apt install pwgen
$ pwgen -s 64 1
```

La sortie de la commande pwgen est votre secret. N'importe qui le possédant peut accéder à votre serveur coturn, alors gardez-le précieusement.

- Créez un fichier de configuration
```
$ touch ~/coturn/coturn.conf
$ nano ~/coturn/coturn.conf
```

- Collez le contenu ci-dessous dans coturn.conf
```
# STUN server port is 3478 for UDP and TCP, and 5349 for TLS.
# Allow connection on the UDP port 3478
listening-port=3478
# and 5349 for TLS (secure)
tls-listening-port=5349
# Require authentication
fingerprint
use-auth-secret
static-auth-secret=<YOUR SECRET YOU GENERATED>
server-name=<YOUR DOMAIN>
realm=<YOUR DOMAIN>
total-quota=100
stale-nonce=600
# Path to the SSL certificate and private key.
cert=/coturn/certs/cert.pem
pkey=/coturn/certs/privkey.pem
# Specify the allowed OpenSSL cipher list for TLS/DTLS connections
cipher-list="ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-SHA384"
```

- Assurez-vous de mettre le secret que vous avez généré dans la ligne static-auth-secret.
- Assurez-vous que les chemins vers votre certificat sont corrects.
- Assurez-vous que le royaume et le domaine correspondent à votre domaine (c'est-à-dire zod.net)

- Exécutez coturn
```
$ sudo docker run -d --network=host \
  -v ~/coturn:/coturn \
  instrumentisto/coturn -c /coturn/turnserver.conf
```

## Test de fonctionnement de coturn
Tout d'abord, vous devez générer des informations d'identification à l'aide de ce programme python. Les informations d'identification sont créées avec un nom d'utilisateur, qui peut être n'importe quoi, un TTL, qui est leur durée de vie, et le secret que vous avez mis dans le fichier de configuration plus tôt.

```
$ touch coturn.py
$ nano coturn.py
```

- Copiez ceci dans coturn.py et remplacez SECRET par votre secret. L'utilisateur n'a pas d'importance (il n'est utilisé que pour faire correspondre les connexions avec les utilisateurs dans les journaux) donc, laissez-le comme user1.

```
import hashlib
import hmac
import base64
from time import time
user = 'user1'
secret = b'SECRET'
ttl = 24 * 3600 # Time to live
timestamp = int(time()) + ttl
username = str(timestamp) + ':' + user
dig = hmac.new(secret, bytes(username, 'latin-1'), hashlib.sha1).digest()
password = base64.b64encode(dig).decode()
print('username: %s' % username)
print('password: %s' % password)
```

- Maintenant, exécutez le pour obtenir les certificats
```
$ python coturn.py
```

Vous obtiendrez un nom d'utilisateur et un mot de passe.

- Allez sur https://webrtc.github.io/samples/src/content/peerconnection/trickle-ice/
- Supprimez le serveur google stun existant dans la liste.
- Ajoutez un serveur appelé `turn:votre-domaine` (c'est-à-dire turn:turn.zod.net)
- Copiez le nom d'utilisateur et le mot de passe générés par le script python dans les champs.
- Cliquez sur *Gather Candidates*. Si vous voyez le type de composant `rtp relay` dans la liste, cela a fonctionné.

## Configurez uturn

- Maintenant, vous devez aller sur votre vaisseau (votre étoile ou une lune) et demander à uturn l'URL et le secret de votre serveur de tour. Assurez-vous de commencer l'URL par 'turn:' et mets ton secret.

```
> :uturn &set-server-config [%server url='turn:turn.zod.net' secret='mysecret']
```
