import * as React from "react";
import styled from "styled-components";
import Search from "./Search";
import PlayList from "./PlayList";
import { Row } from "../style/CommonStyle";

export interface MainProps {
    is_logined: boolean;
    username: string;
}

const MainPage = styled.div`
    display: flex;
    background: linear-gradient(180deg, #fee6ff 0%, rgba(255, 231, 255, 0.942708) 19.86%, rgba(255, 255, 255, 0) 38.07%),
        #ffffff;
    justify-content: center;
`;

const SearchBox = styled.div`
    margin-top: 20px;
    width: 500px;
    height: 600px;
    background: #ffffff;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
`;

const PlayBox = styled.div`
    margin-top: 20px;
    width: 500px;
    height: 600px;
    background: #ffffff;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
`;

const LocalRow = styled(Row)`
    width: 100%;
    max-width: 1160px;
    justify-content: space-between;
    padding-right: 30px;
    padding-left: 30px;
    margin-top: 100px;
    flex-wrap: wrap;
`;

export default class Main extends React.Component<MainProps, {}> {
    render(): JSX.Element {
        return (
            <MainPage>
                <LocalRow>
                    <PlayBox>
                        <PlayList />
                    </PlayBox>
                    <SearchBox>
                        <Search />
                    </SearchBox>
                </LocalRow>
            </MainPage>
        );
    }
}
