import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Track {
  id: string;
  title: string;
  description?: string;
  mood: string;
  genre: string;
  audioUrl: string;
  duration: number;
}

interface MusicStore {
  likedTracks: Track[];
  recentTracks: Track[];
  addLikedTrack: (track: Track) => void;
  removeLikedTrack: (trackId: string) => void;
  addRecentTrack: (track: Track) => void;
  isTrackLiked: (trackId: string) => boolean;
  clearRecentTracks: () => void;
  clearLikedTracks?: () => void;
}

export const useStore = create<MusicStore>()(
  persist(
    (set, get) => ({
      likedTracks: [],
      recentTracks: [],

      addLikedTrack: (track) =>
        set((state) => ({
          likedTracks: [
            ...state.likedTracks.filter((t) => t.id !== track.id),
            track,
          ],
        })),

      removeLikedTrack: (trackId) =>
        set((state) => ({
          likedTracks: state.likedTracks.filter((t) => t.id !== trackId),
        })),

      addRecentTrack: (track) =>
        set((state) => ({
          recentTracks: [
            track,
            ...state.recentTracks.filter((t) => t.id !== track.id),
          ].slice(0, 10),
        })),

      isTrackLiked: (trackId) => {
        const state = get();
        return state.likedTracks.some((t) => t.id === trackId);
      },

      clearRecentTracks: () => set({ recentTracks: [] }),
      clearLikedTracks: () => set({ likedTracks: [] }),
    }),
    {
      name: "wubble-music-storage",
    }
  )
);
