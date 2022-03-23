import React, { useEffect } from 'react';
import GlobalStyle from '@/styles/global';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps }) {
  const [queryClient] = React.useState(() => new QueryClient());
  useEffect(() => {
    window.Kakao.init('06feb16c270318fcb8dda5b89a3b9f1d');
  }, []);
  <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>;
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <GlobalStyle />
          <Component {...pageProps} />
        </Hydrate>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default MyApp;
