import React from "react";
import styled from "styled-components";

const PlayWindow = styled.div`
    display: flex;
`;

const PlayButton = () => {
    const Container = styled.div`
        width: 100%;
        text-align: center;
        margin-top: 25vh;
    `;
    const Circle = styled.circle`
        border-radius: 50%;
    `;
    return (
        <Container>
            <Circle />
        </Container>
    );
};

class Player extends React.Component<{}, {}> {
    render() {
        return <div></div>;
    }
}
