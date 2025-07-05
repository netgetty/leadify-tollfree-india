
declare global {
  function gtag(command: 'config' | 'event' | 'js', targetId: string | Date, config?: any): void;
}

export {};
