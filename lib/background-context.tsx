import { createContext, useContext, useState, ReactNode } from 'react';

type BackgroundContextType = {
    background: string;
    setBackground: (bg: string) => void;
};

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);

export const BackgroundProvider = ({ children }: { children: ReactNode }) => {
    const [background, setBackground] = useState<string>('default');

    return (
        <BackgroundContext.Provider value={{ background, setBackground }}>
            {children}
        </BackgroundContext.Provider>
    );
};

export const useBackground = () => {
    const context = useContext(BackgroundContext);
    if (!context) throw new Error('useBackground must be used within BackgroundProvider');
    return context;
};
