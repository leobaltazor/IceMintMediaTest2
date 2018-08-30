import React from "react";
import { Header, Modal, Divider, Item, Segment } from "semantic-ui-react";
import Poster from "../Poster";

import './style.css'

const MovieDetail = ({ open, close, mov }) => (
    <Modal open={open} dimmer="blurring" onClose={close} closeIcon>
        <Modal.Header>Movie Detail</Modal.Header>
        <Modal.Content image>
            <Poster e={mov} />
            <Modal.Description className="movieDescription">
                <Item>
                    <Item.Content verticalAlign="middle">
                        <Item.Header as="h2">{mov.title}</Item.Header>
                        <Item.Meta>
                            <Segment.Group horizontal compact>
                                <Segment>Score {mov.popularity}</Segment>
                                <Segment>Rating ????</Segment>
                                <Segment>
                                    Release Date {mov.release_date}
                                </Segment>
                            </Segment.Group>
                        </Item.Meta>
                        <Item.Description>
                            <Divider />
                            {mov.overview}
                            <Divider />
                        </Item.Description>
                        <Item.Extra>Additional Details</Item.Extra>
                    </Item.Content>
                </Item>
                {/* <Header>{mov.title}</Header>
                Score {mov.popularity}
                <Divider vertical />
                Rating ???? Release Date {mov.release_date}
                {mov.overview} */}
            </Modal.Description>
        </Modal.Content>
    </Modal>
);

export default MovieDetail;
