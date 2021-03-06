import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { Card, Icon } from 'react-native-elements';
//redux
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

//added mapStateProps

const mapStateToProps = state => {
    return {
        places: state.places,
        comments: state.comments
    };
};



function RenderPlace(props) {

    const {place} = props;

    if (place) {
        return (
            <Card
            featuredTitle={place.name}
            image={{uri: baseUrl + place.image}}>
            <Text style={{margin: 10}}>
                {place.description}
            </Text>
            <Icon
                name={props.favorite ? 'heart' : 'heart-o'}
                type='font-awesome'
                color='#f50'
                raised
                reverse
                onPress={() => props.favorite ? console.log('Already set as a favorite') : props.markFavorite()}
            />
        </Card>
        );
    }
    return <View />;
}

//added a ne function
//RenderComments
function RenderComments({comments}) {

    const renderCommentItem = ({item}) => {
        return (
            <View style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.text}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{`-- ${item.author}, ${item.date}`}</Text>
            </View>
        );
    };

    return (
        <Card title='Comments'>
            <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}



//class PlaceInfo
class PlaceInfo extends Component {

    
    markFavorite() {
        this.setState({favorite: true});
    }

    static navigationOptions = {
        title: 'Place Information'
    }

    render() {
        const placeId = this.props.navigation.getParam('placeId');
        const place = this.props.places.places.filter(place => place.id === placeId)[0];
        const comments = this.props.comments.comments.filter(comment => comment.placeId === placeId);
        return (
            <ScrollView>
                <RenderPlace place={place}
                    favorite={this.state.favorite}
                    markFavorite={() => this.markFavorite()}
                />
                <RenderComments comments={comments} />
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(PlaceInfo);