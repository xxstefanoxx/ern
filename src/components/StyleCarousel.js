import { StyleSheet, Dimensions, Platform } from 'react-native';


const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideHeight = viewportHeight * 0.50;
const slideWidth = wp(80);
const itemHorizontalMargin = wp(2);
const btnWidth = wp(55);
const imgWidth = wp(55);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;


export default StyleSheet.create({

    content: {
        flexDirection: 'row',
        paddingHorizontal: 5 
    },
    contentCredits: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5 
    },
    contentFollow: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25
    },
    contentSocial: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 25
    },
    creditsImage: {
        width: imgWidth,
        height: 100,
        marginBottom: 20
    },
    favoriteImage: {
        width: 20,
        height: 20,
        marginRight: 10
    },
    mainTitle: {
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold'
    },
    address: {
        fontSize: 14,
        color: '#000'
    },
    containerButton: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 20
    },
    button: {
        width: btnWidth,
        borderWidth: 1,
        alignItems: 'center',
        borderColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    txtBtn: {
        flexGrow: 1,
        textAlign: 'left',
        marginHorizontal: 20,
        fontWeight: 'bold',
    },



    slider: {
        marginTop: 15,
        overflow: 'visible'
    },
    sliderContentContainer: {
        paddingVertical: 10
    },
    slideInnerContainer: {
        width: itemWidth,
        height: slideHeight,
        paddingHorizontal: itemHorizontalMargin,
        paddingBottom: 18, // needed for shadow
        backgroundColor: 'transparent',
    },
    textContainer: {
        justifyContent: 'center',
        paddingTop: 20 - 8,
        paddingBottom: 20,
        paddingHorizontal: 16,
        backgroundColor: 'transparent',
        borderRadius: 8
    }
});