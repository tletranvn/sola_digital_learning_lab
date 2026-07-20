# Banc de test Moodle

Ce dossier conserve l'environnement Moodle local utilisé uniquement pour valider les exports SCORM
de Sola - Digital Learning Lab.

Moodle n'est pas une dépendance du développement quotidien. L'application est construite et testée
d'abord comme application Next.js et comme paquet statique SCORM 1.2. Ce banc de test intervient dans
la dernière phase du planning.

## Contenu

- `docker-compose.yml` : Moodle et MariaDB ;
- `.env.example` : variables documentées sans secret ;
- `.env` : valeurs locales réelles, ignorées par Git.
- `legacy/` : ancien HTML de saisie Moodle et captures locales du prototype précédent.

Les cours ne sont pas enregistrés dans ce dossier. Ils seront générés dans
`dist/scorm/<course-id>.zip`, puis importés manuellement dans Moodle comme activités SCORM 1.2.

Les fichiers de `legacy/` ne sont pas la source du nouveau produit. Les captures PNG restent ignorées
par Git afin de ne pas publier d'éventuelles informations locales ou personnelles.

## Démarrage

Depuis la racine du dépôt :

```bash
cd integrations/moodle
docker compose up -d
```

L'URL par défaut définie dans `.env.example` est `http://localhost:8088`.

## Premier lancement

1. Copier `.env.example` vers `.env` si le fichier local n'existe pas.
2. Remplacer tous les mots de passe d'exemple.
3. Démarrer les services.
4. Attendre que MariaDB soit saine et que Moodle termine son initialisation.
5. Ouvrir Moodle avec le compte administrateur local.
6. Créer un cours et un compte étudiant de test.

## Test d'un cours exporté

1. Générer le paquet depuis la racine avec la commande d'export SCORM du projet.
2. Dans Moodle, activer le mode édition du cours de test.
3. Ajouter une activité « Paquetage SCORM ».
4. Importer le ZIP correspondant.
5. Configurer le suivi de complétion et la note.
6. Lancer l'activité avec le compte étudiant.
7. Commencer le cours, le quitter, puis vérifier la reprise.
8. Terminer le cours et vérifier score, statut et complétion dans Moodle.

## Arrêt

```bash
cd integrations/moodle
docker compose down
```

Cette commande conserve les volumes Docker. Leur suppression efface l'instance et ses données ; elle
ne doit être effectuée que si une réinitialisation complète est explicitement voulue.

## Limites

- cet environnement est un banc de qualification local, pas un hébergement de production ;
- l'image Moodle devra être revue avant un test futur si sa version n'est plus maintenue ;
- le test vise SCORM 1.2 ;
- LTI 1.3 nécessite une configuration et un service supplémentaires, à ajouter uniquement sur demande
  institutionnelle confirmée.
