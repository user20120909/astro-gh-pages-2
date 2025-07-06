import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: any;
  }
}

const ClientScripts = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const scrollY = urlParams.get('scroll');
    if (scrollY) {
      window.scrollTo(0, parseInt(scrollY, 10));
      urlParams.delete('scroll');
      window.history.replaceState(
        {},
        '',
        `${window.location.pathname}${
          urlParams.size > 0 ? '?' : ''
        }${urlParams.toString()}`
      );
    }
    try {
      const adCount = document.querySelectorAll('.adsbygoogle').length;
      for (let i = 0; i < adCount; i++) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    let isScrolling: NodeJS.Timeout;

    const handleScroll = () => {
      clearTimeout(isScrolling);

      isScrolling = setTimeout(() => {
        const titleCards = document.getElementsByClassName('title-block');
        const titleCardArray = Array.from(titleCards);
        if (titleCardArray.length === 2) {
          const firstTitleCardY = titleCardArray[0].getBoundingClientRect().top;
          const secondTitleCardY =
            titleCardArray[1].getBoundingClientRect().top;
          const redirect = titleCardArray[1].getAttribute('data-slug');
          if (
            redirect &&
            window.scrollY + firstTitleCardY >= secondTitleCardY
          ) {
            window.location.href = `/p/${redirect}?scroll=${
              window.scrollY + firstTitleCardY - secondTitleCardY
            }`;
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(isScrolling);
          }
        }
      }, 150); // Adjust the timeout as needed
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(isScrolling);
    };
  }, []);

  return <></>;
};

export default ClientScripts;
