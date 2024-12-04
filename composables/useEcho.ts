import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

declare global {
    interface Window {
        Pusher:any;
        Echo:any;
    }
}

export const useEcho = () => {
    const config = useRuntimeConfig();

    window.Pusher = Pusher
    window.Echo = new Echo({
        broadcaster: 'reverb',
        key: config.public.REVERB_APP_KEY,
        wsHost: config.public.REVERB_HOST,
        wsPort: config.public.REVERB_PORT,
        wssPort: config.public.REVERB_PORT,
        enabledTransports: ['ws', 'wss'],
        cluster: 'mt1',
        forceTLS: config.public.REVERB_SCHEME === 'https',
    })

    return {
        Echo: window.Echo
    }
}