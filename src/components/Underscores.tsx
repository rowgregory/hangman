import React from "react";
import styled from "styled-components";

interface UnderscoresProps {
  underscores: string;
}

const UnderscoreStyles = styled.div`
  display: flex;
`;
const Underscores = ({ underscores }: UnderscoresProps) => {
  return (
    <>
      <UnderscoreStyles
        style={{
          padding: "1rem",
          letterSpacing: "1rem",
          textTransform: "uppercase",
          fontFamily: "Baloo Bhai"
        }}
      >
        {underscores}
      </UnderscoreStyles>
    </>
  );
};

export default Underscores;
