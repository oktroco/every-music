import * as React from "react";
import styled from "styled-components";
import { Container, Row, Column } from "../../style/CommonStyle";
import socketio from "socket.io-client";
import YouTube from "react-youtube";
import { stringify } from "querystring";
import { isFunction } from "util";

const LocalContainer = styled(Container)`
    flex-direction: column;
    padding-right: 30px;
    padding-left: 30px;
    padding-top: 30px;
    background: #ffffff;
`;

const List: any = styled(Column)`
    position: relative;
    height: ${(props: any) => (props.playing ? "300px" : "450px")};
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

const Item: any = styled(Row)`
    position: relative;
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #e6e6e6;
    background-color: ${(props: any) => (props.playing ? "#f1f1f1" : "#ffffff")};
`;

export interface PlayListState {
    playlist: Array<Content>;
    playing_index: number;
    playing_yt_id: string;
    is_playing: boolean;
}

interface SocketValue {
    contents: Array<Content>;
}

interface Remove {
    type: string;
    content_id?: string;
    index?: number;
}

interface Content {
    content_id: number;
    yt_id: string;
    title: string;
}

interface ApiResponse {
    data: any;
    [key: string]: any;
}

const socket = socketio.connect(`${process.env.REACT_APP_BACKURL}`);

export default class PlayList extends React.Component<{}, PlayListState> {
    state: Readonly<PlayListState> = {
        playlist: [],
        playing_index: -1,
        playing_yt_id: "",
        is_playing: false,
    };

    componentDidMount() {
        this.callPlayList();
        socket.on("playlist", async (value: string) => {
            const socket_value: SocketValue = await JSON.parse(value);
            console.log(socket_value);
            this.setState({ playlist: socket_value.contents });
        });
        socket.on("remove", async (value: string) => {
            console.log("재생목록삭제");
            this.callPlayList();
            const data: Remove = await JSON.parse(value);
            const { playing_index } = this.state;
            if (this.state.playing_index === data.index) {
                this.setState({ playing_index: -1, is_playing: false });
            } else {
                this.setState({ playing_index: playing_index >= data.index ? playing_index - 1 : playing_index });
            }
        });
    }

    playContent = (playing_index: number) => {
        playing_index !== -1 &&
            this.setState({
                playing_index: playing_index,
                playing_yt_id: this.state.playlist[playing_index].yt_id,
                is_playing: true,
            });
    };

    setPlayList = (): Array<JSX.Element> => {
        const { playlist } = this.state;
        let result: Array<JSX.Element> = [];
        playlist.map((element, index) => {
            result.push(
                <Item key={index} playing={this.state.playing_index === index}>
                    <Row style={{ justifyContent: "space-between" }}>
                        <h3>{element.title}</h3>
                        <button onClick={() => this.playContent(index)}>재생</button>
                        <button onClick={() => this.removeContent(index)}>삭제</button>
                    </Row>
                </Item>,
            );
        });
        return result;
    };

    removePlayList = () => {
        socket.emit("remove", { type: "playlist" });
    };

    removeContent = (index: number) => {
        socket.emit("remove", { type: "content", content_id: this.state.playlist[index].content_id, index: index });
    };

    callPlayList = async () => {
        try {
            const response: Response = await fetch(`${process.env.REACT_APP_BACKURL}/playlist`);
            if (response.status === 200) {
                const response_data: ApiResponse = await response.json();
                this.setState({ playlist: response_data.data });
            }
        } catch (e) {
            console.log(e);
        }
    };

    onPlayerPause = (e: any) => {};

    onPlayerPlay = (e: any) => {
        this.setState({ is_playing: true });
    };

    onPlayerReady = (e: any) => {
        console.log("ready");
        this.playContent(this.state.playing_index);
        e.target.playVideo();
    };

    onPlayerEnd = async (e: any) => {
        const { playing_index, playlist } = this.state;
        if (playlist.length > playing_index + 1) {
            this.playContent(playing_index + 1);
        } else this.setState({ is_playing: false, playing_index: -1 });
    };

    onPlayerStateChange = (e: any) => {
        console.log(e.target.getPlayerState());
        if (e.target.getPlayerState() === -1 && this.state.is_playing) {
            e.target.playVideo();
        }
        if (e.target.getPlayerState() === 5 && this.state.is_playing) {
            e.target.playVideo();
        }
    };

    render(): JSX.Element {
        const {
            setPlayList,
            removePlayList,
            onPlayerReady,
            onPlayerEnd,
            onPlayerStateChange,
            onPlayerPause,
            onPlayerPlay,
        } = this;
        const { playing_index, playlist, playing_yt_id } = this.state;
        return (
            <LocalContainer>
                <Column>
                    <Row>
                        {playing_index !== -1 && (
                            <div>
                                <YouTube
                                    id="player"
                                    videoId={playing_yt_id}
                                    opts={{ height: "auto", width: "100%" }}
                                    onReady={onPlayerReady}
                                    onEnd={onPlayerEnd}
                                    onStateChange={onPlayerStateChange}
                                    onPause={onPlayerPause}
                                    onPlay={onPlayerPlay}
                                />
                            </div>
                        )}
                    </Row>
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
                </Column>
                <List playing={this.state.is_playing}>{setPlayList()}</List>
            </LocalContainer>
        );
    }
}
