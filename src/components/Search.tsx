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

const socket = socketio.connect("http://localhost:4000");

export interface SearchState {
    searchValue: string;
}

export default class Search extends React.Component<{}, SearchState> {
    constructor(props: object) {
        super(props);
        this.state = {
            searchValue: "",
        };
    }
    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ searchValue: e.target.value });
    };

    sendMsg = () => {
        const { searchValue } = this.state;
        console.log({ searchValue });
        socket.emit("testmsg", { name: "bella" });
        socket.on("testmsg", (msg: any) => {
            console.log(msg);
        });
    };
    render(): JSX.Element {
        const { handleChange, sendMsg } = this;
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
                    <input onChange={handleChange} />
                    <button onClick={sendMsg}>검색</button>
                </Row>
                <Column style={{ marginTop: "20px" }}></Column>
            </LocalContainer>
        );
    }
}
