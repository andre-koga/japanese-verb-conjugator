import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PreferenceState {
    darkMode: boolean;
    showRomaji: boolean;
    showHiragana: boolean;
    setDarkMode: (darkMode: boolean) => void;
    setShowRomaji: (showRomaji: boolean) => void;
    setShowHiragana: (showHiragana: boolean) => void;
}

const usePreferenceStore = create<PreferenceState>()(
    persist(
        (set) => ({
            darkMode: false,
            showRomaji: true,
            showHiragana: true,
            setDarkMode: (darkMode) => set({ darkMode }),
            setShowRomaji: (showRomaji) => set({ showRomaji }),
            setShowHiragana: (showHiragana) => set({ showHiragana }),
        }),
        {
            name: "preference-storage",
        }
    )
);

export { usePreferenceStore }; 