import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

const resources = {
  // --- English ---
  en: {
    translation: {
      welcome: "Welcome",
      greeting: "Hello, {{name}}!",
      login: "Login",
      register: "Register",
      email: "Email",
      password: "Password",
      wrongEmailFormat: "Invalid email format",
      dontHaveAccount: "Don't have an account? ",
      alreadyHaveAccount: "Already have an account? ",
      settings: {
        title: "Settings",
        searchPlaceholder: "Search settings...",
        editProfile: "Edit Profile",
        likes: "Likes",
        saved: "Saved",
        comments: "Comments",
        noResults: "No results found",
      },
      tabs: {
        feedTitle: "Feed",
        searchTitle: "Search",
        addPostTitle: "Add",
        messagesTitle: "Messages",
        profileTitle: "Profile",
      },
      addPost: {
        title: "New Post",
        permissionNeeded:
          "Camera and Gallery permissions are needed to continue.",
        galleryError: "Could not load gallery items.",
        captureError: "Could not take photo.",
        galleryEmpty: "No photos or videos",
        continueButton: "Continue",
        continueAlertTitle: "Continue",
        continueAlertMessage: "Ready to continue with: {{uri}}",
        retakeButton: "Retake",
      },
    },
  },
  // --- Spanish ---
  es: {
    translation: {
      welcome: "Bienvenido",
      greeting: "¡Hola, {{name}}!",
      login: "Iniciar Sesión",
      register: "Registrarme",
      email: "Correo Electrónico",
      password: "Contraseña",
      wrongEmailFormat: "Formato de email inválido",
      dontHaveAccount: "¿No tienes cuenta? ",
      alreadyHaveAccount: "¿Ya tienes cuenta? ",
      settings: {
        title: "Configuración",
        searchPlaceholder: "Buscar en configuración...",
        editProfile: "Editar Perfil",
        likes: "Me gusta",
        saved: "Guardado",
        comments: "Comentarios",
        noResults: "No se encontraron resultados",
      },
      tabs: {
        feedTitle: "Inicio",
        searchTitle: "Buscar",
        addPostTitle: "Añadir",
        messagesTitle: "Mensajes",
        profileTitle: "Perfil",
      },
      addPost: {
        title: "Nueva Publicación",
        permissionNeeded:
          "Se necesitan permisos de Cámara y Galería para continuar.",
        galleryError: "No se pudieron cargar los elementos de la galería.",
        captureError: "No se pudo tomar la foto.",
        galleryEmpty: "No hay fotos o vídeos",
        continueButton: "Continuar",
        continueAlertTitle: "Continuar",
        continueAlertMessage: "Listo para continuar con: {{uri}}",
        retakeButton: "Rehacer",
      },
    },
  },
  // --- French ---
  fr: {
    translation: {
      welcome: "Bienvenue",
      greeting: "Bonjour, {{name}} !",
      login: "Connexion",
      register: "S'inscrire",
      email: "E-mail",
      password: "Mot de passe",
      wrongEmailFormat: "Format d'e-mail invalide",
      dontHaveAccount: "Vous n'avez pas de compte ? ",
      alreadyHaveAccount: "Vous avez déjà un compte ? ",
      settings: {
        title: "Paramètres",
        searchPlaceholder: "Rechercher dans les paramètres...",
        editProfile: "Modifier le profil",
        likes: "Mentions J'aime",
        saved: "Enregistré",
        comments: "Commentaires",
        noResults: "Aucun résultat trouvé",
      },
      tabs: {
        feedTitle: "Accueil",
        searchTitle: "Rechercher",
        addPostTitle: "Ajouter",
        messagesTitle: "Messages",
        profileTitle: "Profil",
      },
      addPost: {
        title: "Nouveau Post",
        permissionNeeded:
          "Les autorisations Caméra et Galerie sont nécessaires pour continuer.",
        galleryError: "Impossible de charger les éléments de la galerie.",
        captureError: "Impossible de prendre la photo.",
        galleryEmpty: "Aucune photo ou vidéo",
        continueButton: "Continuer",
        continueAlertTitle: "Continuer",
        continueAlertMessage: "Prêt à continuer avec : {{uri}}",
        retakeButton: "Reprendre",
      },
    },
  },
  // --- Portuguese (Brazil) ---
  pt: {
    translation: {
      welcome: "Bem-vindo(a)",
      greeting: "Olá, {{name}}!",
      login: "Entrar",
      register: "Registrar-se",
      email: "E-mail",
      password: "Senha",
      wrongEmailFormat: "Formato de e-mail inválido",
      dontHaveAccount: "Não tem uma conta? ",
      alreadyHaveAccount: "Já tem uma conta? ",
      settings: {
        title: "Configurações",
        searchPlaceholder: "Buscar nas configurações...",
        editProfile: "Editar Perfil",
        likes: "Curtidas",
        saved: "Salvo",
        comments: "Comentários",
        noResults: "Nenhum resultado encontrado",
      },
      tabs: {
        feedTitle: "Início",
        searchTitle: "Buscar",
        addPostTitle: "Adicionar",
        messagesTitle: "Mensagens",
        profileTitle: "Perfil",
      },
      addPost: {
        title: "Nova Publicação",
        permissionNeeded:
          "Permissões de Câmera e Galeria são necessárias para continuar.",
        galleryError: "Não foi possível carregar os itens da galeria.",
        captureError: "Não foi possível tirar a foto.",
        galleryEmpty: "Nenhuma foto ou vídeo",
        continueButton: "Continuar",
        continueAlertTitle: "Continuar",
        continueAlertMessage: "Pronto para continuar com: {{uri}}",
        retakeButton: "Tirar Novamente",
      },
    },
  },
  // --- German ---
  de: {
    translation: {
      welcome: "Willkommen",
      greeting: "Hallo, {{name}}!",
      login: "Anmelden",
      register: "Registrieren",
      email: "E-Mail",
      password: "Passwort",
      wrongEmailFormat: "Ungültiges E-Mail-Format",
      dontHaveAccount: "Kein Konto? ",
      alreadyHaveAccount: "Bereits ein Konto? ",
      settings: {
        title: "Einstellungen",
        searchPlaceholder: "Einstellungen durchsuchen...",
        editProfile: "Profil bearbeiten",
        likes: "Likes",
        saved: "Gespeichert",
        comments: "Kommentare",
        noResults: "Keine Ergebnisse gefunden",
      },
      tabs: {
        feedTitle: "Feed",
        searchTitle: "Suche",
        addPostTitle: "Hinzufügen",
        messagesTitle: "Nachrichten",
        profileTitle: "Profil",
      },
      addPost: {
        title: "Neuer Beitrag",
        permissionNeeded:
          "Kamera- und Galerieberechtigungen sind erforderlich, um fortzufahren.",
        galleryError: "Galerieelemente konnten nicht geladen werden.",
        captureError: "Foto konnte nicht aufgenommen werden.",
        galleryEmpty: "Keine Fotos oder Videos",
        continueButton: "Weiter",
        continueAlertTitle: "Weiter",
        continueAlertMessage: "Bereit zum Fortfahren mit: {{uri}}",
        retakeButton: "Erneut aufnehmen",
      },
    },
  },
  // --- Italian ---
  it: {
    translation: {
      welcome: "Benvenuto/a",
      greeting: "Ciao, {{name}}!",
      login: "Accedi",
      register: "Registrati",
      email: "E-mail",
      password: "Password",
      wrongEmailFormat: "Formato e-mail non valido",
      dontHaveAccount: "Non hai un account? ",
      alreadyHaveAccount: "Hai già un account? ",
      settings: {
        title: "Impostazioni",
        searchPlaceholder: "Cerca nelle impostazioni...",
        editProfile: "Modifica profilo",
        likes: "Mi piace",
        saved: "Salvati",
        comments: "Commenti",
        noResults: "Nessun risultato trovato",
      },
      tabs: {
        feedTitle: "Home",
        searchTitle: "Cerca",
        addPostTitle: "Aggiungi",
        messagesTitle: "Messaggi",
        profileTitle: "Profilo",
      },
      addPost: {
        title: "Nuovo Post",
        permissionNeeded:
          "Sono necessarie le autorizzazioni per Fotocamera e Galleria per continuare.",
        galleryError: "Impossibile caricare gli elementi della galleria.",
        captureError: "Impossibile scattare la foto.",
        galleryEmpty: "Nessuna foto o video",
        continueButton: "Continua",
        continueAlertTitle: "Continua",
        continueAlertMessage: "Pronto per continuare con: {{uri}}",
        retakeButton: "Rifai",
      },
    },
  },
};

const locales = Localization.getLocales();
const supportedCodes = Object.keys(resources);
const deviceLanguageCode = locales.find((locale) =>
  supportedCodes.includes(locale.languageCode)
)?.languageCode;

const initialLanguage = deviceLanguageCode || locales[0]?.languageCode || "en";

console.log("Detected initial language:", initialLanguage);

i18n.use(initReactI18next).init({
  resources,
  lng: initialLanguage,
  fallbackLng: "en",
  compatibilityJSON: "v3",
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
