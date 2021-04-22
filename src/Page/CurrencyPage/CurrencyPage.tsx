import React from 'react'
import { View, Text, TextInput, SafeAreaView, TouchableOpacity } from 'react-native'
import { observer, inject } from 'mobx-react'
import { observable, action } from 'mobx'
import { CurrencyProvider } from "./../../Provider/CurrencyProvider";

@inject("store")
@observer
class CurrencyPage extends React.Component {
    title: String = "Hook"
    value = 0

    state = {
        x: 0
    }

    @observable tick = 0

    @action
    increment = () => {
        this.tick++ // 'this' will always be correct
    }
    

    componentDidMount() {
        console.log('%c++[   here     ]','background: orange', );
        CurrencyProvider.getInstance().getCurrencyItems()
    }

    changeText = (value: String) => {
        this.value += 1
        this.props.store.title = value
    }

    // @observable tick = 0

    // @action
    // increment = () => {
    //     this.tick++ // 'this' will always be correct
    //     this.setState({x: this.tick})
    //     console.log('%c++[        ]','background: lime', this.tick);
    // }

    render() {
        return <SafeAreaView>
            <Text>{this.tick}</Text>
            <Text>{this.props.store.title}</Text>
            <TouchableOpacity onPress={this.increment} style={{
                height: 40,
                width: 150,
                backgroundColor: 'red'
            }}>
                <Text>Click me</Text>
            </TouchableOpacity>
            <TextInput 
                style={{
                    height: 40,
                    width: 120,
                    backgroundColor: 'lime'
                }}
                onChangeText={this.changeText}
            />
        </SafeAreaView>
    }
}

export {CurrencyPage}