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
                        <span className="text">Country</span>
                        <span className="text"> </span>
                        <Dropdown
                            text={region}
                            compact
                            selection
                            options={[
                                { key: "ua", text: "ua", value: "ua" },
                                { key: "us", text: "us", value: "us" }
                            ]}
                            onClick={action()}
                        />
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <Dropdown text="Language" icon="angle left">
                            <Dropdown.Menu>
                                <Dropdown.Item text="Ukraine" flag="ua" />
                                <Dropdown.Item text="United States" flag="us" />
                                <Dropdown.Item text="Russia" flag="ru" />
                            </Dropdown.Menu>
                        </Dropdown>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Menu.Menu>
    </Menu>
);

export default TopMenu;
