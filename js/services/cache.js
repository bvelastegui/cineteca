const CACHE_TTL = 3600000; // 1 hora en milisegundos

export function getCachedData(key) {
    try {
        const cached = localStorage.getItem(key);
        if (!cached) return null;

        const { data, timestamp } = JSON.parse(cached);

        // Validar frescura
        if (Date.now() - timestamp > CACHE_TTL) {
            localStorage.removeItem(key);
            return null;
        }

        return data;
    } catch (error) {
        console.error('Error al leer caché:', error);
        return null;
    }
}

export function setCacheData(key, data) {
    try {
        const cacheObject = {
            data,
            timestamp: Date.now()
        };
        localStorage.setItem(key, JSON.stringify(cacheObject));
    } catch (error) {
        console.error('Error al guardar caché:', error);
        clearExpiredCache();
    }
}

export function clearExpiredCache() {
    Object.keys(localStorage).forEach(key => {
        if (key.startsWith('cache_')) {
            getCachedData(key);
        }
    });
}