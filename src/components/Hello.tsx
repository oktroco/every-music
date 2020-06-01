import * as React from "react";

export interface HelloProps {
    name: string;
    id: number;
}

export default class Hello extends React.Component<HelloProps, {}> {
    render() {
        const { name, id } = this.props;
        return (
            <div>
                name : {name}
                <br />
                id : {id}
            </div>
        );
    }
}
