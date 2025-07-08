
import React, { useEffect } from 'react';
import { useSupabaseData } from '@/hooks/useSupabaseData';

const ScriptRenderer = () => {
  const { scripts, loading } = useSupabaseData();

  useEffect(() => {
    if (loading || !scripts) return;

    const activeScripts = scripts.filter(script => script.active);

    activeScripts.forEach(script => {
      const scriptElement = document.createElement('script');
      scriptElement.innerHTML = script.script_content;
      scriptElement.setAttribute('data-script-id', script.id);

      if (script.position === 'head') {
        document.head.appendChild(scriptElement);
      } else {
        document.body.appendChild(scriptElement);
      }
    });

    // Cleanup function to remove scripts when component unmounts
    return () => {
      activeScripts.forEach(script => {
        const existingScript = document.querySelector(`script[data-script-id="${script.id}"]`);
        if (existingScript) {
          existingScript.remove();
        }
      });
    };
  }, [scripts, loading]);

  return null; // This component doesn't render anything visible
};

export default ScriptRenderer;
