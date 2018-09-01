import React from "react";
import { Menu, Header, Image } from "semantic-ui-react";

const TopMenu = () => (
    <Menu>
        <Menu.Item>
            <Header>
                <Image src="/img/logo.png" /> Movie
            </Header>
        </Menu.Item>
        <Menu.Menu position="right" />
    </Menu>
);

export default TopMenu;
