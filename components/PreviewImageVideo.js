import * as React from 'react';
import { Button, Card, ProgressBar, Colors } from 'react-native-paper';


export default function PreviewImageVideo(props) {
    return (
    <Card key={props.image.uri}>
        <Card.Cover source={props.image} />
        <ProgressBar progress={0.1} color={Colors.red800} />
        <Card.Actions>
            <Button onPress={()=>(props.removePreview(props.image))}>Remove</Button>
        </Card.Actions>
    </Card> );
}