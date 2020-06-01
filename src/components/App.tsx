import * as React from "react";
import { GlobalStyle } from "../style/CommonStyle";
import Main from "./Main";

export default class App extends React.Component<{}, {}> {
    render(): JSX.Element {
        return (
            <>
                <GlobalStyle />
                <Main is_logined={true} username={"오곁액"} />
            </>
        );
    }
}
