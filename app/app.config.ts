export default defineAppConfig({
  ui: {
    primary: 'blue',
    secondary: 'orange',
    gray: 'neutral',
    container: {
      constrained: 'max-w-6xl',
    },
    modal: {
      wrapper: 'relative z-[100]',
      overlay: {
        background: 'bg-black/75 dark:bg-gray-800/75',
      },
    }
  },
})