import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  children: React.ReactNode
}


const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_TRESHHOLD = -SCREEN_WIDTH * 0.2;


const AnimatedListItem: React.FC<Props> = (props: Props) => {
  const translateX = useSharedValue<number>(0);

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: event => {
      translateX.value = Math.max(-120, Math.min(0, event.translationX));
    },
    onEnd: () => {
      const shouldBeDismissed = translateX.value < SWIPE_TRESHHOLD;
      if (shouldBeDismissed) {
        translateX.value = withTiming(-SCREEN_WIDTH * 0.7);
      } else {
        translateX.value = withTiming(0);
      }
    },
  });



  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
      ],
    };
  });


  return (

    <View style={{
      flex: 1,
      width: '100%',
      height: 50,
      marginVertical: 1,
    }}>
      <Animated.View style={[
        {
          height: '100%',
          width: '100%',
          position: 'absolute',
          backgroundColor: 'black',
          padding: 12,
          flex: 1,
        }]}>
        <Text style={{ textAlign: 'right', verticalAlign: 'middle', color: 'white' }}>
          Over lay options here
        </Text>
      </Animated.View>
      <PanGestureHandler onGestureEvent={panGesture}>
        <Animated.View style={[{
          width: '100%',
          height: '100%',
          padding: 13,
          backgroundColor: 'white',
          marginVertical: 1,
        }, animatedStyles]}>
          {props.children}
        </Animated.View>
      </PanGestureHandler>
    </View >
  );
};

export default AnimatedListItem;
