import { useEffect, useRef } from 'react';
import './App.css';

function App() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    const closePage = (event: any) => {
      console.log('來源', event.origin);
      if (event.origin === window.location.origin || event.origin === 'https://kf4.jpcaqc.com') {
        console.log('event.data:::', event.data);

        // 只有返回backStatus为true时才关闭客服页面
        if (event.data.backStatus) {
          // 需要关闭的操作
          console.log(':需要关闭了^_^');
        }
      }
    };
    window.addEventListener('message', closePage);
    return () => {
      window.removeEventListener('message', closePage);
    };
  }, []);

  const handleClick = () => {
    const iframeElement = iframeRef.current;
    if (iframeElement) {
      console.log(':::so slow');
      iframeElement?.contentWindow?.postMessage({ isShowEnd: true, back: true }, '*');
    }
  };

  return (
    <div className='App'>
      <button onClick={handleClick}>反回</button>
      <iframe ref={iframeRef} src='' title='customerService' />
    </div>
  );
}

export default App;
