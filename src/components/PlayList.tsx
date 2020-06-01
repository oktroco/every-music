import * as React from "react";
import styled from "styled-components";
import { Container, Row, Column } from "../style/CommonStyle";
import socketio from "socket.io-client";

const LocalContainer = styled(Container)`
    flex-direction: column;
    padding-right: 30px;
    padding-left: 30px;
    padding-top: 30px;
    background: #ffffff;
`;

const List = styled(Column)`
    position: relative;
    height: 450px;
    overflow-y: auto;
    overflow-x: hidden;
    margin-top: 20px;
    ::-webkit-scrollbar {
        width: 6px;
    }
    ::-webkit-scrollbar-track {
        background-color: transparent;
    }
    ::-webkit-scrollbar-thumb {
        border-radius: 3px;
        background-color: #919191;
    }
    ::-webkit-scrollbar-button {
        width: 0;
        height: 0;
    }
`;

const Item = styled(Row)`
    position: relative;
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #e6e6e6;
`;

export interface PlayListState {
    playlist: Array<SocketValue>;
}

interface SocketValue {
    title: string;
}

const socket = socketio.connect(`${process.env.REACT_APP_BACKURL}`);

export default class PlayList extends React.Component<{}, PlayListState> {
    state: Readonly<PlayListState> = {
        playlist: [],
    };
    componentDidMount() {
        socket.on("playlist", (value: string) => {
            const socket_value: SocketValue = JSON.parse(value);
            const { playlist } = this.state;
            this.setState({ playlist: playlist.concat(socket_value) });
        });
        socket.on("remove", (value: string) => {
            console.log("재생목록삭제");
            this.setState({ playlist: [] });
        });
    }

    setPlayList = (): JSX.Element => {
        const { playlist } = this.state;
        let result: Array<JSX.Element> = [];
        playlist.map((element, index) => {
            result.push(
                <Item key={index}>
                    <Column>
                        <h3>{element.title}</h3>
                    </Column>
                </Item>,
            );
        });
        return <List>{result}</List>;
    };

    removePlayList = () => {
        socket.emit("remove", { type: "playlist" });
    };

    render(): JSX.Element {
        const { setPlayList, removePlayList } = this;
        return (
            <LocalContainer>
                <Row
                    style={{
                        width: "100%",
                        paddingRight: "20px",
                        paddingLeft: "20px",
                        justifyContent: "space-between",
                    }}
                >
                    <div>
                        <h1>재생목록</h1>
                    </div>
                    <button onClick={removePlayList}>재생목록 제거</button>
                </Row>
                {setPlayList()}
            </LocalContainer>
        );
    }
}
