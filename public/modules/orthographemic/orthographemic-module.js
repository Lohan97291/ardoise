/** Mount the self-contained workshop inside Ardoise. No library or network dependency. */
export function monterOrthographemic(container, {
  src = './Orthographemic-CE1.html', lettre = 'a', atelier = 'sort',
  session = 'classe', onFermer = () => {}, onProgression = () => {}
} = {}) {
  if (!(container instanceof HTMLElement)) throw new TypeError('Conteneur HTML attendu.');
  const url = new URL(src, document.baseURI);
  const params = new URLSearchParams({embed:'1',letter:lettre,activity:atelier,session});
  url.hash = params.toString();
  const frame = document.createElement('iframe');
  frame.title = 'Atelier Orthographémic CE1';
  frame.allowFullscreen = true;
  frame.style.cssText = 'display:block;width:100%;height:100%;min-height:520px;border:0;background:#f4f7fc;';
  frame.src = url.href;
  let connected = false;
  const onlineEmbedding = /^https?:$/.test(url.protocol) && url.origin === location.origin;
  function send(type, payload = {}) {
    if (onlineEmbedding) frame.contentWindow?.postMessage({source:'ardoise',version:1,type,payload},url.origin);
  }
  frame.addEventListener('load', () => { connected = false; send('connect'); });
  function receive(event) {
    if (!onlineEmbedding || event.source !== frame.contentWindow || event.origin !== url.origin) return;
    const m = event.data;
    if (!m || m.source !== 'orthographemic-ce1' || m.version !== 1) return;
    if (m.type === 'ready') { connected = true; send('get-progress'); }
    if (m.type === 'progress') onProgression(m.payload);
    if (m.type === 'close') onFermer();
  }
  window.addEventListener('message', receive);
  container.append(frame);
  return {
    frame,
    configurer({lettre,atelier,nombre} = {}) {
      if (!connected) throw new Error('Le module doit être chargé sur le même site pour être piloté.');
      send('configure', { ...(lettre !== undefined ? {letter:lettre} : {}),
        ...(atelier !== undefined ? {activity:atelier} : {}),
        ...(nombre !== undefined ? {count:nombre} : {}) });
    },
    detruire() { window.removeEventListener('message',receive); frame.remove(); }
  };
}
