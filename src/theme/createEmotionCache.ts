import createCache from '@emotion/cache';

const createEmotionCache = () => createCache({ key: 'mui', prepend: true });

export default createEmotionCache;
