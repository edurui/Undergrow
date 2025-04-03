import { subHours, subMinutes, subDays } from "date-fns";

export interface Post {
  id: string;
  user: {
    name: string;
    avatarUrl?: string;
  };
  imageUrl: string;
  description?: string;
  likeCount: number;
  commentCount: number;
  createdAt: Date;
  isLikedByCurrentUser?: boolean;
  isSavedByCurrentUser?: boolean;
}

const now = new Date();

export const DUMMY_POSTS: Post[] = [
  {
    id: "1",
    user: { name: "usuario_a" },
    imageUrl: "https://picsum.photos/seed/1/500",
    description: "¡Mi primera foto! ☀️ #naturaleza",
    likeCount: 15,
    commentCount: 4,
    createdAt: subHours(now, 2),
  }, // Hace 2 horas
  {
    id: "2",
    user: {
      name: "dev_world",
      avatarUrl: "https://picsum.photos/seed/avatar2/50",
    },
    imageUrl: "https://picsum.photos/seed/2/500",
    description: "Programando...",
    likeCount: 35,
    commentCount: 12,
    createdAt: subHours(now, 5),
  }, // Hace 5 horas
  {
    id: "3",
    user: { name: "viajero_xyz" },
    imageUrl: "https://picsum.photos/seed/3/500",
    likeCount: 120,
    commentCount: 8,
    createdAt: subDays(now, 1),
  }, // Ayer
  {
    id: "4",
    user: { name: "foodie_lover" },
    imageUrl: "https://picsum.photos/seed/4/500",
    description: "Comida deliciosa 🍕",
    likeCount: 250,
    commentCount: 35,
    createdAt: subDays(now, 2),
  }, // Hace 2 días
  {
    id: "5",
    user: { name: "arte_abstracto" },
    imageUrl: "https://picsum.photos/seed/5/500",
    description: "Explorando formas y colores.",
    likeCount: 55,
    commentCount: 3,
    createdAt: subDays(now, 3),
  },
  {
    id: "6",
    user: { name: "usuario_a" },
    imageUrl: "https://picsum.photos/seed/6/500",
    description: "Otra foto más.",
    likeCount: 22,
    commentCount: 1,
    createdAt: subDays(now, 4),
  },
  {
    id: "7",
    user: {
      name: "dev_world",
      avatarUrl: "https://picsum.photos/seed/avatar2/50",
    },
    imageUrl: "https://picsum.photos/seed/7/500",
    description: "Compilando... espera.",
    likeCount: 40,
    commentCount: 6,
    createdAt: subDays(now, 5),
  },
  {
    id: "8",
    user: { name: "viajero_xyz" },
    imageUrl: "https://picsum.photos/seed/8/500",
    description: "Atardecer increíble.",
    likeCount: 180,
    commentCount: 15,
    createdAt: subDays(now, 6),
  },
  {
    id: "9",
    user: { name: "usuario_a" },
    imageUrl: "https://picsum.photos/seed/9/500",
    likeCount: 10,
    commentCount: 0,
    createdAt: subDays(now, 7),
  }, // Hace 1 semana
  {
    id: "10",
    user: { name: "dev_world" },
    imageUrl: "https://picsum.photos/seed/10/500",
    likeCount: 33,
    commentCount: 2,
    createdAt: subMinutes(subDays(now, 7), 30),
  }, // Hace 1 semana y 30 min
  {
    id: "11",
    user: { name: "viajero_xyz" },
    imageUrl: "https://picsum.photos/seed/11/500",
    likeCount: 95,
    commentCount: 7,
    createdAt: subDays(now, 8),
  },
  {
    id: "12",
    user: { name: "foodie_lover" },
    imageUrl: "https://picsum.photos/seed/12/500",
    likeCount: 215,
    commentCount: 28,
    createdAt: subDays(now, 9),
  },
  {
    id: "13",
    user: { name: "photo_fanatic" },
    imageUrl: "https://picsum.photos/seed/13/500",
    description: "¡Probando mi nueva lente! #fotografia",
    likeCount: 76,
    commentCount: 9,
    createdAt: subDays(now, 10),
  },
  {
    id: "14",
    user: {
      name: "dev_world",
      avatarUrl: "https://picsum.photos/seed/avatar2/50",
    },
    imageUrl: "https://picsum.photos/seed/14/500",
    description: "¡Refactorización completada! Código más limpio ✨",
    likeCount: 50,
    commentCount: 10,
    createdAt: subDays(now, 11),
  },
  {
    id: "15",
    user: { name: "usuario_a" },
    imageUrl: "https://picsum.photos/seed/15/500",
    description: "Un día tranquilo.",
    likeCount: 18,
    commentCount: 2,
    createdAt: subDays(now, 12),
  },
  {
    id: "16",
    user: { name: "foodie_lover" },
    imageUrl: "https://picsum.photos/seed/16/500",
    description: "Momento dulce 🍰 #postre",
    likeCount: 190,
    commentCount: 22,
    createdAt: subDays(now, 13),
  },
  {
    id: "17",
    user: { name: "viajero_xyz" },
    imageUrl: "https://picsum.photos/seed/17/500",
    description: "Respirando aire puro en las montañas ⛰️",
    likeCount: 155,
    commentCount: 11,
    createdAt: subDays(now, 14),
  }, // Hace 2 semanas
  {
    id: "18",
    user: { name: "arte_abstracto" },
    imageUrl: "https://picsum.photos/seed/18/500",
    likeCount: 62,
    commentCount: 5,
    createdAt: subDays(now, 15),
  },
  {
    id: "19",
    user: { name: "new_user_1" },
    imageUrl: "https://picsum.photos/seed/19/500",
    description: "¡Hola a todos! 👋",
    likeCount: 5,
    commentCount: 1,
    createdAt: subDays(now, 16),
  },
  {
    id: "20",
    user: {
      name: "dev_world",
      avatarUrl: "https://picsum.photos/seed/avatar2/50",
    },
    imageUrl: "https://picsum.photos/seed/20/500",
    description: "Buscando ese bug... 🐞",
    likeCount: 29,
    commentCount: 3,
    createdAt: subDays(now, 17),
  },
  {
    id: "21",
    user: { name: "usuario_a" },
    imageUrl: "https://picsum.photos/seed/21/500",
    description: "Fin de semana de relax total.",
    likeCount: 25,
    commentCount: 0,
    createdAt: subDays(now, 18),
  },
  {
    id: "22",
    user: { name: "photo_fanatic" },
    imageUrl: "https://picsum.photos/seed/22/500",
    likeCount: 88,
    commentCount: 14,
    createdAt: subDays(now, 19),
  },
  {
    id: "23",
    user: { name: "foodie_lover" },
    imageUrl: "https://picsum.photos/seed/23/500",
    description: "¡Noche de tapas! 😋",
    likeCount: 230,
    commentCount: 40,
    createdAt: subDays(now, 20),
  },
  {
    id: "24",
    user: { name: "viajero_xyz" },
    imageUrl: "https://picsum.photos/seed/24/500",
    description: "Día de playa perfecto 🌊 #verano",
    likeCount: 195,
    commentCount: 18,
    createdAt: subDays(now, 21),
  }, // Hace 3 semanas
  {
    id: "25",
    user: { name: "arte_abstracto" },
    imageUrl: "https://picsum.photos/seed/25/500",
    description: "Líneas, formas y texturas.",
    likeCount: 70,
    commentCount: 6,
    createdAt: subDays(now, 22),
  },
  {
    id: "26",
    user: { name: "new_user_1" },
    imageUrl: "https://picsum.photos/seed/26/500",
    likeCount: 8,
    commentCount: 0,
    createdAt: subDays(now, 23),
  },
  {
    id: "27",
    user: { name: "dev_world" },
    imageUrl: "https://picsum.photos/seed/27/500",
    description: "¡Nueva feature desplegada! ✅ #codinglife",
    likeCount: 65,
    commentCount: 15,
    createdAt: subDays(now, 24),
  },
  {
    id: "28",
    user: { name: "usuario_a" },
    imageUrl: "https://picsum.photos/seed/28/500",
    description: "Paseo por el parque.",
    likeCount: 30,
    commentCount: 3,
    createdAt: subDays(now, 25),
  },
  {
    id: "29",
    user: { name: "viajero_xyz" },
    imageUrl: "https://picsum.photos/seed/29/500",
    description: "Explorando la ciudad 🏙️ #viajes",
    likeCount: 160,
    commentCount: 13,
    createdAt: subDays(now, 26),
  },
  {
    id: "30",
    user: { name: "foodie_lover" },
    imageUrl: "https://picsum.photos/seed/30/500",
    description: "Brunch time! 🥑🍳",
    likeCount: 205,
    commentCount: 25,
    createdAt: subDays(now, 27),
  },
];
