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
    height: 500px;
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

export interface SearchState {
    searchValue: string;
    contents: Array<SearchResult>;
}

interface SearchResult {
    id: ContentId;
    etag?: string;
    kind?: string;
    snippet: ContentSnippet;
    [key: string]: any;
}

interface ContentId {
    kind: string;
    videoId: string;
    channelId?: string;
    playlistId?: string;
}

interface ContentSnippet {
    channelId?: string;
    channelTitle?: string;
    description?: string;
    thumbnails?: Thumbnails;
    title?: string;
    [key: string]: any;
}

interface Thumbnails {
    default?: Thumnail;
    high?: Thumnail;
    medium?: Thumnail;
}

interface Thumnail {
    url: string;
    width: number;
    height: number;
}

const socket = socketio.connect(`${process.env.REACT_APP_BACKURL}`);

export default class Search extends React.Component<{}, SearchState> {
    state: Readonly<SearchState> = {
        searchValue: "",
        //contents: testContents,
        contents: [],
    };
    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ searchValue: e.target.value });
    };
    searchContents = async () => {
        const { searchValue } = this.state;
        console.log({ searchValue });
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?key=${process.env.REACT_APP_YT_APIKEY}&part=snippet&q=${searchValue}&maxResults=20&type=video`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
        const result = await response.json();
        console.log(result.items);
        const items: Array<SearchResult> = result.items;
        this.setState({ contents: items });
    };

    addContent = (yt_id: string, title: string) => {
        socket.emit("playlist", { yt_id: yt_id, title: title });
    };

    setContentsList = (): JSX.Element => {
        const { contents } = this.state;
        let result: Array<JSX.Element> = [];
        contents.map((element, index) => {
            result.push(
                <Item key={index}>
                    <Column>
                        <h3>{element.snippet.title}</h3>
                        <h4>채널명 : {element.snippet.channelTitle}</h4>
                    </Column>
                    <Column>
                        <img src={element.snippet.thumbnails.default.url} />
                        <button onClick={() => this.addContent(element.id.videoId, element.snippet.title)}>추가</button>
                    </Column>
                </Item>,
            );
        });
        return <List>{result}</List>;
    };

    render(): JSX.Element {
        const { handleChange, searchContents, setContentsList } = this;
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
                    <button onClick={searchContents}>검색</button>
                </Row>
                {setContentsList()}
            </LocalContainer>
        );
    }
}

const testContents = [
    {
        kind: "youtube#searchResult",
        etag: "ZVPKaW0AID7AwqVkmDXYoEyKnzA",
        id: {
            kind: "youtube#video",
            videoId: "_pJxQHjca5M",
        },
        snippet: {
            publishedAt: "2019-01-10T19:00:06Z",
            channelId: "UCN8lvTq60JdzSkFRnUQIGTw",
            title: "아이묭 - marigold (한글자막)",
            description: "가수 - あいみょん (아이묭) 노래 - マリーゴールド (메리골드)",
            thumbnails: {
                default: {
                    url: "https://i.ytimg.com/vi/_pJxQHjca5M/default.jpg",
                    width: 120,
                    height: 90,
                },
                medium: {
                    url: "https://i.ytimg.com/vi/_pJxQHjca5M/mqdefault.jpg",
                    width: 320,
                    height: 180,
                },
                high: {
                    url: "https://i.ytimg.com/vi/_pJxQHjca5M/hqdefault.jpg",
                    width: 480,
                    height: 360,
                },
            },
            channelTitle: "4u",
            liveBroadcastContent: "none",
            publishTime: "2019-01-10T19:00:06Z",
        },
    },
    {
        kind: "youtube#searchResult",
        etag: "ZVPKaW0AID7AwqVkmDXYoEyKnzA",
        id: {
            kind: "youtube#video",
            videoId: "_pJxQHjca5M",
        },
        snippet: {
            publishedAt: "2019-01-10T19:00:06Z",
            channelId: "UCN8lvTq60JdzSkFRnUQIGTw",
            title: "아이묭 - marigold (한글자막)",
            description: "가수 - あいみょん (아이묭) 노래 - マリーゴールド (메리골드)",
            thumbnails: {
                default: {
                    url: "https://i.ytimg.com/vi/_pJxQHjca5M/default.jpg",
                    width: 120,
                    height: 90,
                },
                medium: {
                    url: "https://i.ytimg.com/vi/_pJxQHjca5M/mqdefault.jpg",
                    width: 320,
                    height: 180,
                },
                high: {
                    url: "https://i.ytimg.com/vi/_pJxQHjca5M/hqdefault.jpg",
                    width: 480,
                    height: 360,
                },
            },
            channelTitle: "4u",
            liveBroadcastContent: "none",
            publishTime: "2019-01-10T19:00:06Z",
        },
    },
    {
        kind: "youtube#searchResult",
        etag: "ZVPKaW0AID7AwqVkmDXYoEyKnzA",
        id: {
            kind: "youtube#video",
            videoId: "_pJxQHjca5M",
        },
        snippet: {
            publishedAt: "2019-01-10T19:00:06Z",
            channelId: "UCN8lvTq60JdzSkFRnUQIGTw",
            title: "아이묭 - marigold (한글자막)",
            description: "가수 - あいみょん (아이묭) 노래 - マリーゴールド (메리골드)",
            thumbnails: {
                default: {
                    url: "https://i.ytimg.com/vi/_pJxQHjca5M/default.jpg",
                    width: 120,
                    height: 90,
                },
                medium: {
                    url: "https://i.ytimg.com/vi/_pJxQHjca5M/mqdefault.jpg",
                    width: 320,
                    height: 180,
                },
                high: {
                    url: "https://i.ytimg.com/vi/_pJxQHjca5M/hqdefault.jpg",
                    width: 480,
                    height: 360,
                },
            },
            channelTitle: "4u",
            liveBroadcastContent: "none",
            publishTime: "2019-01-10T19:00:06Z",
        },
    },
    {
        kind: "youtube#searchResult",
        etag: "ZVPKaW0AID7AwqVkmDXYoEyKnzA",
        id: {
            kind: "youtube#video",
            videoId: "_pJxQHjca5M",
        },
        snippet: {
            publishedAt: "2019-01-10T19:00:06Z",
            channelId: "UCN8lvTq60JdzSkFRnUQIGTw",
            title: "아이묭 - marigold (한글자막)",
            description: "가수 - あいみょん (아이묭) 노래 - マリーゴールド (메리골드)",
            thumbnails: {
                default: {
                    url: "https://i.ytimg.com/vi/_pJxQHjca5M/default.jpg",
                    width: 120,
                    height: 90,
                },
                medium: {
                    url: "https://i.ytimg.com/vi/_pJxQHjca5M/mqdefault.jpg",
                    width: 320,
                    height: 180,
                },
                high: {
                    url: "https://i.ytimg.com/vi/_pJxQHjca5M/hqdefault.jpg",
                    width: 480,
                    height: 360,
                },
            },
            channelTitle: "4u",
            liveBroadcastContent: "none",
            publishTime: "2019-01-10T19:00:06Z",
        },
    },
    {
        kind: "youtube#searchResult",
        etag: "ZVPKaW0AID7AwqVkmDXYoEyKnzA",
        id: {
            kind: "youtube#video",
            videoId: "_pJxQHjca5M",
        },
        snippet: {
            publishedAt: "2019-01-10T19:00:06Z",
            channelId: "UCN8lvTq60JdzSkFRnUQIGTw",
            title: "아이묭 - marigold (한글자막)",
            description: "가수 - あいみょん (아이묭) 노래 - マリーゴールド (메리골드)",
            thumbnails: {
                default: {
                    url: "https://i.ytimg.com/vi/_pJxQHjca5M/default.jpg",
                    width: 120,
                    height: 90,
                },
                medium: {
                    url: "https://i.ytimg.com/vi/_pJxQHjca5M/mqdefault.jpg",
                    width: 320,
                    height: 180,
                },
                high: {
                    url: "https://i.ytimg.com/vi/_pJxQHjca5M/hqdefault.jpg",
                    width: 480,
                    height: 360,
                },
            },
            channelTitle: "4u",
            liveBroadcastContent: "none",
            publishTime: "2019-01-10T19:00:06Z",
        },
    },
    {
        kind: "youtube#searchResult",
        etag: "ZVPKaW0AID7AwqVkmDXYoEyKnzA",
        id: {
            kind: "youtube#video",
            videoId: "_pJxQHjca5M",
        },
        snippet: {
            publishedAt: "2019-01-10T19:00:06Z",
            channelId: "UCN8lvTq60JdzSkFRnUQIGTw",
            title: "아이묭 - marigold (한글자막)",
            description: "가수 - あいみょん (아이묭) 노래 - マリーゴールド (메리골드)",
            thumbnails: {
                default: {
                    url: "https://i.ytimg.com/vi/_pJxQHjca5M/default.jpg",
                    width: 120,
                    height: 90,
                },
                medium: {
                    url: "https://i.ytimg.com/vi/_pJxQHjca5M/mqdefault.jpg",
                    width: 320,
                    height: 180,
                },
                high: {
                    url: "https://i.ytimg.com/vi/_pJxQHjca5M/hqdefault.jpg",
                    width: 480,
                    height: 360,
                },
            },
            channelTitle: "4u",
            liveBroadcastContent: "none",
            publishTime: "2019-01-10T19:00:06Z",
        },
    },
];
