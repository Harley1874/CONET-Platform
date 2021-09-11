import {DefaultTheme} from 'styled-components'

const light: DefaultTheme = {
    globalBar: {
        backgroundColor: '#fff',
        color: '#000'
    },
    ui: {
        backgroundColor: '#EFEFEF',
        backgroundAccent: '#FEFEFE',
        textColor: '#4d4d4c',
        selected: '#50A2E9',
        outline: {
            color: '#4D90FE'
        },
        storybook: {
            canvasDecorator: {
                backgroundColor: '#EFEFEF',
                color: '#000',
                controls: {
                    backgroundColor: '#E6E6E6'
                }
            }
        },
        iconButton: {
            color: '#333332',
            invertedColor: '#fff'
        },
        keypadKey: {
            numberColor: '#333332',
            alphabetColor: 'rgba(0,0,0,0.5)',
            basicColor: '#333332'
        },
        input: {
            color: '#333332',
            border: '#333332',
            placeholderColor: '#dcdcdc'
        },
        icon: {
            invalid: '#dcdcdc',
            valid: '#00D100'
        },
        progress: {
            bar: {
                incomplete: 'rgba(0, 0, 0, 0.15)',
                complete: 'rgba(40, 98, 188, 0.75)',
                separator: 'rgba(0, 0, 0, 0.1)'
            },
            dot: {
                incomplete: 'rgba(0, 0, 0, 0.15)',
                complete: '#4d4d4c',
            }
        }
    }
}

export default light
