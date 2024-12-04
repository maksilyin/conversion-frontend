export const addScriptIfNotExists = (src: string, onload: any, attrs: object = {}) => {
    if (!document.querySelector(`script[src="${src}"]`)) {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.defer = true;
        script.onload = onload;

        Object.entries(attrs).forEach(([key, value]) => {
            script.setAttribute(key, String(value));
        });

        document.head.appendChild(script);
    } else {
        onload();
    }
};