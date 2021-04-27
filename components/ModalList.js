import * as React from 'react';
import { List, TextInput } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';
import { ScrollView, View } from 'react-native';

export function ModalList(props) {
    const [searchVal, setSearchVal] = React.useState('');
    const filteredList = props.inputList.filter((ele) => (ele.name.toUpperCase().includes(searchVal.toUpperCase())))
    return (
       
           <View style={{ height: 400 }}>
           <View>
           <TextInput
                mode='outlined'
                label={props.title}
                onChangeText={(text) => (setSearchVal(text))}
                value={searchVal}
            />   
            </View>    
            <View style={{ flex: 1, height: 300, paddingTop: 10 }}>
                <ScrollView style={{ flex: 1, height: 300 }}>
                    {filteredList.map(ele => {
                        return (
                            <List.Item
                                key={ele.name}
                                title={ele.name}
                                left={props => (<FontAwesome5 name="dog" size={24} {...props} color="black" />)}
                                onPress={() => (props.onSelect(ele))} />
                        )
                    })
                    }
                </ScrollView>
            </View>
            </View>
    )

}