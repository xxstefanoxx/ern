import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { StyleSheet, Dimensions, Platform } from 'react-native';
import SliderEntryCredits from './SlideEntryCredits';
import styles, {sliderWidth, itemWidth} from './StyleCarousel';

export const ENTRIES1 = [
    {
        title: 'VASCERN',
        description: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        illustration: 'https://i.imgur.com/UYiroysl.jpg'
    },
    {
        title: 'Earlier this morning, NYC',
        description: 'Lorem ipsum dolor sit amet',
        illustration: 'https://i.imgur.com/UPrs1EWl.jpg'
    },
    {
        title: 'White Pocket Sunset',
        description: 'Lorem ipsum dolor sit amet et nuncat ',
        illustration: 'https://i.imgur.com/MABUbpDl.jpg'
    },
    {
        title: 'Acrocorinth, Greece',
        description: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        illustration: 'https://i.imgur.com/KZsmUi2l.jpg'
    },
    {
        title: 'The lone tree, majestic landscape of New Zealand',
        description: 'Lorem ipsum dolor sit amet',
        illustration: 'https://i.imgur.com/2nCt3Sbl.jpg'
    },
    {
        title: 'Middle Earth, Germany',
        description: 'Lorem ipsum dolor sit amet',
        illustration: 'https://i.imgur.com/lceHsT6l.jpg'
    }
];


export default class Credits extends Component {

  constructor(props) {
    super(props);
    this.props.navigator.setStyle({
      navBarBackgroundColor: '#56B9C9',
      navBarNoBorder: true
    });

    this.state = {
        slider1ActiveSlide: 1
    };
  }

  _renderItem ({item, index}) {
    return <SliderEntryCredits data={item} even={(index + 1) % 2 === 0} />;
  }
  
  render () {
    const { slider1ActiveSlide } = this.state;
    return (
        <View >
            <Carousel
              ref={c => this._slider1Ref = c}
              data={ENTRIES1}
              renderItem={this._renderItem}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
              hasParallaxImages={true}
              inactiveSlideScale={0.94}
              inactiveSlideOpacity={0.7}
              containerCustomStyle={styles.slider}
              contentContainerCustomStyle={styles.sliderContentContainer}
              loop={true}
              loopClonesPerSide={2}
              autoplay={false}
              autoplayDelay={500}
              autoplayInterval={3000}
              onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
            />
        </View>
    );
}
}