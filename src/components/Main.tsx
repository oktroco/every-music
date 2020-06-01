import * as React from "react";
import styled from "styled-components";
import Search from "./Search";
import PlayList from "./PlayList";

export interface MainProps {
    is_logined: boolean;
    username: string;
}

const MainPage = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding-right: 30px;
    padding-left: 30px;
    padding-top: 100px;
    background: linear-gradient(180deg, #fee6ff 0%, rgba(255, 231, 255, 0.942708) 19.86%, rgba(255, 255, 255, 0) 38.07%),
        #ffffff;
`;

const SearchBox = styled.div`
    flex-basis: 500px;
    height: 600px;
    background: #ffffff;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
`;

const PlayBox = styled.div`
    flex-basis: 500px;
    height: 600px;
    background: #ffffff;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
`;

export default class Main extends React.Component<MainProps, {}> {
    render(): JSX.Element {
        return (
            <MainPage>
                <SearchBox>
                    <Search />
                </SearchBox>
                <PlayBox>
                    <PlayList />
                </PlayBox>
            </MainPage>
        );
    }
}
