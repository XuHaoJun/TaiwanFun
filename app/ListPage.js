import React, {Component} from 'react';
import { Actions } from 'react-native-router-flux';
import {StyleSheet, Dimensions, View} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {
  Container,
  Content,
  Header,
  Title,
  Button,
  Spinner,
  List,
  ListItem,
  Tabs,
  Text,
  Thumbnail
} from 'native-base';

export default class ListPage extends Component {
  constructor(props) {
    super(props);
    let url = "https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&" +
        "category=6";
    this.state = {
      url: url,
      data: []
    };
    this.fetchData = this.fetchData.bind(this);
    this.handleReload = this.handleReload.bind(this);
    this.handleListItemPress = this.handleListItemPress.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    console.log('fetch data');
    return fetch(this.state.url).then((res) => {
      if (!res.ok)
        throw new Error(res.statusText)
      return res.json();
    }).then((data) => {
      let shows = data.filter((v) => {
        let latitude = Number.parseFloat(v.showInfo[0].latitude);
        let longitude = Number.parseFloat(v.showInfo[0].longitude);
        return v.showInfo && v.showInfo[0] && latitude && longitude;
      })
      this.setState({data: shows});
    });
  }

  handleReload() {
    console.log('reload');
    this.setState({data: []});
    this.fetchData();
  }

  handleListItemPress(v, event) {
    Actions.mapPage({show: v});
  }

  render() {
    console.log('data.length', this.state.data.length);
    return (
      <Container>
        <Header>
          <Button transparent="transparent">
            <Icon size={20} name="menu" color="#fff"/>
          </Button>
          <Title>TaiwanFun</Title>
          <Button transparent="transparent" onPress={this.handleReload}>
            <Icon size={30} name="reload" color="#fff"/>
          </Button>
        </Header>
        <Content>
          {
            (() => {
              if (this.state.data.length <= 0) {
                return (
                  <View style={styles.spinner}>
                    <Spinner size={100}/>
                  </View>
                );
              } else {
                return (
                  <List>
                    {
                      this.state.data.map((v) => {
                        return (
                          <ListItem key={v['UID']} onPress={this.handleListItemPress.bind(this, v)}>
                            <Thumbnail/>
                            <Text>
                              {v.title}
                            </Text>
                            <Text note={true}>結束時間: {v.showInfo[0].endTime}</Text>
                            <Text note={true}>地點: {v.showInfo[0].locationName || v.showInfo[0].location}</Text>
                          </ListItem>
                        );
                      })
                    }
                  </List>
                );
              }
            })()
          }
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    marginTop: 35
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});
