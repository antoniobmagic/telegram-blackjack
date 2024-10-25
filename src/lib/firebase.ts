import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc,
  collection,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  DocumentData
} from 'firebase/firestore';
import { GAME_CONFIG } from './config';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export interface PlayerData {
  address: string;
  telegramId: string;
  chips: number;
  highestChips: number;
  gamesPlayed: number;
  gamesWon: number;
  lastBonus: Timestamp;
  weeklyWinnings: number;
  monthlyWinnings: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export const initializePlayer = async (
  address: string,
  telegramId: string
): Promise<PlayerData> => {
  const playerRef = doc(db, 'players', address.toLowerCase());
  const playerDoc = await getDoc(playerRef);

  if (!playerDoc.exists()) {
    const now = Timestamp.now();
    const newPlayer: PlayerData = {
      address: address.toLowerCase(),
      telegramId,
      chips: GAME_CONFIG.INITIAL_CHIPS,
      highestChips: GAME_CONFIG.INITIAL_CHIPS,
      gamesPlayed: 0,
      gamesWon: 0,
      lastBonus: now,
      weeklyWinnings: 0,
      monthlyWinnings: 0,
      createdAt: now,
      updatedAt: now,
    };

    await setDoc(playerRef, newPlayer);
    return newPlayer;
  }

  return playerDoc.data() as PlayerData;
};

export const updatePlayerStats = async (
  address: string,
  updates: Partial<PlayerData>
) => {
  const playerRef = doc(db, 'players', address.toLowerCase());
  await updateDoc(playerRef, {
    ...updates,
    updatedAt: Timestamp.now(),
  });
};

export const getLeaderboard = async (
  timeframe: 'weekly' | 'monthly'
): Promise<DocumentData[]> => {
  const now = new Date();
  let startDate = new Date();

  if (timeframe === 'weekly') {
    startDate.setDate(now.getDate() - 7);
  } else {
    startDate.setMonth(now.getMonth() - 1);
  }

  const q = query(
    collection(db, 'players'),
    where('updatedAt', '>=', Timestamp.fromDate(startDate)),
    orderBy(timeframe === 'weekly' ? 'weeklyWinnings' : 'monthlyWinnings', 'desc'),
    limit(10)
  );

  const querySnapshot = await q;
  return querySnapshot;
};