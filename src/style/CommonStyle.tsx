import * as React from "react";
import styled, { css, createGlobalStyle } from "styled-components";

interface Styles {
    readonly styles?: object;
}

export const GlobalStyle = createGlobalStyle`
    body{
        width: 100vw;
        height: 100vh;
        padding: 0;
        margin: 0;
    }
`;

export const Container = styled.div`
    display: flex;
`;

export const Row = styled.div`
    display: flex;
    flex-direction: row;
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
`;
