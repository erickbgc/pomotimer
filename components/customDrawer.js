import React from 'react';
import { View, Text } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';

import { FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Sidebar = ({ progress, ...props }) => {
    const translateX = Animated.interpolateNode(progress, {
        inputRange: [0, 1],
        outputRange: [-100, 0],
    });

    return (
        <>
            <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center', borderStyle: 'solid', borderBottomColor: 'rgba(236, 240, 241,0.6)', borderBottomWidth: 2, margin: 10, borderRadius: 2 }}>
                <Animated.View style={{ transform: [{ translateX }] }}>
                    <Text style={{ textAlign: 'left', fontSize: 21, fontWeight: '500' }}>
                        PomoTimer Menu
                    </Text>
                </Animated.View>
            </View>
            <DrawerContentScrollView {...props}>
                <Animated.View style={{ transform: [{ translateX }] }}>
                    <DrawerItemList {...props} />
                </Animated.View>
            </DrawerContentScrollView>
            <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end', paddingRight: 15, paddingBottom: 10 }}>
                <Animated.View style={{ transform: [{ translateX }] }}>
                    <TouchableOpacity
                        onPress={() => props.navigation.closeDrawer()}
                    >
                        <FontAwesome5 name="angle-double-left" size={28} color="#1e272e" />
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </>
    );
};

// const styles =

export default Sidebar;