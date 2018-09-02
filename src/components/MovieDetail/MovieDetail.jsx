import React from "react";
import { Modal, Divider, Item, Segment } from "semantic-ui-react";
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
                                <Segment>Score {mov.vote_average}</Segment>
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
                    </Item.Content>
                </Item>
            </Modal.Description>
        </Modal.Content>
    </Modal>
);

export default MovieDetail;
