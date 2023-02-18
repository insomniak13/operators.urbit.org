+++
title = "Créer un groupe d’invitations"
weight = 30
template = "doc.html"
+++

Si vous êtes propriétaire d'une étoile, vous avez la possibilité de créer **des groupes d’invitations**. Ces groupes d’invitations vous permettent d'offrir à vos amis une partie du réseau sous la forme d'une planète. Ce document vous explique comment créer un groupe d’invitations et comment le partager avec vos amis à l'aide de notre outil [Bridge](https://bridge.urbit.org/).

Pour des conseils plus généraux sur l'utilisation de votre étoile, consultez la page sur [l'exploitation des étoiles et des galaxies](https://operators.urbit.org/manual).

## Anatomie d'un groupe d’invitations

Un groupe d’invitations est un ensemble d'invitations de planètes pouvant être distribués par courrier électronique ou par URL. Chaque invitation vaut une planète lorsqu'elle est échangée. Un groupe d’invitations peut être aussi large que vous le souhaitez, à condition qu'il vous reste suffisamment de planètes à générer. Tous les groupes d’invitations doivent être créés par une étoile, mais ils doivent être donnés à une planète. Si vous souhaitez savoir comment cela fonctionne techniquement, jetez un coup d'œil au [contract DelegatedSending.sol](https://github.com/urbit/azimuth/blob/master/contracts/DelegatedSending.sol).

Gardez à l'esprit que toutes les planètes auront accès au groupe d’invitations jusqu'à ce que celui-ci soit épuisé.

Par exemple : En tant que `~marzod`, je génère `~wicdev-wisryt` et lui attribue un groupe d’invitations de 100 planètes. `~wicdev-wisryt` peut maintenant envoyer une invitation à un ami sur galen@tlon.io. Lorsque Galen réclame sa planète (`~ravmel-ropdyl`), `~ravmel-ropdyl` peut maintenant inviter son ami - ou 99 d'entre eux. `~wicdev-wisryt` peut également continuer à utiliser le groupe d’invitations, tout comme les personnes qu'il invite.

## Comment créer un groupe d’invitations ?

Donner à vos amis un morceau d'Urbit ne prend que quelques minutes : envoyez groupe d’invitations  à une planète, et ensuite cette planète peut envoyer une invitation par email à un ami (ou des amis).

1. Connectez-vous à Bridge en utilisant votre adresse de propriété pour votre étoile.

2. Changez le proxy de génération de votre étoile en `0xF7908Ab1F1e352F83c5ebc75051c0565AEaea5FB`. Il s'agit d'une adresse de contrat qui gérera la génération de planètes pour les invités.

3. Obtenez l'`@p` (comme `~poldec-tonteg`) de la planète à laquelle vous souhaitez donner accès au groupe d’invitations. Il peut s'agir d'une planète que vous contrôlez ou de celle d'un ami. Il ne doit pas nécessairement s'agir d'une planète parrainée par votre étoile.

4. Cliquez sur "Manage Invite Pools" pour attribuer groupe d’invitations à la planète. Il se peut que vous receviez une notification vous indiquant que vous devez attribuer votre proxy de génération à l'adresse du contrat d'envoi délégué. Ceci afin que le contrat puisse envoyer des invitations en votre nom lorsque le destinataire les réclame. Cette adresse est `0xF7908Ab1F1e352F83c5ebc75051c0565AEaea5FB`, qui est également affichée dans Bridge.

![](https://media.urbit.org/docs/invite-pool/browser-point.png)

1. Saisissez l'`@p` de la planète et le nombre d'invitations que vous souhaitez leur attribuer.

![](https://media.urbit.org/docs/invite-pool/browser-create-pool.png)

Une fois la transaction terminée, la planète aura accès au groupe d’invitations.

## Comment envoyer une invitation ?

1. Connectez-vous à Bridge en utilisant la planète à laquelle un groupe d'invitations a été attribué en utilisant le *Master Ticket* ou l'adresse de propriété de la planète.

2. Sous "Invite Group", cliquez sur "Add Members" pour dérouler l'interface d'invitation.

3. Sélectionnez "Email" ou "URL".

4. Si vous avez sélectionné "Email", entrez dans la boîte de dialogue l'adresse ou les adresses électroniques de ceux à qui vous souhaitez envoyer l’invitation. Vous pouvez ajouter plus d'une adresse électronique. Cliquez sur "Add to Invite Group" lorsque vous avez terminé, et attendez que la transaction soit terminée. Votre/vos ami(s) recevra(ont) sous peu un e-mail contenant votre cadeau d'une identité pour la vie !

Si vous avez choisi "URL", cliquez sur "Générer une URL d'invitation" pour créer une URL d'invitation que vous pourrez ensuite partager.

## FAQ

Q. Que se passe-t-il si l'adresse du proxy de génération est modifiée par rapport à `0xF7908Ab1F1e352F83c5ebc75051c0565AEaea5FB` après la création d'un groupe d’invitations ? Le(s) groupe(s) d'invités en suspens fonctionneront ils toujours ? 
R. Non. Les soldes existants seront conservés, mais Bridge (et `azimuth-js`) ne considèrera pas les invitations de cette étoile comme utilisables et toute tentative d'envoyer une de leurs planètes entraînera l'échec de la transaction.

Q. Une étoile peut-elle créer plus d'un groupe d’invitations à la fois ? 
R. Oui, une étoile peut autoriser une planète donnée à envoyer un nombre quelconque d'invitations indépendamment les unes des autres.

Q. Un pool d'invitations peut-il être révoqué ? 
R. Oui, cela peut se faire en attribuant zéro invitation à une planète qui avait précédemment eu accès à groupe d’invitations.

Q. Une planète déléguée peut-elle se voir attribuer plus d'un groupe d'invitations ? 
R. Oui, en tant que planète, plusieurs étoiles peuvent vous donner des invitations à utiliser.

Q. Que faire si vous envoyez une invitation à une adresse électronique par erreur ? 
R. Les planètes qui ont été envoyées, mais pas encore réclamées, vivent à l'adresse de propriété de l'étoile qui a créé le groupe d'invitations. Connectez-vous à Bridge en utilisant l'adresse de propriété de la star et vous pourrez annuler l'invitation en attente. Une fois qu'une invitation a été acceptée, rien ne peut être fait !
