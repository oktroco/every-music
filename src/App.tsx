import * as React from "react";
import { GlobalStyle } from "./style/CommonStyle";
import PlayManager from "./playmanager/PlayManager";

export default class App extends React.Component<{}, {}> {
    render(): JSX.Element {
        return (
            <>
                <GlobalStyle />
                <PlayManager is_logined={true} username={"오곁액"} />
            </>
        );
    }
}
