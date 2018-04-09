import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

const startTabs = () => {
    Promise.all([
        Icon.getImageSource("ios-menu", 30),
        Icon.getImageSource("ios-star", 30),
        Icon.getImageSource("ios-search", 30),
        Icon.getImageSource("ios-information-circle", 30)
    ]).then(sources => {
        Navigation.startTabBasedApp({
            tabs: [
                {
                    screen: "ern.Menu",
                    label: "Menu",
                    title: "Menu",
                    icon: sources[0]
                },
                {
                    screen: "ern.Favourites",
                    label: "Favourites",
                    title: "Favourites",
                    icon: sources[1]
                },
                {
                    screen: "ern.Search",
                    label: "Search",
                    title: "Search",
                    icon: sources[2]
                },
                {
                    screen: "ern.Credits",
                    label: "Credits",
                    title: "Credits",
                    icon: sources[3]
                }
            ],
            tabsStyle: { // optional, add this if you want to style the tab bar beyond the defaults
                tabBarButtonColor: '#BEBBBB', // optional, change the color of the tab icons and text (also unselected). On Android, add this to appStyle
                tabBarSelectedButtonColor: '#4A4A4A', // optional, change the color of the selected tab icon and text (only selected). On Android, add this to appStyle
                tabBarBackgroundColor: '#FBFBFB', // optional, change the background color of the tab bar
                initialTabIndex: 2 // optional, the default selected bottom tab. Default: 0. On Android, add this to appStyle
            },
            appStyle: {
                tabBarButtonColor: '#BEBBBB', // optional, change the color of the tab icons and text (also unselected). On Android, add this to appStyle
                tabBarSelectedButtonColor: '#4A4A4A', // optional, change the color of the selected tab icon and text (only selected). On Android, add this to appStyle
                tabBarBackgroundColor: '#FBFBFB',
                navBarBackgroundColor: '#56B9C9',
                navBarTitleTextCentered: true,
                initialTabIndex: 2
            }
        });
    });
};

export default startTabs;