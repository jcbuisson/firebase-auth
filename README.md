# Firebase authentication

See https://firebase.google.com/docs/auth/


## Firebase console setings

- create an application in the Firebase console
- add the various auth providers
- config data : go to "Project settings" (cog on left side)
- Add Your Domain to Firebase Authorized Domains : Authentication -> Settings -> Authorized domains, ajouter auth.jcbuisson.dev

### Google
Rien à faire

### Github
- créer une GitHub OAuth App dans le [GitHub Developer Settings](https://github.com/settings/developers) et récupérer le clientid et le secret
- redirect_uri : fourni par la Firebase Console -> Authentication -> sign-in methods -> Github

### Facebook
- créer une Facebook App dans le [Facebook developer](https://developers.facebook.com/)


## backend settings

- get the service-account.json file in "Project settings / service accounts" 
It is used to authenticate backend to the Firebase Admin SDK
- click on "Generate new private key" and save file as service-account.json. Do not commit it
