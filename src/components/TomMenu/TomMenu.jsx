import React from "react";
import { Menu, Header, Image, Dropdown } from "semantic-ui-react";

const TopMenu = ({ language, region, action }) => (
    <Menu color="green">
        <Menu.Item>
            <Header>
                <Image src="/img/logo.png" /> Movie
            </Header>
        </Menu.Item>
        <Menu.Menu position="right">
            <Dropdown item text="My Account " icon="angle down">
                <Dropdown.Menu>
                    <Dropdown.Item>
                        <Dropdown text="Country" icon="angle left">
                            <Dropdown.Menu>
                                <Dropdown.Item
                                    onClick={(e, d) => {
                                        action(e, d, "region");
                                    }}
                                    value="ua"
                                    active={region === "ua"}
                                    text="Ukraine"
                                    flag="ua"
                                />
                                <Dropdown.Item
                                    onClick={(e, d) => {
                                        action(e, d, "region");
                                    }}
                                    value="us"
                                    active={region === "us"}
                                    text="United States"
                                    flag="us"
                                />
                            </Dropdown.Menu>
                        </Dropdown>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <Dropdown text="Language" icon="angle left">
                            <Dropdown.Menu>
                                <Dropdown.Item
                                    text="Ukraine"
                                    flag="ua"
                                    onClick={(e, d) => {
                                        action(e, d, "language");
                                    }}
                                    value="uk-UA"
                                    active={language === "uk-UA"}
                                />
                                <Dropdown.Item
                                    text="United States"
                                    flag="us"
                                    onClick={(e, d) => {
                                        action(e, d, "language");
                                    }}
                                    value="en-US"
                                    active={language === "en-US"}
                                />
                                <Dropdown.Item
                                    text="Russia"
                                    flag="ru"
                                    onClick={(e, d) => {
                                        action(e, d, "language");
                                    }}
                                    value="ru-RU"
                                    active={language === "ru-RU"}
                                />
                            </Dropdown.Menu>
                        </Dropdown>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Menu.Menu>
    </Menu>
);

export default TopMenu;
