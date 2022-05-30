import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

const MoonArr = ['🌕', '🌖', '🌗', '🌘', '🌑', '🌒', '🌓', '🌔'];

const Loading = () => {
  const [moon, setMoon] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setMoon((current) => {
        if (current < 7) {
          console.log(current + 1);
          return current + 1;
        } else {
          console.log(0);
          return (current = 0);
        }
      });
    }, 500);
  }, []);

  return <LoadingWrapper>{MoonArr[moon]}</LoadingWrapper>;
};

export default Loading;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60vh;
  font-size: 64px;
`;
