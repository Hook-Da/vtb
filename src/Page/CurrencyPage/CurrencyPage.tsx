import React from 'react'
import { View, Text, SafeAreaView, FlatList, StyleSheet, Platform, NativeModules, LayoutAnimation, ActivityIndicator } from 'react-native'
import { observer, inject, Observer } from 'mobx-react'
import { toJS } from 'mobx'
import { CurrencyProvider } from "./../../Provider/CurrencyProvider";
import { RFValue } from 'react-native-responsive-fontsize';
import { FONT_DEFAULT_HEIGHT } from '../../Constants/Constants';
//import { FinalCurrencyObj } from "./../../Model/Currency"

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const Item = ({ticker}) => {
    const { last, highestBid, percentChange, tickerName, changeDirection } = ticker
    return (
        <View style={item}>
            <Text style={title}>{tickerName}</Text>
            <View style={{flexDirection: 'row'}}>
                <View style={{marginRight: 10}}>
                    <Text style={keysLabel}>Last:</Text>
                    <Text style={keysLabel}>Highest:</Text>
                </View>
                <View>
                    <Text style={valuesLabel}>{last}</Text>
                    <Text style={valuesLabel}>{highestBid}</Text>
                </View>
            </View>
            <Text style={{...persentLabel, color: changeDirection ? "green" : "red"}}>{percentChange}</Text>
        </View>
    )
};

@inject("store")
@observer
class CurrencyPage extends React.Component {
    focusListener? : any
    focusListener2? : any

    state = {
        isFetching: false
    }

    componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('focus', () => {
            CurrencyProvider.getInstance().getCurrencyItems()
        });
        this.focusListener2 = navigation.addListener('blur', () => {
            CurrencyProvider.getInstance().pageRemovedFromFocus()
        });
    }

    componentWillUnmount() {
        this.focusListener.remove()
        this.focusListener2.remove()
    }

    onRefresh = () => {
        CurrencyProvider.getInstance().getCurrencyItems()
    }

    renderListEmptyComponent = () => {
        return <View style={listEmptyStyle}>
            <ActivityIndicator size="large" color="#lime" />
        </View>
    }

    renderHeader = () => {
        LayoutAnimation.spring();
       return (
                <Observer>{() => {
                   return this.props.store.errorOccured ? 
                    <Text style={[headerTextStyle, {color: '#ff1133'}]} >
                        Произошла ошибка
                    </Text> : 
                     <Text style={headerTextStyle} >
                        Котировки
                    </Text>}}
                </Observer>
            )
    }

    renderItem = ({ item }) => (
        <Item ticker={item} />
    );

    render() {
        return <SafeAreaView style={{flex: 1}}>
            <FlatList
                style={{flex: 1 }}
                onRefresh={this.onRefresh}
                ListHeaderComponent={this.renderHeader}
                ListEmptyComponent={this.renderListEmptyComponent}
                showsVerticalScrollIndicator={false}
                data={toJS(this.props.store.currencyItems)}
                renderItem={this.renderItem}
                keyExtractor={(item: any) => item.id}
                refreshing={this.state.isFetching}
            />
        </SafeAreaView>
    }
}

export {CurrencyPage}

const styles =  StyleSheet.create({
    item: {
      backgroundColor: '#fdfdfd',
      borderRadius: 5,
      padding: 16,
      marginVertical: 8,
      marginHorizontal: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    title: {
      ...Platform.select({
          ios: {
            fontSize: RFValue(7.6, FONT_DEFAULT_HEIGHT),
            fontWeight: '500',
          },
          android: {
            fontSize: RFValue(6.6, FONT_DEFAULT_HEIGHT),
            fontWeight: 'bold'
          }
      })
    },
    headerTextStyle: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    }, 
    persentLabel: {
        ...Platform.select({
            ios: {
              fontSize: RFValue(6.6, FONT_DEFAULT_HEIGHT),
            },
            android: {
              fontSize: RFValue(5.6, FONT_DEFAULT_HEIGHT),
            }
        })
    },
    listEmptyStyle: {
        width: '100%', 
        height: 100, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    keysLabel: {
        textAlign: 'right',
        ...Platform.select({
            ios: {
              fontSize: RFValue(6.6, FONT_DEFAULT_HEIGHT),
              fontWeight: '500',
            },
            android: {
              fontSize: RFValue(5.6, FONT_DEFAULT_HEIGHT),
              fontWeight: 'bold'
            }
        })
    },
    valuesLabel: {
        ...Platform.select({
            ios: {
              fontSize: RFValue(6.6, FONT_DEFAULT_HEIGHT),
              fontWeight: '500',
            },
            android: {
              fontSize: RFValue(5.6, FONT_DEFAULT_HEIGHT),
              fontWeight: 'bold'
            }
        })
    }
  });

  const { item, title, headerTextStyle, persentLabel, listEmptyStyle, keysLabel, valuesLabel } = styles