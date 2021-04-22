import React from 'react'
import { Text, SafeAreaView, StyleSheet, Platform } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize';
import { FONT_DEFAULT_HEIGHT } from '../../Constants/Constants';

const AboutPage = (props: any) => {
    return <SafeAreaView style={mainContainer}>
        <Text style={descriptionText}>
            Приложение РСХБ-БРОКЕР предназначено для клиентов АО "Россельхозбанк", желающих инвестировать средства в ценные бумаги и иные финансовые инструменты.
            В приложении доступен следующий функционал в режиме онлайн:

            - покупка/продажа ценных бумаг и других финансовых инструментов
            - мониторинг состояния инвестиционного портфеля
            - просмотр текущих цен и графиков финансовых инструментов

            Приложение РСХБ-БРОКЕР отличается простым и понятным интерфейсом для удобства использования начинающими инвесторами.

            Приложение бесплатно. Для его использования необходимо заключить соглашение об оказании брокерских услуг с АО "Россельхозбанк"

            С приложением РСХБ-БРОКЕР биржа становится ближе!
        </Text>
    </SafeAreaView>
}

export {AboutPage}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center'
    },
    descriptionText: {
        paddingHorizontal: 16,
        paddingTop: 30,
        ...Platform.select({
            ios: {
                fontSize: RFValue(9, FONT_DEFAULT_HEIGHT)
            },
            android: {

            }
        })
    }
})

const { descriptionText, mainContainer } = styles