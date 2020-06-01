import * as React from "react";
import styled from "styled-components";
import { Container, Row, Column } from "../style/CommonStyle";

const LocalContainer = styled(Container)`
    flex-direction: column;
    padding-right: 30px;
    padding-left: 30px;
    padding-top: 30px;
    background: #ffffff;
`;
export default class Search extends React.Component<{}, {}> {
    render(): JSX.Element {
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
                </Row>
                <Column style={{ marginTop: "20px" }}></Column>
            </LocalContainer>
        );
    }
}
