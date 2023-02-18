+++
title = "Couche 2 pour les planètes"
weight = 50
description = "Commencer avec une identité Urbit permanente"
+++

Quel impact permet la couche 2 pour les planètes? Des frais de transaction peu élevés permettant un accès peu coûteux sur le réseau et d'y rester.

Effectuer des transactions directement sur la blockchain Ethereum, la ‘couche 1’, est devenu prohibitif au cours de l'année dernière en raison de la valeur de l'ETH et de la congestion du réseau. Par conséquent, générer une planète ou effectuer des opérations simples via Bridge peut s'avérer très coûteux. La solution de [couche 2](https://urbit.org/docs/azimuth/l2/layer2) d'Urbit, appelée [rollups naïfs](https://urbit.org/blog/rollups), rend l'exécution de ces transactions bon marché voire gratuite. Les planètes peuvent en profiter sous la forme de prix plus bas pour les planètes, ainsi que de transactions Azimuth bon marché ou gratuites.

### Ce qu'il faut savoir

- La migration est actuellement **unidirectionnelle**.<br /><br />Vous ne pouvez pas déplacer une ID de la couche 2 vers la couche 1. Cela inclut les planètes qui sont créées sur la couche 2.
- Vous ne pouvez pas interagir avec les ID de la couche 2 en utilisant des outils de la couche 1 comme OpenSea ou Metamask.<br /><br />Vous ne pourrez pas utiliser votre ID avec des contrats intelligents, ni le ‘voir’ en utilisant des portefeuilles autres que Bridge. **Bridge est actuellement le seul logiciel qui peut voir ou interagir avec les identifiants de la couche 2**.
- La couche 2 n'a rien à voir avec la mise en réseau des vaisseaux.<br /><br />Le fonctionnement de votre vaisseau sur le réseau ne sera pas influencé par la couche sur laquelle il se trouve. Vous serez toujours à même de communiquer avec des vaisseaux présents tant sur l’une que sur l'autre couche.

- Vous pouvez effectuer des transactions de la couche 2 gratuitement avec le roller de Tlon.<br /><br />Un roller public exploité par Tlon est connecté à Bridge par défaut, mais tout le monde peut exploiter un roller. Le roller de Tlon offre des transactions gratuites subventionnées jusqu'à une limite hebdomadaire de 25 opérations. 

- Vous devrez payer pour la migration vers L2.<br /><br />La migration est un processus ponctuel qui a lieu sur la couche 1. Vous devrez la financer de la même manière qu'une transaction Azimuth traditionnelle de la couche 1.
    
- Votre étoile parraine peut se trouver sur l'une ou l'autre couche.<br /><br />La couche sur laquelle se trouve une étoile n'a aucune incidence sur les personnes qu'elle peut parrainer.

Si vous aviez déjà une planète avant le lancement de L2, vous n'avez rien à faire. Votre vaisseau continuera de fonctionner normalement et vous pourrez toujours communiquer avec l'ensemble du réseau sans aucune intervention supplémentaire. Cependant, vous avez la possibilité de migrer votre planète vers la couche 2 afin de profiter des coûts réduits et des transactions subventionnées disponibles grâce au roller de Tlon.

### Dois-je migrer ?

Si vous avez une planète sur la couche 1, la migration est entièrement facultative. Les **avantages** de la migration d'une planète vers la couche 2 sont des transactions Azimuth gratuites ou bon marché. Les vaisseaux de la couche 2 peuvent utiliser le roller de Tlon pour effectuer des opérations dans le Bridge gratuitement jusqu'à une limite hebdomadaire fixée. Ces opérations peuvent consister à réinitialiser des clés de réseau ou à changer de parrain.

Les **contreparties** de la migration d'une planète vers la couche 2 sont les suivantes :

- Le processus de migration est actuellement irréversible. Si vous migrez vers la couche 2, vous ne pouvez pas revenir sur la couche 1.
- Les vaisseaux de la couche 2 ne sont pas visibles par les outils de la couche 1, comme les portefeuilles ou les explorateurs de chaînes. Bridge est actuellement le seul logiciel capable de ‘voir’ les identifiants de la couche 2.

### Sur quelle couche suis-je ?
Vous pouvez savoir d'un coup d'oeil sur quelle couche se trouve votre bien dans Bridge 

1. Connectez-vous à Bridge.
2. Cliquez sur la modale de l'adresse de propriété en haut à gauche du menu principal.
3. Une icône carrée avec 'L1' ou 'L2' s'affiche à côté de chaque ressource appartenant à votre adresse.

Une adresse de propriété unique peut posséder des vaisseaux à la fois sur la couche 1 et la couche 2.

### Migration

Pour migrer :

1. Connectez-vous à Bridge.
2. Cliquez sur le menu modal de l'adresse de propriété dans le coin supérieur gauche.
3. Sélectionnez ‘Migrer’, puis ‘Continuer’ après avoir lu les informations présentées.
4. Vous devrez payer des frais uniques pour financer la transaction ; assurez-vous que votre adresse L1 dispose de fonds disponibles.

La migration vers la couche 2 ne change pas l'adresse propriétaire d'un point. **Vous utiliserez toujours le même portefeuille ou la même clé pour vous connecter à Bridge après la migration**. Une même adresse propriétaire peut avoir des vaisseaux à la fois sur la couche 1 et la couche 2.

La migration elle-même ne doit pas être soumise à un roller, elle devrait se terminer en quelques minutes. Une fois qu'elle l'a fait, vous pouvez soumettre des planètes et des transactions à la file d'attente du roller immédiatement.

### Activer une planète sur la couche 2

**Les codes de planète** sont des phrases mnémoniques à usage unique utilisées pour réclamer un *Master Ticket* via Bridge. Il peut s'agir d'expressions textuelles autonomes ou intégrées à une URL commençant par `bridge.urbit.org`. Les **Master Tickets** sont des mots de passe utilisés pour se connecter à Bridge afin de gérer un identifiant qui a déjà été réclamé.

Si vous avez reçu une URL d'invitation pour réclamer une planète :

1. Ouvrez le lien.
2. Cliquez sur "Claim".
3. Révélez le code du *Master Ticket*. Notez-le dans un endroit sûr.
4. Confirmez que vous avez bien noté le code en le retapant dans l'invite.
5. Cliquez pour télécharger votre passeport, qui contient le fichier clé que vous utiliserez pour la première initialisation de votre vaisseau.

Si vous avez reçu un code d'activation textuel de quatre mots, allez sur [Bridge](https://bridge.urbit.org/) et cliquez sur ‘*Activate a planet’* en bas. Saisissez votre code de planète et suivez les instructions ci-dessus..

À l'avenir, vous pourrez vous connecter à Bridge en utilisant le *Master Ticket* que vous avez noté afin de gérer les clés de votre vaisseau. Connaître le *Master Ticket* équivaut à posséder l'ID, alors gardez-le dans un endroit sûr.

Une considération importante pour les nouveaux utilisateurs en ce qui concerne les planètes de la couche 2 : votre clé de propriété est techniquement exposée à l'étoile qui a émis votre planète pendant 24 heures maximum, jusqu'à ce que le lot suivant soit traité par votre *roller*. Pendant ce laps de temps, il est techniquement possible pour l'émetteur de reprendre la planète ou de décrypter les paquets qui lui sont destinés. C'est la raison pour laquelle le fichier clé que vous utilisez pour initialiser votre vaisseau a en fait deux moitiés, une pour le démarrage initial, et une seconde qui vous appartient exclusivement.

La première fois que vous initialisez, la clé de la première moitié du fichier clé est utilisée, mais lors du traitement du lot de *roller* suivant, l'identifiant sera modifié avec une deuxième clé. Cette clé est tenue secrète par l'étoile qui vous a généré, et une fois cette transaction effectuée, votre planète est définitivement et cryptographiquement la vôtre. Tout ceci est pris en charge en arrière-plan et ne nécessite aucune intervention. Vous n'avez même pas besoin de redémarrer votre planète après que le transfert de propriété a été finalisé.

### Exécuter votre planète

Une fois que vous avez activé votre planète et téléchargé votre fichier clé, vous pouvez l'utiliser pour [initialiser immédiatement votre vaisseau](https://urbit.org/getting-started/cli).

Traitez votre planète comme l'objet précieux qu'elle est. Ne partagez pas votre code d'accès à votre planète ou votre *Master Key* avec qui que ce soit. N’exécutez jamais à deux endroits en même temps. Cela le désynchroniserait avec le réseau et lui causerait des `lésions cérébrales`, l'empêchant de communiquer avec le monde extérieur. Ne supprimez pas le répertoire qui contient les données de votre poste. Si vous arrêtez votre vaisseau pour un certain temps, conservez le dossier de données dans un endroit sûr, et vous pourrez reprendre là où vous vous êtes arrêté à l'avenir.

Vous pouvez également choisir [d'héberger votre planète](https://urbit.org/getting-started#hosting-providers) chez un fournisseur. Les vaisseaux hébergés par des fournisseurs sont toujours opérationnels et bénéficient d'une assistance. Après avoir activé votre code planète, mais avant d'avoir initialisé avec votre fichier clé, vous pouvez créer un compte auprès d'un hébergeur comme [UrbitHost](https://urbithost.com/) et utiliser votre fichier clé pour initialiser votre vaisseau avec leur service, c'est ce qu'on appelle `apporter sa propre planète`.

Outre l'importation d'une nouvelle planète, UrbitHost vous permet de faire migrer un ponton (*pier*) existant vers votre compte hébergé. Si vous avez initialisez une planète sur votre PC mais que vous voulez passer à l'hébergement, vous pouvez la télécharger et commencer à travailler sans avoir à réinitialiser vos clés de réseau.

### Historique des transactions

Une nouvelle fonctionnalité de Bridge est la possibilité de voir l'historique des transactions de votre actif. Ceci est particulièrement important car avec la couche 2, une grande partie de l'état d'Azimuth n'est plus visible sur la blockchain Ethereum, mais est maintenu par le réseau Urbit. Cela signifie que vous ne serez peut-être pas en mesure d'observer directement "qui possède quoi" en regardant les contrats Azimuth avec quelque chose comme un [explorateur de blockchain](https://etherscan.io/address/azimuth.eth). Les activités telles que la mise en place de clés de réseau, l'émission de planètes ou le déplacement de vos clés de proxy apparaîtront dans ce journal. Notez que le menu de l'historique des transactions dans Bridge est actuellement le seul moyen d'examiner les opérations Azimuth qui ont lieu sur la couche 2.

Si vous soumettez une opération à votre roller, vous verrez un compte à rebours jusqu'au prochain lot et un historique des opérations effectuées. Bridge ne vous permet pas actuellement d'annuler une opération une fois qu'elle a été soumise.

Les transferts entrants de nouveaux actifs apparaîtront également dans l'historique de vos opérations. Si votre adresse de propriété possède plus d'un actif, vous pouvez utiliser la modale pour choisir parmi eux.
