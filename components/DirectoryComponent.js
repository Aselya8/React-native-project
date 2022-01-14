import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { PLACES } from '../shared/places';


class Directory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            places: PLACES
            
        };
    }

    static navigationOptions = {
        title: 'Directory'
    }

    render() {
        const { navigate } = this.props.navigation;
        const renderDirectoryItem = ({ item }) => {
            return (
                <ListItem
                    title={item.name}
                    subtitle={item.description}
                    onPress={() => navigate('PlaceInfo', { placeId: item.id })}
                    leftAvatar={{ source: require('./images//issyk-kulV8PIvXjVqrk-unsplash.jpg')}}
                />
            );
        }
    

        return (
            <FlatList
                data={this.state.places}
                renderItem={renderDirectoryItem}
                keyExtractor={item => item.id.toString()}
            />
        );
    }

}

export default Directory;

